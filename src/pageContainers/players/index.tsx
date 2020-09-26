import React, { useCallback, useMemo, useState } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { get } from 'lodash'
import { useConfigStore } from '@_zustand/configStore'
import { ServerMessage } from '@_utils/serverMessages'
import FutBobTable from '@_components/Table'
import { getPlayerDataRow, headers, SearchBox } from './helpers'
import { useRouter } from 'next/router'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import { apiInstance } from 'src/SDK'
import CustomDialog from '@_components/Dialog'
import { FutBobPalette } from '@_palette'
import { useSWRPlayers, useSWRUser } from '@_swr/hooks'
import { cache } from 'swr'
import SwrKey from '@_swr/keys'
import { Player, PlayerType } from '@_entities/Player'

const PlayersContainer = () => {
  const { list = [], mutate } = useSWRPlayers()
  const { item: userConnectedItem, mutate: mutateUserConnected } = useSWRUser()

  const { openSnackbar, setIsLoading } = useConfigStore(state => ({
    openSnackbar: state.openSnackbar,
    setIsLoading: state.setIsLoading
  }))

  const [_filters, setFilters] = useState({})
  const [searchText, setSearchText] = useState('')
  const [currentItem, setCurrentItem]: [Player|null, any] = useState(null)
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
      if (!currentItem) return
      setIsLoading(true)
      try {
        const done = await apiInstance.player_deletePlayer({
          _id: currentItem._id,
          idUser: currentItem.user._id,
          type: PlayerType.Futsal
        })
        if (!done) throw new Error()
        openSnackbar({
          variant: 'success',
          message: 'Player deleted successfully!'
        })
        mutate(draft => {
          draft.splice(draft.findIndex(player => player._id === currentItem._id), 1)
        })
        if(userConnectedItem._id === currentItem.user._id) mutateUserConnected(user => {
          user.futsalPlayer = null
        })
        closeDialog()
      } catch (error) {
        openSnackbar({
          variant: 'error',
          message: ServerMessage[error] || get(error, 'message', error)
        })
      }
      setIsLoading(false)
    }, [currentItem, mutate, userConnectedItem._id, mutateUserConnected, closeDialog])

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
    const data = list.map(getPlayerDataRow({ goToDetails, onDelete: openDialog, playerId: get(userConnectedItem, 'futsalPlayer._id', null) }))
    return searchText
      ? data.filter(({ fullName }) => (`${fullName}`.toLowerCase()).includes(searchText.toLowerCase()))
      : data
  }, [list, goToDetails, searchText, openDialog, get(userConnectedItem, 'futsalPlayer._id', null)])

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
        content={<Typography >You are about to delete <span style={{ fontWeight: 'bold' }}>{`${get(currentItem, 'user.surname', '')} ${get(currentItem, 'user.name', '')}`}</span>, continue and delete?</Typography>}
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
