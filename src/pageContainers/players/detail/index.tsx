import React, { useMemo } from 'react'
import ZenTabs, { ZenTab } from '@_components/ZenTabs'
import { useSWRMe } from '@_swr/Me'
import { useConfigStore } from '@_zustand/config'
import { UpdateRegistryInput } from '@_SDK_User/inputs'
import { UpdatePlayerInput } from '@_SDK_Player/inputs'
import { useSWRPlayer } from '@_swr/Players'
import { useRouter } from 'next/router'
import _Registry from './1_Registry'
import _Skills from './2_Skills'
import { get } from 'lodash'
import { Player } from '@_SDK_Player/types'

export type TabProps = {
   item: Player
   isMe: boolean,
   setIsLoading: (isLoading: boolean) => void
   updatePlayerRegistry: (body: UpdateRegistryInput, isMe?: boolean) => Promise<boolean>
   updatePlayerSkills: (body: UpdatePlayerInput, isMe?: boolean) => Promise<boolean>
   deletePlayer: (_id: string, isMe?: boolean) => Promise<boolean>
}

const PlayersContainer = () => {
   const router = useRouter()
   const { _id } = router.query
  const setIsLoading = useConfigStore(state => state.setIsLoading)

  const { item, updatePlayerRegistry, updatePlayerSkills, deletePlayer } = useSWRPlayer(_id as string)
  const { item: me } = useSWRMe()

  const isMe = useMemo(() => {
     return get(item, 'user._id', null) === me._id
  }, [get(item, 'user._id', null), me._id])

  const tabProps = useMemo(() => ({
    item,
    setIsLoading,
    isMe,
    updatePlayerRegistry,
    updatePlayerSkills,
    deletePlayer
  }), [JSON.stringify(item), setIsLoading, updatePlayerRegistry, updatePlayerSkills, deletePlayer])

  return (
    <ZenTabs>
      <ZenTab
        title='Registry'
        component={<_Registry {...tabProps} />}
      />
      <ZenTab
        title='Skills'
        component={<_Skills {...tabProps} />}
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
