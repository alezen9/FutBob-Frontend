import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { get } from 'lodash'
import { getAppointmentDataRow, _FiltersAppointment, headers } from './helpers'
import { useRouter } from 'next/router'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import ZenTable from '@_components/ZenTable'
import ZenPagination from '@_components/ZenTable/ZenPagination'
import Filters from '@_components/Filters'
import { Action } from '@_components/Filters/Actions'
import { useConfigStore } from '@_zustand/config'
import { useSWRMe } from '@_swr/Me'
import { routesPaths } from '@_utils/routes'
import { ZenRouteID } from '@_utils/routes/types'
import { ConfigStore } from '@_zustand/config/helpers'
import zenHooks from '@_utils/hooks'
import { ZenTableSort } from '@_components/ZenTable/helpers'
import { EnumSortAppointment, FiltersAppointment, SortAppointment } from 'src/SDK/Modules/Appointment/inputs'
import { Appointment } from 'src/SDK/Modules/Appointment/types'
import { useSWRPAppointments } from '@_swr/Appointments'

const stateSelector = (state: ConfigStore) => ({
   openSnackbar: state.openSnackbar,
   setIsLoading: state.setIsLoading
})

const LIMIT = 10

const AppointmentContainer = () => {
   const router = useRouter()
   const [filters, setFilters] = useState<FiltersAppointment>({})
   const [currentPage, setCurrentPage] = useState(Number(get(router.query, 'page', 1)))
   const [sort, setSort] = useState<SortAppointment>({})
   const { list = [], totalCount, setDetailCache, isValidating } = useSWRPAppointments({ filters, pagination: { skip: (currentPage - 1) * LIMIT, limit: LIMIT }, sort })
   const { item: { _id } } = useSWRMe()
   const { setIsLoading } = useConfigStore(stateSelector)
   const isMounted = zenHooks.utils.useIsMounted()

   useEffect(() => {
      if (!router.query.page) {
         router.replace({
            pathname: routesPaths[ZenRouteID.APPOINTMENTS].path,
            query: { page: 1 }
         })
      }
   }, [router.query.page])

   const goToDetails = useCallback(
      (item: Appointment) => () => {
         setDetailCache(item)
         router.push(routesPaths[ZenRouteID.APPOINTMENT_DETAIL].path, routesPaths[ZenRouteID.APPOINTMENT_DETAIL].as({ _id: item._id }))
      }, [setDetailCache])

   const goToCreate = useCallback(
      () => {
         router.push(routesPaths[ZenRouteID.APPOINTMENT_CREATE].path)
      }, [])

   const handleChangePage = useCallback(
      (e: any, newPage: number) => {
         setCurrentPage(newPage)
         router.replace({
            pathname: routesPaths[ZenRouteID.APPOINTMENTS].path,
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
            field: id as EnumSortAppointment,
            sort: isASC ? 'ASC' : 'DESC'
         })
      }
   }), [isValidating])

   const tableData = useMemo(() => {
      const data = list.map(getAppointmentDataRow({ goToDetails }))
      return data
   }, [JSON.stringify(list), goToDetails, _id])

   return (
      <>
         <Filters
            withSearch
            actions={actions}
            filters={_FiltersAppointment}
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
      </>
   )
}

export default React.memo(AppointmentContainer)
