import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import PageTransition from '@_components/PageTransition'
import FieldsContainer from '@_page-containers/fields'

const Fields = () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/fields/create')
  }, [])
  return (
    <PageTransition>
      <FieldsContainer />
    </PageTransition>
  )
}

export default React.memo(Fields)
