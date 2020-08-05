import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { compact, fromPairs } from 'lodash'
import { useTheme, useMediaQuery } from '@material-ui/core'
import MobileFilters from './Mobile'
import DesktopFilters from './Desktop'

const Filters = props => {
  const { filters, onFiltersChange, onValuesChange } = props
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const formik = useFormik({
    initialValues: fromPairs(compact(filters.map(({ initialValue, name }) => initialValue
      ? [name, initialValue]
      : null))),
    onSubmit: onFiltersChange
  })

  useEffect(() => {
    let mounted = true
    if (onValuesChange && mounted) onValuesChange(formik.values)
    return () => {
      mounted = false
    }
  }, [onValuesChange, formik.values])

  return (
    <div style={{ margin: '1em 0 2em 0' }}>
      <form onSubmit={formik.handleSubmit}>
        {isSmallScreen
          ? <MobileFilters formik={formik} {...props} otherActions={props.children} />
          : <DesktopFilters formik={formik} {...props} otherActions={props.children} />}
      </form>
    </div>
  )
}

export default React.memo(Filters)
