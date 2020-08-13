import React, { useEffect, useCallback, useMemo } from 'react'
import { useUserStore, useConfigStore } from '../../zustand/stores'
import { apiInstance } from '../../SDK'
import { get, isEmpty } from 'lodash'
import FutBobTabs, { FutBobTab } from '../../components/Tabs'
import General from './1_General'
import Private from './2_Private'
import Player from './3_Player'

const userFields = `{
    _id,
    name,
    surname,
    dateOfBirth,
    sex,
    futsalPlayer {
      _id,
      positions,
      state,
      type,
      radar {
        speed,
        stamina,
        defence,
        balance,
        ballControl,
        passing,
        finishing
      }
    }
    avatar,
    username,
    email,
    phone
  }`

const ProfileContainer = props => {
  const { isMounted = false } = props
  const { item, setItem } = useUserStore()
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
        if (isEmpty(item)) {
          const item = await apiInstance.user_getUserConnected(userFields)
          if (isMounted) setItem(item)
        }
      } catch (error) {
        openSnackbar({
          variant: 'error',
          message: get(error, 'message', null) || 'Username o password errati'
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
