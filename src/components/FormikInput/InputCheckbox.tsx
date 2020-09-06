import React from 'react'
import { Checkbox, makeStyles } from '@material-ui/core'
import { FutBobPalette } from '../../../palette'
import { get } from 'lodash'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  rootCheckbox: {
    color: FutBobPalette.typographyGrey
  }
}))

type Props = {
  name: string
  onChange: (e: any, d: boolean) => void
  values: any
}

const InputCheckbox: React.FC<Props> = ({ name, onChange, values }) => {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      <Checkbox
        classes={{ root: classes.rootCheckbox }}
        name={name}
        checked={get(values, name, false)}
        onChange={onChange}
        color='primary'
      />
    </div>
  )
}

export default React.memo(InputCheckbox)
