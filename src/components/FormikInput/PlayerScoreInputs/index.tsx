import React, { useMemo } from 'react'
import { Grid, GridProps } from '@material-ui/core'
import { get, reduce } from 'lodash'
import SingleScore from './SingleScore'
import { FormikEssentials } from '..'
import { zenToolboxInstance } from '@_utils/Toolbox'
import { PlayerScore } from '@_SDK_Player/types'

type Props = {
  gridProps: GridProps
  formik: FormikEssentials
}

const PlayerScoreInputs = (props: Props) => {
  const { gridProps = {}, formik } = props

  const items = useMemo(() => {
      const score = get(formik, 'values.score', {}) as PlayerScore
      return reduce(score, (acc, val, key) => {
         const el = {
         key: `${key}-score`,
         title: zenToolboxInstance.decamelize(key),
         name: key,
         values: val
         }
         acc.push(el)
         return acc
      }, [])
  }, [JSON.stringify(get(formik, 'values.score', {}))])

  return (
    <Grid style={{ margin: 'auto' }} container spacing={3} item xs={12} sm={6} justify='center' {...gridProps}>
      {items.map((elProps, i) => <SingleScore {...elProps} key={`${elProps.key}-${i}`} formik={formik} />)}
    </Grid>
  )
}

export default React.memo(PlayerScoreInputs)
