import React, { useEffect } from 'react'
import DetailPlayerContainer from '@_page-containers/players/detail'
import PageTransition from '@_components/PageTransition'
import zenHooks from '@_utils/hooks'
import { ZenRouteID } from '@_utils/routes/types'
import { useConfigStore } from '@_zustand/config'
import { useSWRMe } from '@_swr/Me'
import { useSWRPlayer } from '@_swr/Players'
import { useRouter } from 'next/router'
import { get } from 'lodash'
import { FaceDynamicIcon } from '@_icons'
import { makeStyles } from '@mui/styles'
import { Sex } from '@_SDK_User/types'

const useStyles = makeStyles({
   iconSpan: {
      '& > svg': {
         marginRight: (props: any) => props.sex === Sex.Male
            ? '.5em'
            : '.7em',
         transform: (props: any) => props.sex === Sex.Male
            ? 'translateY(.2em)'
            : 'translateY(.3em)'
      }
   }
})

const DetailPlayer = () => {
   const router = useRouter()
   const { _id } = router.query
   const { item } = useSWRPlayer(_id as string)
   const { item: me } = useSWRMe()
   const classes = useStyles({ sex: get(me, 'registry.sex', Sex.Male) })
   zenHooks.app.useSetActivePage(ZenRouteID.PLAYER_DETAIL)
   const setPageTitle = useConfigStore(state => state.setPageTitle)

   useEffect(() => {
      if (item._id && me._id) {
         const isMe = get(item, 'user._id', null) === me._id
         const playerName = `${get(item, 'user.registry.surname', '')} ${get(item, 'user.registry.name', '')}`.trim()
         const pageTitle = <span>
            {isMe && <span className={classes.iconSpan}><FaceDynamicIcon color='primary' /></span>}
            {playerName}
         </span>
         setPageTitle(pageTitle)
      }
   }, [setPageTitle, item._id, me._id, classes.iconSpan])



   return (
      <PageTransition>
         <DetailPlayerContainer />
      </PageTransition>
   )
}

export default DetailPlayer
