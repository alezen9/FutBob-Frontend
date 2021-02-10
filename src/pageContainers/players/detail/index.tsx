import React, { useMemo } from 'react'
import ZenTabs, { ZenTab } from '@_components/ZenTabs'
import General from './1_Registry'
import Private from './2_Private'
import Player from './3_Player'
import { useSWRMe } from '@_swr/Me'
import { useConfigStore } from '@_zustand/config'
import { User } from '@_SDK_User/types'
import { setSnackbarData } from '@_zustand/helpers'
import { ChangePasswordInput, UpdateRegistryInput } from '@_SDK_User/inputs'
import { CreatePlayerInput, UpdatePlayerInput } from '@_SDK_Player/inputs'
import _Registry from './1_Registry'
import { useSWRPlayer } from '@_swr/Players'
import { useRouter } from 'next/router'

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
     <>players</>
   //  <ZenTabs>
   //    <ZenTab
   //      title=''
   //      component={<_Registry {...tabProps} />}
   //    />
   //    <ZenTab
   //      title='Stats'
   //      component={<Private {...tabProps} />}
   //    />
   //  </ZenTabs>
  )
}

export default React.memo(PlayersContainer)
