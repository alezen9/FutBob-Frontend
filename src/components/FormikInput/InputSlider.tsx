import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@mui/material/styles'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import { get } from 'lodash'
import { ZenPalette } from '@_MUITheme'

const useStyles = makeStyles(theme => ({
   root: {
      width: '100%'
   },
   thumb: {
      '& > span > span': {
         color: `${ZenPalette.typographyGrey}`,
         backgroundColor: theme.type === 'dark'
            ? '#333'
            : `currentColor`
      }
   }
}))

const marks = [
   {
      value: 0
   },
   {
      value: 25
   },
   {
      value: 50
   },
   {
      value: 75
   },
   {
      value: 100
   }
]

type Props = {
   label: string
   values: any
   name: string
   onChange: (e: any, d: number) => void
}

const Inputslider = (props: Props) => {
   const { label, values, name, onChange } = props
   const classes = useStyles()
   const [localVal, setLocalVal]: [number, (v: number) => void] = useState(get(values, name, 0))

   useEffect(() => {
      if (![null, undefined].includes(get(values, name, null))) setLocalVal(get(values, name, 0))
   }, [get(values, name, null)])

   const onLocalChange = useCallback((e, d) => setLocalVal(d), [])

   return (
      <div className={classes.root}>
         <Typography gutterBottom>{label}</Typography>
         <Slider
            classes={{ thumb: classes.thumb }}
            marks={marks}
            value={localVal}
            onChange={onLocalChange}
            onChangeCommitted={onChange}
            valueLabelDisplay='on' />
      </div>
   )
}

export default React.memo(Inputslider)
