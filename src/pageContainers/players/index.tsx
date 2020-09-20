import React, { useCallback, useMemo, useState } from 'react'
import { Button, Grid, IconButton, Tooltip, Typography } from '@material-ui/core'
import { get } from 'lodash'
import { useConfigStore } from '../../zustand/configStore'
import { ServerMessage } from '../../utils/serverMessages'
import FutBobTable from '../../components/Table'
import { getPlayerDataRow, headers } from './helpers'
import { useRouter } from 'next/router'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
// import Filters from '../../components/Filters'
import { apiInstance } from '../../SDK'
import CustomDialog from '../../components/Dialog'
import { FutBobPalette } from '../../../palette'
import { useSWRPlayers, useSWRUser } from '../../swr'
import { cache } from 'swr'
import swrKeys from '../../swr/keys'

// const useStyles = makeStyles(theme => ({
//   '@keyframes animateOpacity': {
//     '0%': { opacity: 0 },
//     '70%': { opacity: 0 },
//     '100%': { opacity: 1 }
//   },
//   mobileAddButton: {
//     position: 'absolute',
//     top: '.2em',
//     right: '3em',
//     opacity: 0
//   },
//   opacityFix: {
//     opacity: 0,
//     animation: '$animateOpacity 1s forwards'
//   }
// }))

const PlayersContainer = props => {
  const { players = [] } = props

  const { list = [], trigger } = useSWRPlayers({ initialData: players })
  const { item = {} } = useSWRUser({ revalidateOnMount: false })

  const { openSnackbar, setIsLoading } = useConfigStore(state => ({
    openSnackbar: state.openSnackbar,
    setIsLoading: state.setIsLoading
  }))

  const [_filters, setFilters] = useState({})
  const [searchText, setSearchText] = useState('')
  const [currentItem, setCurrentItem] = useState(null)
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
          type: 1
        })
        if (!done) throw new Error()
        openSnackbar({
          variant: 'success',
          message: 'Player deleted successfully!'
        })
        closeDialog()
        await trigger()
      } catch (error) {
        openSnackbar({
          variant: 'error',
          message: ServerMessage[error] || get(error, 'message', error)
        })
      }
      setIsLoading(false)
    }, [currentItem, trigger, closeDialog])

  const goToDetails = useCallback(
    item => () => {
      cache.set([swrKeys.PLAYER, item._id], item)
      router.push('/players/[id]', `/players/${item._id}`)
    }, [])

  const goToCreate = useCallback(
    () => {
      router.push('/players/create')
    }, [])

  const tableData = useMemo(() => {
    const data = list.map(getPlayerDataRow({ goToDetails, onDelete: openDialog, playerId: get(item, 'futsalPlayer._id', null) }))
    return searchText
      ? data.filter(({ fullName }) => (`${fullName}`.toLowerCase()).includes(searchText.toLowerCase()))
      : data
  }, [list, goToDetails, searchText, openDialog, get(item, 'futsalPlayer._id', null)])

  return (
    <div>
      {/* <Filters
        filters={[]}
        onFiltersChange={setFilters}
        actionsGridProps={{ sm: 6, lg: 8 }}
        searchBox={{
          lg: 4,
          onTextChange: v => setSearchText(v)
        }}
        desktopActions={<Grid item style={{ marginRight: -24 }}>
          <Button
            onClick={goToCreate}
            variant='outlined'>
            <AddRoundedIcon style={{ marginRight: '.5em' }} />
            Create
          </Button>
        </Grid>}
      >
        <Tooltip title='Crea nuovo'>
          <IconButton onClick={goToCreate}>
            <AddRoundedIcon />
          </IconButton>
        </Tooltip>
      </Filters> */}
      <FutBobTable
        withActions
        isFetching={false}
        headers={headers}
        data={tableData}
      />
      <CustomDialog
        open={!!currentItem}
        title='Attention!'
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
    </div>
  )
}

export default React.memo(PlayersContainer)
