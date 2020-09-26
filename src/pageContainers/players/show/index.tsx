import React, { useMemo, useCallback, useState } from 'react'
import { Grid, Button, Typography, Hidden, useMediaQuery, useTheme } from '@material-ui/core'
import FormikInput from '@_components/FormikInput'
import { useFormik } from 'formik'
import { isEmpty, meanBy, get, isEqual } from 'lodash'
import FutsalField from '@_components/FutsalField'
import { playerPhysicalStateOptions, decamelize, initialScoreValues } from '@_utils/helpers'
import { OverallScore } from '@_icons'
import RadarChart from '@_components/Charts/Radar'
import { useConfigStore } from '@_zustand/configStore'
import { ServerMessage } from '@_utils/serverMessages'
import { FutBobPalette } from '@_palette'
import { useRouter } from 'next/router'
import CustomDialog from '@_components/Dialog'
import { getMeanScoreField } from '@_components/FormikInput/PlayerScoreInputs/SingleScore'
import PlayerScoreInputs from '@_components/FormikInput/PlayerScoreInputs'
import { CountryOptions } from '@_utils/nationalities'
import { useSWRPlayer, useSWRUser } from '@_swr/hooks'
import { getPlayerPageTitle } from 'src/pages/players/[id]'
import { ConfigStore } from '@_zustand/helpers'
import { PlayerType } from '@_entities/Player'

const stateSelector = (state: ConfigStore) => ({
    setIsLoading: state.setIsLoading,
    openSnackbar: state.openSnackbar,
    pageTitle: state.pageTitle,
    setPageTitle: state.setPageTitle
  })

const PlayerDetail = () => {
  const router = useRouter()
  const { id }: { id?: string } = router.query

  const { item: playerItem, createEditPlayer, deletePlayer } = useSWRPlayer(id)
  const { item: userConnectedItem } = useSWRUser({ revalidateOnMount: false })
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const { setIsLoading, openSnackbar, pageTitle, setPageTitle } = useConfigStore(stateSelector)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(null)

  const onSubmit = useCallback(
    async (values, { setSubmitting, setTouched }) => {
      if(!get(values, 'positions', []).length) {
        openSnackbar({
          variant: 'error',
          message: 'Positions are required!'
        })
        return
      }
      const isUser = values._id && get(userConnectedItem, '_id', null) === values._id
      setSubmitting(true)
      setIsLoading(true)
      const player = {
        ...values,
        type: PlayerType.Futsal,
        user: {
          ...values.user,
          country: get(values, 'user.country.value', 'IT')
        }
      }
      try {
        const _id = await createEditPlayer(player)
        if(!values._id && _id) router.replace('/players/[id]', `/players/${_id}`)
        if(!!_id) {
          openSnackbar({
            variant: 'success',
            message: values._id
              ? 'Player info updated successfully!'
              : 'Player created successfully'
          })
          const _pageTitle = getPlayerPageTitle(values.user, isUser)
          setPageTitle(_pageTitle)
          setTouched({}, false)
        }
      } catch(error) {
        openSnackbar({
          variant: 'error',
          message: ServerMessage.generic
        })
      }
      setSubmitting(false)
      setIsLoading(false)
    },[createEditPlayer, openSnackbar, setIsLoading, setPageTitle])

  const onDelete = useCallback(
    async () => {
      setIsLoading(true)
      try {
        const done = await deletePlayer()
        if (!done) throw new Error()
        router.replace('/players')
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
      setOpenConfirmDialog(false)
      setIsLoading(false)
    }, [deletePlayer, playerItem, setOpenConfirmDialog, setIsLoading])

  const formik = useFormik({
    initialValues: {
      state: 0,
      ...playerItem,
      user: {
        sex: 0,
        ...get(playerItem, 'user', {}),
        country: CountryOptions.find(({ value }) => value === get(playerItem, 'user.country', 'IT'))
      },
      score: get(playerItem, 'score', initialScoreValues)
    },
    enableReinitialize: true,
    onSubmit
  })

  const scoreData = useMemo(() => {
    const vals = formik.values.score
    const data = Object.entries(vals).map(([key, value]) => ({
      prop: decamelize(key),
      value: getMeanScoreField(value)
    }))
    return data
  }, [formik.values.score])

  const playerName = useMemo(() => {
    if(get(playerItem, 'user._id', null) === userConnectedItem._id) return <span style={{ color: FutBobPalette.darkRed }}>yourself</span>
    return `${get(playerItem, 'user.surname', '')} ${get(playerItem, 'user.name', '')}`
  }, [playerItem, userConnectedItem._id])

  return (
    <>
      <Grid container spacing={3}>
        <FormikInput
          sm={4}
          name='user.name'
          label='Name'
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          name='user.surname'
          label='Surname'
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          name='user.dateOfBirth'
          label='Date of birth'
          type='date'
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          name='user.sex'
          label='Sex'
          type='select'
          options={[{ label: 'Male', value: 0 }, { label: 'Female', value: 1 }]}
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          name='user.phone'
          label='Phone'
          type='phone'
          required
          {...formik}
        />
        <FormikInput
          sm={4}
          name='user.email'
          label='Email'
          {...formik}
        />
        <Hidden only='xs'>
          <Grid item xs={4} />
        </Hidden>
        <FormikInput
          sm={4}
          name='user.country'
          label='Nationality'
          type='autocomplete'
          large
          options={CountryOptions}
          required
          {...formik}
        />
        <Hidden only='xs'>
          <Grid item xs={4} />
        </Hidden>
        <OverallScore style={{ margin: 'auto' }} value={parseInt(String(meanBy(scoreData, 'value')))} />
        <Grid item container xs={12} justify='center'>
          <FormikInput
            sm={4}
            type='select'
            options={playerPhysicalStateOptions}
            name='state'
            label='Physical state'
            required
            sortByLabel={false}
            {...formik}
          />
        </Grid>
        <Grid item xs={12} sm={7} style={{ height: 500 }}>
          <RadarChart data={scoreData} />
        </Grid>
        <PlayerScoreInputs formik={formik} gridProps={{ sm: 5 }} />
        <Grid item container xs={12} sm={5} justify='center' />
        <Grid item xs={12}>
          <FutsalField
            type='outdoor'
            name='positions'
            {...formik} />
        </Grid>
      <Grid item container xs={12} justify={isSmallScreen ? 'space-evenly' : 'flex-end'}>
          {playerItem._id && <Grid item>
            <Button
              style={{ minWidth: 150, color: FutBobPalette.darkRed, marginRight: '1.5em', borderColor: FutBobPalette.darkRed }}
              disabled={formik.isSubmitting}
              onClick={() => setOpenConfirmDialog(true)}
              variant='outlined'>
          Delete
            </Button>
          </Grid>}
          <Grid item>
            <Button
              style={{ minWidth: 150 }}
              disabled={formik.isSubmitting || isEmpty(formik.touched)}
              onClick={formik.handleSubmit as any}
              variant='contained'
              color='primary'>
              {playerItem._id ? 'Update' : 'Create'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <CustomDialog
        open={!!openConfirmDialog}
        fullScreen={false}
        title='Attention!'
        content={<Typography >You are about to delete <span style={{ fontWeight: 'bold' }}>{playerName}</span>, continue and delete?</Typography>}
        actions={
          <Button
            style={{ minWidth: 150, backgroundColor: FutBobPalette.darkRed }}
            onClick={onDelete}
            variant='contained'>
          Delete
          </Button>
        }
        onClose={() => setOpenConfirmDialog(false)}
      />
    </>
  )
}

export default React.memo(PlayerDetail)
