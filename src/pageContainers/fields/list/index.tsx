import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { get, isEmpty } from 'lodash'
import { getFieldDataRow, _FiltersField, headers } from './helpers'
import { useRouter } from 'next/router'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import ZenTable from '@_components/ZenTable'
import ZenPagination from '@_components/ZenTable/ZenPagination'
import Filters from '@_components/Filters'
import { Action } from '@_components/Filters/Actions'
import WarningDeleteDialog from '@_components/WarningDeleteDialog'
import { useConfigStore } from '@_zustand/config'
import { routesPaths } from '@_utils/routes'
import { ZenRouteID } from '@_utils/routes/types'
import { ConfigStore } from '@_zustand/config/helpers'
import zenHooks from '@_utils/hooks'
import { FiltersField } from '@_SDK_Field/inputs'
import { Field } from '@_SDK_Field/types'
import { useSWRFields } from '@_swr/Fields'

const stateSelector = (state: ConfigStore) => ({
   openSnackbar: state.openSnackbar,
   setIsLoading: state.setIsLoading
})

const LIMIT = 10

const FieldsContainer = () => {
   const router = useRouter()
   const [filters, setFilters] = useState<FiltersField>({})
   const [currentPage, setCurrentPage] = useState(Number(get(router.query, 'page', 1)))
   const [currentItem, setCurrentItem] = useState<Field>(null)
   const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
   const { list = [], totalCount, deleteField, setDetailCache, isValidating } = useSWRFields({ filters, pagination: { skip: (currentPage - 1) * LIMIT, limit: LIMIT } })
   const { setIsLoading } = useConfigStore(stateSelector)
   const isMounted = zenHooks.utils.useIsMounted()

   const onDelete = useCallback(async () => {
      setIsLoading(true)
      if (get(currentItem, '_id', null)) {
         await deleteField(get(currentItem, '_id', null))
      }
      if (isMounted.current) setOpenConfirmDelete(false)
      setIsLoading(false)
   }, [get(currentItem, '_id', null), deleteField, setIsLoading])

   useEffect(() => {
      if (!router.query.page) {
         router.replace({
            pathname: routesPaths[ZenRouteID.FIELDS].path,
            query: { page: 1 }
         })
      }
   }, [router.query.page])

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
      (item: Field) => () => {
         setDetailCache(item)
         router.push(routesPaths[ZenRouteID.FIELDS_DETAIL].path, routesPaths[ZenRouteID.FIELDS_DETAIL].as({ _id: item._id }))
      }, [setDetailCache])

   const goToCreate = useCallback(
      () => {
         router.push(routesPaths[ZenRouteID.FIELDS_CREATE].path)
      }, [])

   const handleChangePage = useCallback(
      (e: any, newPage: number) => {
         setCurrentPage(newPage)
         router.replace({
            pathname: routesPaths[ZenRouteID.FIELDS].path,
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

   const tableData = useMemo(() => {
      const data = list.map(getFieldDataRow({ goToDetails, openDialog }))
      return data
   }, [JSON.stringify(list), goToDetails, openDialog])

   return (
      <>
         <Filters
            withSearch
            actions={actions}
            filters={_FiltersField}
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
            open={openConfirmDelete}
            text={<>You are about to delete <span style={{ fontWeight: 'bold' }}>{get(currentItem, 'name', '-')}</span>, continue and delete?</>}
            onClose={closeDialog}
            onDelete={onDelete}
         />
      </>
   )
}

export default React.memo(FieldsContainer)
