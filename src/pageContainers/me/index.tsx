import React, { useMemo } from 'react'
import ZenTabs, { ZenTab } from '@_components/ZenTabs'
import _Registry from './1_Registry'
import _Private from './2_Private'
import _Player from './3_Player'
import { useSWRMe } from '@_swr/Me'
import { useConfigStore } from '@_zustand/config'
import { User } from '@_SDK_User/types'
import { ChangePasswordInput, UpdateRegistryInput } from '@_SDK_User/inputs'
import { CreatePlayerInput, UpdatePlayerInput } from '@_SDK_Player/inputs'

export type TabProps = {
   item: User
   setIsLoading: (isLoading: boolean) => void
   updateMyRegistry: (body: UpdateRegistryInput) => Promise<boolean>
   updateMyPassword: (body: ChangePasswordInput) => Promise<boolean>
   createMyPlayer: (body: CreatePlayerInput) => Promise<boolean>
   updateMyPlayer: (body: UpdatePlayerInput) => Promise<boolean>
   updateMyEmail: (newEmail: string) => Promise<boolean>
   deleteMyPlayer: (_id: string) => Promise<boolean>
}

const MeContainer = () => {
   const setIsLoading = useConfigStore(state => state.setIsLoading)

   const { item, updateMyRegistry, updateMyPassword, updateMyEmail, createMyPlayer, updateMyPlayer, deleteMyPlayer } = useSWRMe()

   const tabProps = useMemo(() => ({
      item,
      setIsLoading,
      updateMyRegistry,
      updateMyPassword,
      updateMyEmail,
      createMyPlayer,
      updateMyPlayer,
      deleteMyPlayer
   }), [JSON.stringify(item), setIsLoading, updateMyRegistry, updateMyPassword, updateMyEmail, createMyPlayer, updateMyPlayer, deleteMyPlayer])

   return (
      <ZenTabs>
         <ZenTab
            title='Registry'
            component={<_Registry {...tabProps} />}
         />
         <ZenTab
            title='Private'
            component={<_Private {...tabProps} />}
         />
         <ZenTab
            title='Player'
            component={<_Player {...tabProps} />}
         />
      </ZenTabs>
   )
}

export default React.memo(MeContainer)
