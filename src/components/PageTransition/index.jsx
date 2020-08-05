import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'

const PageTransition = React.memo(props => {
  const { children = [] } = props
  const router = useRouter()
  return (
    <AnimatePresence >
      <motion.div
        key={router.pathname}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 50, opacity: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
})

export default PageTransition
