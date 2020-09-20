import React, { useMemo, useEffect } from 'react'
import { useConfigStore } from '../../zustand/configStore'
import { isEmpty } from 'lodash'
import FutBobTabs, { FutBobTab } from '../../components/Tabs'
import General from './1_General'
import Private from './2_Private'
import Player from './3_Player'
import { useSWRUser } from '../../swr'

const ProfileContainer = () => {
  const { openSnackbar, setIsLoading } = useConfigStore(state => ({
    openSnackbar: state.openSnackbar,
    setIsLoading: state.setIsLoading
  }))

  const { item, mutate, trigger } = useSWRUser()

  useEffect(() => {
    let mounted = true
    const asyncTrigger = async () => {
      try {
        await trigger()
      } catch (error) {
        console.error(error)
      }
    }
    if (isEmpty(item) && mounted) asyncTrigger()
    return () => {
      mounted = false
    }
  }, [item])

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
