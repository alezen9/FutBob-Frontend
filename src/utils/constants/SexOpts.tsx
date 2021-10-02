import { Sex } from '@_SDK_User/types'
import Icon from '@mdi/react'
import {
   mdiGenderMale,
   mdiGenderFemale
} from '@mdi/js'
import { styled } from '@mui/material/styles'

const Span = styled('span')({
   display: 'flex',
   alignItems: 'center',
   '& > svg': {
      marginRight: '.5em'
   }
})

const SexIcon = props => {
   const { sex = Sex.Male } = props
   return <>
      {sex === Sex.Male && <Span>
         <Icon path={mdiGenderMale}
            title='Male'
            size={0.8}
            horizontal
            vertical
            color='#1DA1F2' />
         Male</Span>}
      {sex === Sex.Female && <Span>
         <Icon path={mdiGenderFemale}
            title='Female'
            size={0.8}
            horizontal
            vertical
            color='#ff8da1' />
         Female</Span>}
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
