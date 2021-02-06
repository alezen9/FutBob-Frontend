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

export type TabProps = {
   item: User
   setIsLoading: (isLoading: boolean) => void
   openSnackbar: (data: setSnackbarData) => void
   updateMyRegistry: (body: UpdateRegistryInput) => Promise<boolean>
   updateMyPassword: (body: ChangePasswordInput) => Promise<boolean>
   createMyPlayer: (body: CreatePlayerInput) => Promise<boolean>
   updateMyPlayer: (body: UpdatePlayerInput) => Promise<boolean>
   deleteMyPlayer: (_id: string) => Promise<boolean>
}

const MeContainer = () => {
  const { openSnackbar, setIsLoading } = useConfigStore(state => ({
    openSnackbar: state.openSnackbar,
    setIsLoading: state.setIsLoading
  }))

  const { item, updateMyRegistry, updateMyPassword, createMyPlayer, updateMyPlayer, deleteMyPlayer } = useSWRMe()

  const tabProps = useMemo(() => ({
    item,
    openSnackbar,
    setIsLoading,
    updateMyRegistry,
    updateMyPassword,
    createMyPlayer,
    updateMyPlayer,
    deleteMyPlayer
  }), [item, openSnackbar, setIsLoading, updateMyRegistry, updateMyPassword, createMyPlayer, updateMyPlayer, deleteMyPlayer])

  return (
    <ZenTabs>
      <ZenTab
        title='Registry'
        component={<_Registry {...tabProps} />}
      />
      <ZenTab
        title='Private'
        component={<Private {...tabProps} />}
      />
      {/* <ZenTab
        title='Player'
        component={<Player {...tabProps} />}
      /> */}
    </ZenTabs>
  )
}

export default React.memo(MeContainer)
