import React from 'react'
import PageTransition from '@_components/PageTransition'
import LoginContainer from '@_page-containers/auth/login'

const Login = () => {
  return (
    <PageTransition>
      <LoginContainer />
    </PageTransition>
  )
}

export default React.memo(Login)
