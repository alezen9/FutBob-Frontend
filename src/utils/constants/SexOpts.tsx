import { Sex } from '@_SDK_User/types'
import Icon from '@mdi/react'
import {
  mdiGenderMale,
  mdiGenderFemale
} from '@mdi/js'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  center: {
    display: 'flex',
    alignItems: 'center',
    '& > svg': {
      marginRight: '.5em'
    }
  }
})

const SexIcon = props => {
  const { sex = Sex.Male } = props
  const classes = useStyles()
  return <>
    {sex === Sex.Male && <span className={classes.center}>
      <Icon path={mdiGenderMale}
        title='Male'
        size={0.8}
        horizontal
        vertical
        color='#1DA1F2' />
   Male</span>}
    {sex === Sex.Female && <span className={classes.center}>
      <Icon path={mdiGenderFemale}
        title='Female'
        size={0.8}
        horizontal
        vertical
        color='#ff8da1' />
   Female</span>}
   </>
}

export const SexOpts = [
  {
    value: Sex.Male,
    label: 'Male',
    component: <SexIcon sex={Sex.Male} />
  },
  {
    value: Sex.Female,
    label: 'Female',
    component: <SexIcon sex={Sex.Female} />
  }
]
