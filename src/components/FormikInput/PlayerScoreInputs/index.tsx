import React, { useMemo } from 'react'
import { Grid } from '@material-ui/core'
import { get, reduce } from 'lodash'
import SingleScore from './SingleScore'
import { decamelize } from '../../../utils/helpers'

const PlayerScoreInputs = props => {
  const { gridProps = {}, formik } = props

  const items = useMemo(() => {
    const score = get(formik, 'values.score', {})
    return reduce(score, (acc, val, key) => {
      const el = {
        key: `${key}-score`,
        title: decamelize(key),
        name: key,
        values: val
      }
      return [...acc, el]
    }, [])
  }, [get(formik, 'values.score', {})])

  return (
    <Grid style={{ margin: 'auto' }} container spacing={3} item xs={12} sm={6} justify='center' {...gridProps}>
      {items.map((elProps, i) => <SingleScore {...elProps} key={`${elProps.key}-${i}`} formik={formik} />)}
    </Grid>
  )
}

export default React.memo(PlayerScoreInputs)
