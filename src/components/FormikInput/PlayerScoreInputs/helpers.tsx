import React, { ReactChild, ReactChildren } from 'react'
import { Grid, Button } from '@material-ui/core'
import FormikInput, { FormikEssentials } from '..'
import { get } from 'lodash'
import { decamelize } from '../../../utils/helpers'

const scoreProperties = {
  pace: [
    'acceleration',
    'sprintSpeed'
  ],
  shooting: [
    'positioning',
    'finishing',
    'shotPower',
    'longShots',
    'volleys',
    'penalties'
  ],
  passing: [
    'vision',
    'crossing',
    'freeKick',
    'shortPassing',
    'longPassing',
    'curve'
  ],
  dribbling: [
    'agility',
    'balance',
    'reactions',
    'ballControl',
    'dribbling',
    'composure'
  ],
  defense: [
    'interceptions',
    'heading',
    'defensiveAwareness',
    'standingTackle',
    'slidingTackle'
  ],
  physical: [
    'jumping',
    'stamina',
    'strength',
    'aggression'
  ]
}

type ContentProps = {
  name: string
  formik: FormikEssentials
}

export const SlidersDialogContent = React.memo((props: ContentProps) => {
  const { name, formik } = props

  return <Grid container>
    {get(scoreProperties, name, []).map((field, i) => (
      <FormikInput
        sm={12}
        key={`${field}-formik-${i}-${name}`}
        type='slider'
        name={`score.${name}.${field}`}
        label={decamelize(field)}
        {...formik}
      />
    ))}
  </Grid>
})

type ActionsProps = {
  cancelChanges: VoidFunction
  confirmChanges: VoidFunction
}

export const SlidersDialogActions = React.memo((props: ActionsProps) => {
  const { cancelChanges, confirmChanges } = props

  return <Grid container justify='flex-end'>
    <Grid item>
      <Button
        style={{ marginRight: '1em' }}
        variant='outlined'
        color='primary'
        onClick={cancelChanges}>
           Cancel
      </Button>
    </Grid>
    <Grid item>
      <Button
        variant='contained'
        color='primary'
        onClick={confirmChanges}>
           Confirm
      </Button>
    </Grid>
  </Grid>
})
