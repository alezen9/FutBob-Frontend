import React from 'react'
import PropTypes from 'prop-types'
import TableLoader from './TableLoader'
import Block from './Block'
import { useTheme } from '@material-ui/core'

const ContentLoader = ({ type = 'table' }) => {
  const theme = useTheme()
  const loaderProps = {
    foregroundColor: '#f3f3f3',
    backgroundColor: '#ecebeb',
    ...theme.type === 'dark' && {
      style: {
        mixBlendMode: 'overlay',
        opacity: theme.type === 'light'
          ? 1
          : 0.1
      }
    }
  }
  switch (type) {
    case 'block':
      return <Block {...loaderProps} />
    default:
      return <TableLoader {...loaderProps} />
  }
}

ContentLoader.propTypes = {
  type: PropTypes.string
}

export default ContentLoader
