import React, { ReactChildren, ReactChild } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import { AnimatePresence, motion } from 'framer-motion'

const useStyles = makeStyles({
  withMask: ({ isLoading }) => ({
    position: 'relative',
    filter: isLoading ? 'opacity(0.3)' : 'none',
    pointerEvents: isLoading ? 'none' : 'all',
    cursor: isLoading ? 'initial' : 'poiunter'
  })
})

type Props = {
  isLoading: boolean,
  children?: ReactChildren | ReactChild
}

const CondexoLoadingMask: React.FC<Props> = props => {
  const { isLoading = false, children = [] } = props
  const { withMask } = useStyles({ isLoading })

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        {...{ ...isLoading && { className: withMask } }}>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default React.memo(CondexoLoadingMask)
