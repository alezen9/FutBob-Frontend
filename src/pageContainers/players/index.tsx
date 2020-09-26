import React, { useCallback, useMemo, useState } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { get, isEqual } from 'lodash'
import { useConfigStore } from '@_zustand/configStore'
import { ServerMessage } from '@_utils/serverMessages'
import FutBobTable from '@_components/Table'
import { getPlayerDataRow, headers, SearchBox } from './helpers'
import { useRouter } from 'next/router'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import CustomDialog from '@_components/Dialog'
import { FutBobPalette } from '@_palette'
import { useSWRPlayers, useSWRUser } from '@_swr/hooks'
import { cache } from 'swr'
import SwrKey from '@_swr/keys'
import { Player } from '@_entities/Player'
import { ConfigStore } from '@_zustand/helpers'

const stateSelector = (state: ConfigStore) => ({
  openSnackbar: state.openSnackbar,
  setIsLoading: state.setIsLoading
})

const PlayersContainer = () => {
  const { list = [], deletePlayer } = useSWRPlayers()
  const { item: userConnectedItem} = useSWRUser()
  const { openSnackbar, setIsLoading } = useConfigStore(stateSelector)

  const [_filters, setFilters] = useState({})
  const [searchText, setSearchText] = useState('')
  const [currentItem, setCurrentItem]: [Player|null, any] = useState(null)
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

  const tableData = useMemo(() => {
    const data = list.map(getPlayerDataRow({ goToDetails, openDialog, userConnectedId: get(userConnectedItem, '_id', null) }))
    return searchText
      ? data.filter(({ fullName }) => (`${fullName}`.toLowerCase()).includes(searchText.toLowerCase()))
      : data
  }, [JSON.stringify(list), goToDetails, searchText, openDialog, get(userConnectedItem, '_id', null)])

  return (
    <>
      <Grid container justify='space-between' alignItems='center' style={{ marginBottom: '1em' }}>
        <SearchBox onTextChange={v => setSearchText(v)} />
        <Grid item xs={12} sm={6} lg={8} style={{ textAlign: 'right' }}>
          <Button
            onClick={goToCreate}
            variant='outlined'>
            <AddRoundedIcon style={{ marginRight: '.5em' }} />
            Create
          </Button>
        </Grid>
      </Grid>
      <FutBobTable
        withActions
        isFetching={false}
        headers={headers}
        data={tableData}
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
