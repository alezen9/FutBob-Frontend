import React, { useMemo } from 'react'
import { Grid, GridProps } from '@material-ui/core'
import { get, reduce } from 'lodash'
import SingleScore from './SingleScore'
import { FormikEssentials } from '..'
import zenToolbox from '@_utils/toolbox'
import { PlayerScore } from '@_SDK_Player/types'

type Props = {
   gridProps: GridProps
   name?: string
   formik: FormikEssentials
}

const PlayerScoreInputs = (props: Props) => {
   const { gridProps = {}, name = 'score', formik } = props

   const items = useMemo(() => {
      const score = get(formik, `values.${name}`, {}) as PlayerScore
      return reduce(score, (acc, val, key) => {
         const el = {
            key: `${key}-score`,
            title: zenToolbox.decamelize(key),
            name: key,
            formikName: name,
            values: val
         }
         acc.push(el)
         return acc
      }, [])
   }, [name, JSON.stringify(get(formik, `values.${name}`, {}))])

   return (
      <Grid style={{ margin: 'auto' }} container spacing={3} item xs={12} sm={6} justify='center' {...gridProps}>
         {items.map((elProps, i) => <SingleScore {...elProps} key={`${elProps.key}-${i}`} formik={formik} />)}
      </Grid>
   )
}

export default React.memo(PlayerScoreInputs)
