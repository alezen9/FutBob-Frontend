import React, { useMemo } from 'react'
import { useConfigStore } from '@_zustand/configStore'
import FutBobTabs, { FutBobTab } from '../../components/Tabs'
import General from './1_General'
import Private from './2_Private'
import Player from './3_Player'
import { EditableUser, User } from '@_entities/User'
import { setSnackbarData } from '@_zustand/helpers'
import { DirectMutationImmer, useSWRUser } from '@_swr/hooks'

export type ProfileTabProps = {
  item: User
  mutate: (data: EditableUser|DirectMutationImmer<User>, shouldRevalidate?: boolean) => Promise<User>
  setIsLoading: (isLoading: boolean) => void
  openSnackbar: (data: setSnackbarData) => void
}

const ProfileContainer = () => {
  const { openSnackbar, setIsLoading } = useConfigStore(state => ({
    openSnackbar: state.openSnackbar,
    setIsLoading: state.setIsLoading
  }))

  const { item, mutate } = useSWRUser()

  const tabProps = useMemo(() => ({
    item,
    mutate,
    openSnackbar,
    setIsLoading
  }), [item, openSnackbar, setIsLoading, mutate])

  return (
    <FutBobTabs>
      <FutBobTab
        title='General'
        component={<General {...tabProps} />}
      />
      <FutBobTab
        title='Private'
        component={<Private {...tabProps} />}
      />
      <FutBobTab
        title='Player'
        component={<Player {...tabProps} />}
      />
    </FutBobTabs>
  )
}

export default React.memo(ProfileContainer)
