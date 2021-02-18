import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { get, isEmpty } from 'lodash'
import { ServerMessage } from '@_utils/serverMessages'
import { getFreeAgentsDataRow, headers } from './helpers'
import { useRouter } from 'next/router'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import { cache } from 'swr'
import { SwrKey } from '@_swr/helpers'
import Filters from '@_components/Filters'
import { Action } from '@_components/Filters/Actions'
import ZenPagination from '@_components/ZenTable/ZenPagination'
import ZenTable from '@_components/ZenTable'
import WarningDeleteDialog from '@_components/WarningDeleteDialog'
import { useSWRFreeAgents } from '@_swr/FreeAgent'
import { ConfigStore } from '@_zustand/config/helpers'
import { FreeAgent } from '@_SDK_FreeAgent/types'
import { useConfigStore } from '@_zustand/config'
import CreateEditDialog from './CreateEditDialog'

const stateSelector = (state: ConfigStore) => ({
  openSnackbar: state.openSnackbar,
  setIsLoading: state.setIsLoading
})

const LIMIT = 10

const FreeAgentContainer = () => {
  const [filters, setFilters] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [currentDeleteItem, setCurrentDeleteItem] = useState<FreeAgent>(null)
    const [currentEditItem, setCurrentEditItem] = useState<FreeAgent>(null)

  const [_openCreateEdit, setOpenCreateEdit] = useState(false)
   const [_openDeleteDialog, setDeleteDialog,] = useState(false)
  const { list = [], totalCount, deleteFreeAgent, createFreeAgent,  updateFreeAgent, isValidating } = useSWRFreeAgents({ filters, pagination: { skip: (currentPage - 1) * LIMIT, limit: LIMIT } })
  const { openSnackbar, setIsLoading } = useConfigStore(stateSelector)
  const router = useRouter()

  const openDeleteDialog = useCallback(
    (item: FreeAgent) => () => {
      setDeleteDialog(true)
      setCurrentDeleteItem(item)
    }, [])

  const closeDeleteDialog = useCallback(
    () => {
      setDeleteDialog(false)
    }, [])

  const onDelete = useCallback(
    async () => {
      // setIsLoading(true)
      // try {
      //   const done = await deleteFreeAgent(currentItem._id)
      //   if (!done) throw new Error()
      //   openSnackbar({
      //     variant: 'success',
      //     message: 'Free agent deleted successfully!'
      //   })
      // } catch (error) {
      //   openSnackbar({
      //     variant: 'error',
      //     message: ServerMessage.generic
      //   })
      // }
      // closeDialog()
      // setIsLoading(false)
    }, [deleteFreeAgent, setIsLoading])

  const goToCreate = useCallback(
   () => {
      setCurrentEditItem(null)
      setOpenCreateEdit(true)
    }, [])

   const openCreateEditDialog = useCallback((item: FreeAgent) => () => {
      setOpenCreateEdit(true)
      setCurrentEditItem(item)
   }, [])

   const onCloseCreateEditDialog = useCallback(() => {
      setOpenCreateEdit(false)
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
      const data = list.map(getFreeAgentsDataRow({ openDeleteDialog, openCreateEditDialog }))
      return data
  }, [JSON.stringify(list), openCreateEditDialog, openDeleteDialog])

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
      <CreateEditDialog
         open={_openCreateEdit}
         item={currentEditItem}
         createFreeAgent={createFreeAgent}
         updateFreeAgent={updateFreeAgent}
         onClose={onCloseCreateEditDialog} />

      <WarningDeleteDialog
         open={_openDeleteDialog}
         text={<>You are about to delete <span style={{ fontWeight: 'bold' }}>{`${get(currentDeleteItem, 'surname', 'Unknown free agent')} ${get(currentDeleteItem, 'name', 'Unknown free agent')}`}</span>, continue and delete?</>}
         onClose={closeDeleteDialog}
         onDelete={onDelete}
      />
    </>
  )
}

export default React.memo(FreeAgentContainer)
