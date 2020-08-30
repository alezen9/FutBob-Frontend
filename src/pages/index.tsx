import React from 'react'
import DashboardContainer from '../pageContainers/dashboard'
import PageTransition from '../components/PageTransition'

const Index = props => {
  return (
    <PageTransition>
      <DashboardContainer />
    </PageTransition>
  )
}

export default Index
