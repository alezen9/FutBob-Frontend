import React, { useMemo } from 'react'
import ZenTabs, { ZenTab } from '@_components/ZenTabs'
import { useSWRMe } from '@_swr/Me'
import { useConfigStore } from '@_zustand/config'
import { User } from '@_SDK_User/types'
import { setSnackbarData } from '@_zustand/helpers'
import { ChangePasswordInput, UpdateRegistryInput } from '@_SDK_User/inputs'
import { CreatePlayerInput, UpdatePlayerInput } from '@_SDK_Player/inputs'
import { useSWRPlayer } from '@_swr/Players'
import { useRouter } from 'next/router'
import _Registry from './1_Registry'
import _Skills from './2_Skills'
import { get } from 'lodash'

export type TabProps = {
   item: User
   setIsLoading: (isLoading: boolean) => void
   updateMyRegistry: (body: UpdateRegistryInput) => Promise<boolean>
   updateMyPassword: (body: ChangePasswordInput) => Promise<boolean>
   createMyPlayer: (body: CreatePlayerInput) => Promise<boolean>
   updateMyPlayer: (body: UpdatePlayerInput) => Promise<boolean>
   deleteMyPlayer: (_id: string) => Promise<boolean>
}

const PlayersContainer = () => {
   const router = useRouter()
   const { _id } = router.query
  const setIsLoading = useConfigStore(state => state.setIsLoading)

  const { item, createPlayer, updatePlayer, deletePlayer } = useSWRPlayer(_id as string)
  const { item: me } = useSWRMe()

  const isMe = useMemo(() => {
     return get(item, 'user._id', null) === me._id
  }, [get(item, 'user._id', null), me._id])

//   const tabProps = useMemo(() => ({
//     item,
//     setIsLoading,
//     updateMyRegistry,
//     updateMyPassword,
//     createMyPlayer,
//     updateMyPlayer,
//     deleteMyPlayer
//   }), [JSON.stringify(item), setIsLoading, updateMyRegistry, updateMyPassword, createMyPlayer, updateMyPlayer, deleteMyPlayer])

  return (
    <ZenTabs>
      <ZenTab
        title='Registry'
        component={<_Registry {...{ item, isMe }} />}
      />
      <ZenTab
        title='Skills'
        component={<_Skills {...{ item }} />}
      />
      <ZenTab
        title='Stats'
        disabled
      //   component={<_Skills {...{}} />}
      component={<>player</>}
      />
    </ZenTabs>
  )
}

export default React.memo(PlayersContainer)
