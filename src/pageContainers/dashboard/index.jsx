import React, { useCallback } from 'react'
import { Grid } from '@material-ui/core'
import Esportazioni from './widgets/Esportazioni'
import Totali from './widgets/Totali'
import { indigoLight, azureLight, pinkDark, redLight } from '../../../lightTheme'
import { useRouter } from 'next/router'
import { deepOrange, brown, yellow } from '@material-ui/core/colors'

const DashboardContainer = props => {
  const { totaleCondomini, totaleFornitori, totalePersone, totaleAdmins } = props
  const router = useRouter()

  const goToPeople = useCallback(() => {
    router.push('/persone')
  }, [router])

  const goToSuppliers = useCallback(() => {
    router.push('/fornitori')
  }, [router])

  const goToAdmins = useCallback(() => {
    router.push('/amministratori')
  }, [router])

  return (
    <div style={{ margin: '1em 0' }}>
      dashboard aleks
      {/* <Grid container spacing={3}>
        <Totali
          title='Condomini'
          sm={4}
          color={redLight}
          total={totaleCondomini}
        />
        <Totali
          title='Persone'
          sm={4}
          color={pinkDark}
          total={totalePersone}
          style={{ cursor: 'pointer' }}
          onClick={goToPeople}
        />
        <Totali
          title='Fornitori'
          sm={4}
          color={azureLight}
          total={totaleFornitori}
          style={{ cursor: 'pointer' }}
          onClick={goToSuppliers}
        />
        <Totali
          title='Amministratori'
          sm={4}
          color={yellow[900]}
          total={totaleAdmins}
          style={{ cursor: 'pointer' }}
          onClick={goToAdmins}
        />
        <Esportazioni
          title='Esportazioni'
          sm={8}
          color={indigoLight}
        />
      </Grid> */}
    </div>
  )
}

export default React.memo(DashboardContainer)
