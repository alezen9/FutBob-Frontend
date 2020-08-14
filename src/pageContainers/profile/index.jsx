import React, { useEffect, useCallback, useMemo } from 'react'
import { useUserStore } from '../../zustand/userStore'
import { useConfigStore } from '../../zustand/configStore'
import { isEmpty } from 'lodash'
import FutBobTabs, { FutBobTab } from '../../components/Tabs'
import General from './1_General'
import Private from './2_Private'
import Player from './3_Player'
import { ServerMessage } from '../../utils/serverMessages'

const ProfileContainer = props => {
  const { item, setItem, getData: getItem } = useUserStore()
  const { openSnackbar, setIsLoading } = useConfigStore(state => ({
    openSnackbar: state.openSnackbar,
    setIsLoading: state.setIsLoading
  }))
  const tabProps = useMemo(() => ({
    item,
    setItem,
    openSnackbar,
    setIsLoading
  }), [item, setItem, openSnackbar, setIsLoading])

  const getData = useCallback(
    async () => {
      setIsLoading(true)
      try {
        if (isEmpty(item)) await getItem()
      } catch (error) {
        openSnackbar({
          variant: 'error',
          message: ServerMessage[error] || ServerMessage.generic
        })
      }
      setIsLoading(false)
    }, [])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <div>
      <FutBobTabs>
        <FutBobTab
          title='General'
          component={<General {...tabProps} />}
        />
        <FutBobTab
          title='Private'
          noBox
          component={<Private {...tabProps} />}
        />
        <FutBobTab
          title='Player'
          noBox
          component={<Player {...tabProps} />}
        />
      </FutBobTabs>
    </div>
  )
}

export default React.memo(ProfileContainer)
