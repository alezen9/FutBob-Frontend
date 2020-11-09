import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { get, isEmpty, isEqual } from 'lodash'
import { useConfigStore } from '@_zustand/configStore'
import { ServerMessage } from '@_utils/serverMessages'
import FutBobTable from '@_components/Table'
import { getPlayerDataRow, headers, playerFilters } from './helpers'
import { useRouter } from 'next/router'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import CustomDialog from '@_components/Dialog'
import { FutBobPalette } from '@_palette'
import { cache } from 'swr'
import { Player } from '@_entities/Player'
import { ConfigStore } from '@_zustand/helpers'
import { useSWRUser } from '@_swr/User'
import { useSWRPlayers } from '@_swr/Players'
import { SwrKey } from '@_swr/helpers'
import Filters from '@_components/Filters'
import { Action } from '@_components/Filters/Actions'
import FutbobPagination from '@_components/Table/Pagination'

const stateSelector = (state: ConfigStore) => ({
  openSnackbar: state.openSnackbar,
  setIsLoading: state.setIsLoading
})

const LIMIT = 10

const PlayersContainer = () => {
  const [_filters, setFilters] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [currentItem, setCurrentItem]: [Player|null, any] = useState(null)
   const { list = [], totalCount, deletePlayer, isValidating } = useSWRPlayers({ filters: { ..._filters, pagination: { skip: (currentPage - 1) * LIMIT, limit: LIMIT } } })
  const { item: userConnectedItem} = useSWRUser()
  const { openSnackbar, setIsLoading } = useConfigStore(stateSelector)
  const router = useRouter()

  const playerName = useMemo(() => {
    if(get(currentItem, 'user._id', null) === userConnectedItem._id) return <span style={{ color: FutBobPalette.darkRed }}>yourself</span>
    return `${get(currentItem, 'user.surname', '')} ${get(currentItem, 'user.name', '')}`
  }, [currentItem, userConnectedItem._id])

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
        const done = await deletePlayer(currentItem._id, currentItem.user._id)
        if (!done) throw new Error()
        openSnackbar({
          variant: 'success',
          message: 'Player deleted successfully!'
        })
      } catch (error) {
        openSnackbar({
          variant: 'error',
          message: ServerMessage.generic
        })
      }
      closeDialog()
      setIsLoading(false)
    }, [deletePlayer, currentItem, closeDialog, setIsLoading])


  const goToDetails = useCallback(
    item => async () => {
      cache.set([SwrKey.PLAYER, item._id], item)
      await router.push('/players/[id]', `/players/${item._id}`)
    }, [])

  const goToCreate = useCallback(
    async () => {
      await router.push('/players/create')
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
      const data = list.map(getPlayerDataRow({ goToDetails, openDialog, userConnectedId: get(userConnectedItem, '_id', null) }))
      return data
  }, [JSON.stringify(list), goToDetails, openDialog, get(userConnectedItem, '_id', null)])

  return (
    <>
      <Filters
         withSearch
         actions={actions}
         filters={playerFilters}
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
        content={<Typography >You are about to delete <span style={{ fontWeight: 'bold' }}>{playerName}</span>, continue and delete?</Typography>}
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

export default React.memo(PlayersContainer)
