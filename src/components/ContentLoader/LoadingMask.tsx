import React from 'react'
import { makeStyles } from '@mui/styles'
import { AnimatePresence, motion } from 'framer-motion'

const useStyles = makeStyles({
  withMask: (props: any) => ({
    position: 'relative',
    filter: props.isLoading ? 'opacity(0.3)' : 'none',
    pointerEvents: props.isLoading ? 'none' : 'all',
    cursor: props.isLoading ? 'initial' : 'poiunter'
  })
})

type Props = {
  isLoading: boolean
  children?: JSX.Element
}

const CondexoLoadingMask = (props: Props) => {
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
