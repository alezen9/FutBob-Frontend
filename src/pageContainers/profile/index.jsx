import React, { useMemo, useEffect } from 'react'
import { useConfigStore } from '../../zustand/configStore'
import { isEmpty } from 'lodash'
import FutBobTabs, { FutBobTab } from '../../components/Tabs'
import General from './1_General'
import Private from './2_Private'
import Player from './3_Player'
import { useSWRUser } from '../../../swr'

const ProfileContainer = props => {
  const { openSnackbar, setIsLoading } = useConfigStore(state => ({
    openSnackbar: state.openSnackbar,
    setIsLoading: state.setIsLoading
  }))

  const { item = {}, mutate, trigger } = useSWRUser({ revalidateOnMount: false })

  useEffect(() => {
    if (isEmpty(item)) trigger()
  }, [item])

  const tabProps = useMemo(() => ({
    item,
    mutate,
    openSnackbar,
    setIsLoading
  }), [item, openSnackbar, setIsLoading, mutate])

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
