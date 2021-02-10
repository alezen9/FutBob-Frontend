import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { get, isEmpty } from 'lodash'
import { getPlayerDataRow, _FiltersPlayer, headers } from './helpers'
import { useRouter } from 'next/router'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import { ZenPalette } from '@_palette'
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
import { FiltersPlayer } from '@_SDK_Player/inputs'

const stateSelector = (state: ConfigStore) => ({
  openSnackbar: state.openSnackbar,
  setIsLoading: state.setIsLoading
})

const LIMIT = 10

const PlayersContainer = () => {
   const [filters, setFilters] = useState<FiltersPlayer>({})
   const [currentPage, setCurrentPage] = useState(1)
   const [currentItem, setCurrentItem] = useState<Player>(null)
   const { list = [], totalCount, deletePlayer, setDetailCache, isValidating } = useSWRPlayers({ filters, pagination: { skip: (currentPage - 1) * LIMIT, limit: LIMIT  } })
   const { item: { _id } } = useSWRMe()
   const { openSnackbar, setIsLoading } = useConfigStore(stateSelector)
   const router = useRouter()

   useEffect(() => {
      if(!router.query.page) {
         router.replace({
            pathname: routesPaths[ZenRouteID.PLAYERS].path,
            query: { page: 1 }
         })
      }
   }, [])

  const playerName = useMemo(() => {
    if(get(currentItem, 'user._id', null) === _id) return <span style={{ color: ZenPalette.error }}>yourself</span>
    return `${get(currentItem, 'user.surname', '')} ${get(currentItem, 'user.name', '')}`
  }, [currentItem, _id])

  const openDialog = useCallback(
    item => () => {
      setCurrentItem(item)
    }, [])

  const closeDialog = useCallback(
    () => {
      setCurrentItem(null)
    }, [])

  const goToDetails = useCallback(
    (item: Player) => () => {
      setDetailCache(item)
      router.push(routesPaths[ZenRouteID.PLAYER_DETAIL].path, routesPaths[ZenRouteID.PLAYER_DETAIL].as({ _id: item._id }))
    }, [])

  const goToCreate = useCallback(
   () => {
      router.push(routesPaths[ZenRouteID.PLAYER_CREATE].path)
    }, [])

  const handleChangePage = useCallback(
      (e: any, newPage: number) => {
         setCurrentPage(newPage)
         // const newPath = `${router.pathname}?page=${newPage}`
         router.replace({
            pathname: routesPaths[ZenRouteID.PLAYERS].path,
            query: { page: newPage }
         })
   }, [router])


   const onFiltersSubmit = useCallback(
      (values) => {
         handleChangePage(null, 1)
         setFilters(values)
   }, [])

  useEffect(() => {
     if(isEmpty(filters)) setCurrentPage(1)
  }, [JSON.stringify(filters)])


  const actions: Action[] = useMemo(() => [
    {
      type: 'button',
      variant: 'outlined',
      icon: <AddRoundedIcon style={{ marginRight: '.5em' }} />,
      title: 'Create',
      onClick: goToCreate,
    }
  ], [goToCreate])

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
      />
      <WarningDeleteDialog
         open={!!currentItem}
         text={<>You are about to delete <span style={{ fontWeight: 'bold' }}>{playerName}</span>, continue and delete?</>}
         onClose={closeDialog}
         onDelete={() => {}}
      />
    </>
  )
}

export default React.memo(PlayersContainer)
