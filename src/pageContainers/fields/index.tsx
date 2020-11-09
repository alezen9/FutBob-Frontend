import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Typography } from '@material-ui/core'
import { get, isEmpty } from 'lodash'
import { useConfigStore } from '@_zustand/configStore'
import { ServerMessage } from '@_utils/serverMessages'
import FutBobTable from '@_components/Table'
import { fieldsFilters, getFieldDataRow, headers } from './helpers'
import { useRouter } from 'next/router'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import CustomDialog from '@_components/Dialog'
import { FutBobPalette } from '@_palette'
import { cache } from 'swr'
import { ConfigStore } from '@_zustand/helpers'
import { SwrKey } from '@_swr/helpers'
import Filters from '@_components/Filters'
import { Action } from '@_components/Filters/Actions'
import FutbobPagination from '@_components/Table/Pagination'
import { useSWRFields } from '@_swr/Fields'
import { Field } from '@_entities/Fields'

const stateSelector = (state: ConfigStore) => ({
  openSnackbar: state.openSnackbar,
  setIsLoading: state.setIsLoading
})

const LIMIT = 10

const FieldsContainer = () => {
  const [_filters, setFilters] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [currentItem, setCurrentItem] = useState<Field|null>(null)
  const { list = [], totalCount, deleteField, isValidating } = useSWRFields({ filters: { ..._filters, pagination: { skip: (currentPage - 1) * LIMIT, limit: LIMIT } } })
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
        const done = await deleteField(currentItem._id)
        if (!done) throw new Error()
        openSnackbar({
          variant: 'success',
          message: 'Field deleted successfully!'
        })
      } catch (error) {
        openSnackbar({
          variant: 'error',
          message: ServerMessage.generic
        })
      }
      closeDialog()
      setIsLoading(false)
    }, [deleteField, currentItem, closeDialog, setIsLoading])


  const goToDetails = useCallback(
    item => async () => {
      cache.set([SwrKey.FIELD, item._id], item)
      await router.push('/fields/[id]', `/fields/${item._id}`)
    }, [])

  const goToCreate = useCallback(
    async () => {
      await router.push('/fields/create')
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
      const data = list.map(getFieldDataRow({ goToDetails, openDialog }))
      return data
  }, [JSON.stringify(list), goToDetails, openDialog])

  return (
    <>
      <Filters
         withSearch
         actions={actions}
         filters={fieldsFilters}
         autoFormatValuesOnSubmit
         formikConfig={{
            onSubmit: onFiltersSubmit
         }}
      />
      <FutBobTable
         withMask
         isFetching={isValidating}
         withActions
         headers={headers}
         data={tableData}
         pagination={<FutbobPagination
            totalCount={totalCount}
            currentPage={currentPage}
            onChangePage={handleChangePage}
         />}
      />
      <CustomDialog
        open={!!currentItem}
        title='Attention!'
        fullScreen={false}
        content={<Typography >You are about to delete <span style={{ fontWeight: 'bold' }}>{get(currentItem, 'name', 'Unknown field')}</span>, continue and delete?</Typography>}
        actions={
          <Button
            style={{ minWidth: 150, backgroundColor: FutBobPalette.darkRed }}
            onClick={onDelete}
            variant='contained'>
          Delete
          </Button>
        }
        onClose={closeDialog}
      />
    </>
  )
}

export default React.memo(FieldsContainer)
