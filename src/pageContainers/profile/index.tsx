import React, { useMemo } from 'react'
import { useConfigStore } from '@_zustand/configStore'
import ZenTabs, { ZenTab } from '@_components/ZenTabs'
import General from './1_General'
import Private from './2_Private'
import Player from './3_Player'
import { User } from '@_SDK_User/entities'
import { EditableUser } from '@_SDK_User/types'
import { setSnackbarData } from '@_zustand/helpers'
import { Player as PlayerEntity } from '@_SDK_Player/entities'
import { DirectMutationImmer } from '@_swr/helpers'
import { useSWRUser } from '@_swr/User'

export type ProfileTabProps = {
  item: User
  mutate: (data: EditableUser|DirectMutationImmer<User>, shouldRevalidate?: boolean) => Promise<User>
  setIsLoading: (isLoading: boolean) => void
  openSnackbar: (data: setSnackbarData) => void
  createEditPlayer: (player: Omit<PlayerEntity, '_id'> & Partial<Pick<PlayerEntity, '_id'>>) => Promise<boolean>
  deletePlayer: () => Promise<boolean>
}

const ProfileContainer = () => {
  const { openSnackbar, setIsLoading } = useConfigStore(state => ({
    openSnackbar: state.openSnackbar,
    setIsLoading: state.setIsLoading
  }))

  const { item, mutate, createEditPlayer, deletePlayer } = useSWRUser()

  const tabProps = useMemo(() => ({
    item,
    mutate,
    openSnackbar,
    setIsLoading,
    createEditPlayer,
    deletePlayer
  }), [item, openSnackbar, setIsLoading, mutate, createEditPlayer, deletePlayer])

  return (
    <ZenTabs>
      <ZenTab
        title='General'
        component={<General {...tabProps} />}
      />
      <ZenTab
        title='Private'
        component={<Private {...tabProps} />}
      />
      <ZenTab
        title='Player'
        component={<Player {...tabProps} />}
      />
    </ZenTabs>
  )
}

export default React.memo(ProfileContainer)
