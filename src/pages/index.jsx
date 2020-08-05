import React, { useRef, useEffect, useState } from 'react'
import DashboardContainer from '../pageContainers/dashboard'
import { apiInstance } from '../SDK'
import { get } from 'lodash'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const Index = props => {
  const isMounted = useRef(true)

  return (
    <PageTransition>
      {/* <DashboardContainer
        {...props}
        {...{
          isMounted: isMounted.current,
          totalePersone,
          totaleFornitori,
          totaleAdmins
        }}
      /> */}
      dashboard aleks
    </PageTransition>
  )
}

export default Index
