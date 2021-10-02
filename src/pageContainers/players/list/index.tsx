import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { get, isEmpty } from 'lodash'
import { getPlayerDataRow, _FiltersPlayer, headers } from './helpers'
import { useRouter } from 'next/router'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { ZenPalette } from '@_MUITheme'
import ZenTable from '@_components/ZenTable'
import ZenPagination from '@_components/ZenTable/ZenPagination'
import Filters from '@_components/Filters'
import { Action } from '@_components/Filters/Actions'
import WarningDeleteDialog from '@_components/WarningDeleteDialog'
import { useConfigStore } from '@_zustand/config'
import { useSWRMe } from '@_swr/Me'
import { useSWRPlayers } from '@_swr/Players'
import { Player } from '@_SDK_Player/types'
import { routesPaths } from '@_utils/routes'
import { ZenRouteID } from '@_utils/routes/types'
import { ConfigStore } from '@_zustand/config/helpers'
import { EnumSortPlayer, FiltersPlayer, SortPlayer } from '@_SDK_Player/inputs'
import zenHooks from '@_utils/hooks'
import { ZenTableSort } from '@_components/ZenTable/helpers'

const stateSelector = (state: ConfigStore) => ({
   openSnackbar: state.openSnackbar,
   setIsLoading: state.setIsLoading
})

const LIMIT = 10

const PlayersContainer = () => {
   const router = useRouter()
   const [filters, setFilters] = useState<FiltersPlayer>({})
   const [currentPage, setCurrentPage] = useState(Number(get(router.query, 'page', 1)))
   const [currentItem, setCurrentItem] = useState<Player>(null)
   const [sort, setSort] = useState<SortPlayer>({})
   const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
   const { list = [], totalCount, deletePlayer, setDetailCache, isValidating } = useSWRPlayers({ filters, pagination: { skip: (currentPage - 1) * LIMIT, limit: LIMIT }, sort })
   const { item: { _id } } = useSWRMe()
   const { setIsLoading } = useConfigStore(stateSelector)
   const isMounted = zenHooks.utils.useIsMounted()

   const onDelete = useCallback(async () => {
      setIsLoading(true)
      if (get(currentItem, '_id', null)) {
         await deletePlayer(get(currentItem, '_id', null), get(currentItem, 'user._id', null) === _id)
      }
      if (isMounted.current) setOpenConfirmDelete(false)
      setIsLoading(false)
   }, [get(currentItem, '_id', null), deletePlayer, setIsLoading, _id])

   useEffect(() => {
      if (!router.query.page) {
         router.replace({
            pathname: routesPaths[ZenRouteID.PLAYERS].path,
            query: { page: 1 }
         })
      }
   }, [router.query.page])

   const playerName = useMemo(() => {
      if (get(currentItem, 'user._id', null) === _id) return <span style={{ color: ZenPalette.error }}>yourself</span>
      return `${get(currentItem, 'user.registry.surname', '')} ${get(currentItem, 'user.registry.name', '')}`
   }, [get(currentItem, '_id', null), _id])

   const openDialog = useCallback(
      item => () => {
         setCurrentItem(item)
         setOpenConfirmDelete(true)
      }, [])

   const closeDialog = useCallback(
      () => {
         setOpenConfirmDelete(false)
      }, [])

   const goToDetails = useCallback(
      (item: Player) => () => {
         setDetailCache(item)
         router.push(routesPaths[ZenRouteID.PLAYER_DETAIL].path, routesPaths[ZenRouteID.PLAYER_DETAIL].as({ _id: item._id }))
      }, [setDetailCache])

   const goToCreate = useCallback(
      () => {
         router.push(routesPaths[ZenRouteID.PLAYER_CREATE].path)
      }, [])

   const handleChangePage = useCallback(
      (e: any, newPage: number) => {
         setCurrentPage(newPage)
         router.replace({
            pathname: routesPaths[ZenRouteID.PLAYERS].path,
            query: { page: newPage }
         })
      }, [])


   const onFiltersSubmit = useCallback(
      (values) => {
         handleChangePage(null, 1)
         setFilters(values)
      }, [])


   const actions: Action[] = useMemo(() => [
      {
         type: 'button',
         variant: 'outlined',
         icon: <AddRoundedIcon style={{ marginRight: '.5em' }} />,
         title: 'Create',
         onClick: goToCreate,
      }
   ], [goToCreate])

   const sortTable: ZenTableSort = useMemo(() => ({
      colIDS: ['name', 'country', 'age'],
      initialValue: {
         colID: 'name',
         isASC: true
      },
      disableAll: isValidating,
      onSortChange: (id: string, isASC: boolean) => {
         setSort({
            field: id as EnumSortPlayer,
            sort: isASC ? 'ASC' : 'DESC'
         })
      }
   }), [isValidating])

   const tableData = useMemo(() => {
      const data = list.map(getPlayerDataRow({ goToDetails, openDialog, userConnectedId: _id }))
      return data
   }, [JSON.stringify(list), goToDetails, openDialog, _id])

   return (
      <>
         <Filters
            withSearch
            actions={actions}
            filters={_FiltersPlayer}
            formikConfig={{
               onSubmit: onFiltersSubmit
            }}
         />
         <ZenTable
            withMask
            isFetching={isValidating}
            withActions
            headers={headers}
            data={tableData}
            pagination={<ZenPagination
               totalCount={totalCount}
               currentPage={currentPage}
               onChangePage={handleChangePage}
            />}
            sort={sortTable}
         />
         <WarningDeleteDialog
            open={openConfirmDelete}
            text={<>You are about to delete <span style={{ fontWeight: 'bold' }}>{playerName}</span>, continue and delete?</>}
            onClose={closeDialog}
            onDelete={onDelete}
         />
      </>
   )
}

export default React.memo(PlayersContainer)
