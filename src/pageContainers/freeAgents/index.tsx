import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { get, isEmpty } from 'lodash'
import { useConfigStore } from '@_zustand/configStore'
import { ServerMessage } from '@_utils/serverMessages'
import { getFreeAgentsDataRow, headers } from './helpers'
import { useRouter } from 'next/router'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import { cache } from 'swr'
import { ConfigStore } from '@_zustand/helpers'
import { SwrKey } from '@_swr/helpers'
import Filters from '@_components/Filters'
import { Action } from '@_components/Filters/Actions'
import ZenPagination from '@_components/ZenTable/ZenPagination'
import ZenTable from '@_components/ZenTable'
import WarningDeleteDialog from '@_components/WarningDeleteDialog'
import { FreeAgent } from '@_SDK_FreeAgent/entities'
import { useSWRFreeAgents } from '@_swr/FreeAgent'

const stateSelector = (state: ConfigStore) => ({
  openSnackbar: state.openSnackbar,
  setIsLoading: state.setIsLoading
})

const LIMIT = 10

const FreeAgentContainer = () => {
  const [_filters, setFilters] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [currentItem, setCurrentItem] = useState<FreeAgent|null>(null)
  const { list = [], totalCount, deleteFreeAgent, isValidating } = useSWRFreeAgents({ filters: { ..._filters, pagination: { skip: (currentPage - 1) * LIMIT, limit: LIMIT } } })
  const { openSnackbar, setIsLoading } = useConfigStore(stateSelector)
  const router = useRouter()

  const openDialog = useCallback(
    item => () => {
      setCurrentItem(item)
    }, [])

  const closeDialog = useCallback(
    () => {
      setCurrentItem(null)
    }, [])

  const onDelete = useCallback(
    async () => {
      setIsLoading(true)
      try {
        const done = await deleteFreeAgent(currentItem._id)
        if (!done) throw new Error()
        openSnackbar({
          variant: 'success',
          message: 'Free agent deleted successfully!'
        })
      } catch (error) {
        openSnackbar({
          variant: 'error',
          message: ServerMessage.generic
        })
      }
      closeDialog()
      setIsLoading(false)
    }, [deleteFreeAgent, currentItem, closeDialog, setIsLoading])


  const goToDetails = useCallback(
    item => async () => {
      cache.set([SwrKey.FREE_AGENT, item._id], item)
      await router.push('/free-agents/[id]', `/free-agents/${item._id}`)
    }, [])

  const goToCreate = useCallback(
    async () => {
      await router.push('/free-agents/create')
    }, [])

  const handleChangePage = useCallback(
      (e: any, newPage: number) => {
         setCurrentPage(newPage)
         const newPath = `${router.pathname}?page=${newPage}`
         router.replace(newPath)
   }, [router])


   const onFiltersSubmit = useCallback(
      (values) => {
         handleChangePage(null, 1)
         setFilters(values)
   }, [])

  useEffect(() => {
     if(isEmpty(_filters)) setCurrentPage(1)
  }, [JSON.stringify(_filters)])


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
      const data = list.map(getFreeAgentsDataRow({ goToDetails, openDialog }))
      return data
  }, [JSON.stringify(list), goToDetails, openDialog])

  return (
    <>
      <Filters
         withSearch
         actions={actions}
         autoFormatValuesOnSubmit
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
         text={<>You are about to delete <span style={{ fontWeight: 'bold' }}>{`${get(currentItem, 'surname', 'Unknown free agent')} ${get(currentItem, 'name', 'Unknown free agent')}`}</span>, continue and delete?</>}
         onClose={closeDialog}
         onDelete={onDelete}
      />
    </>
  )
}

export default React.memo(FreeAgentContainer)
