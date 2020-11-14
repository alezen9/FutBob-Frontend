import React, { useRef, useEffect } from 'react'
import PageTransition from '@_components/PageTransition'
import FieldDetail from '@_page-containers/fields/show'
import { useConfigStore } from '@_zustand/configStore'
import GoBack from '@_components/GoBack'

const CreateField = props => {
  const isMounted = useRef(true)
  const setPageTitle = useConfigStore(state => state.setPageTitle)

  useEffect(() => {
    setPageTitle('Create new field')
  }, [])

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  return (
    <PageTransition>
      <>
        <GoBack route='/fields?page=1' />
        <FieldDetail
          {...props}
          isMounted={isMounted.current} />
        </>
    </PageTransition>
  )
}

export default React.memo(CreateField)
