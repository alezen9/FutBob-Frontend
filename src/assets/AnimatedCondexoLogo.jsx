import * as React from 'react'
import { motion } from 'framer-motion'

const icon = themeType => ({
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: '#fff'
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: themeType === 'light'
      ? 'rgba(0,0,0,.4)'
      : 'rgba(255,255,255,.4)'
  }
})

const AnimatedCondexoLogo = props => {
  const { style = {}, svgStyle = {}, themeType = 'light' } = props
  const pathStyle = {
    fill: themeType === 'light'
      ? 'rgba(0,0,0,.4)'
      : 'rgba(255,255,255,.4)',
    transition: 'fill .2s ease'
  }
  return <div style={{ display: 'flex', height: '100vh', ...style }}>
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 123 157.6'
      style={{ margin: 'auto', width: 100, ...svgStyle }}
    >
      <motion.path
        d='M46.5,18.6H36.3V28h-4.7v67.7c0,9.6-2.6,18.6-7.2,26.3c-5.2-7.5-8.3-16.5-8.3-26.3c0-11.2,4-21.4,10.6-29.3
       V44.8C10.6,56,0,74.6,0,95.8c0,14.8,5.2,28.4,13.8,39c0,0,0,0,0,0c3.1,3.9,6.7,7.4,10.7,10.4c13.5-12.2,22-29.8,22-49.4V18.6z
       M42.1,100.4h-4.8v-4.8h4.8V100.4z M42.1,90.5h-4.8v-4.8h4.8V90.5z M42.1,80.5h-4.8v-4.8h4.8V80.5z M42.1,70.6h-4.8v-4.8h4.8V70.6z
       M42.1,60.6h-4.8v-4.8h4.8V60.6z M42.1,50.7h-4.8v-4.8h4.8V50.7z M42.1,40.7h-4.8v-4.8h4.8V40.7z'
        variants={icon(themeType)}
        initial='hidden'
        animate='visible'
        transition={{
          default: { duration: 2, ease: 'easeInOut' },
          fill: { duration: 2, ease: [1, 0, 0.8, 1] }
        }}
        style={pathStyle}
      />
      <motion.path
        d='M72.3,95.8V11.1l-5.8-2.4V2.4L61.9,0l-4.6,2.4v6.4l-5.8,2.4v84.7c0,20.5-8.6,39.4-22.3,52.6
       c0.2,0.1,0.4,0.2,0.5,0.4c9.4,5.8,20.5,9.1,32.3,9.1c12.1,0,23.4-3.5,32.9-9.4C81,135.2,72.3,116.5,72.3,95.8z M60,100.4h-4.8v-4.8
       H60V100.4z M60,90.5h-4.8v-4.8H60V90.5z M60,80.5h-4.8v-4.8H60V80.5z M60,70.6h-4.8v-4.8H60V70.6z M60,60.6h-4.8v-4.8H60V60.6z
       M60,50.7h-4.8v-4.8H60V50.7z M60,40.7h-4.8v-4.8H60V40.7z M60,30.8h-4.8V26H60V30.8z M60,20.8h-4.8V16H60V20.8z M69.2,100.4h-4.8
       v-4.8h4.8V100.4z M69.2,90.5h-4.8v-4.8h4.8V90.5z M69.2,80.5h-4.8v-4.8h4.8V80.5z M69.2,70.6h-4.8v-4.8h4.8V70.6z M69.2,60.6h-4.8
       v-4.8h4.8V60.6z M69.2,50.7h-4.8v-4.8h4.8V50.7z M69.2,40.7h-4.8v-4.8h4.8V40.7z M69.2,30.8h-4.8V26h4.8V30.8z M69.2,20.8h-4.8V16
       h4.8V20.8z'
        variants={icon(themeType)}
        initial='hidden'
        animate='visible'
        transition={{
          default: { duration: 2, ease: 'easeInOut' },
          fill: { duration: 2, ease: [1, 0, 0.8, 1] }
        }}
        style={pathStyle}
      />
      <motion.path
        d='M123,84.2c-3.1-16.3-12.5-30.3-25.6-39.4v21.7c4.2,5.1,7.3,11.1,9,17.7H123z'
        variants={icon(themeType)}
        initial='hidden'
        animate='visible'
        transition={{
          default: { duration: 2, ease: 'easeInOut' },
          fill: { duration: 2, ease: [1, 0, 0.8, 1] }
        }}
        style={pathStyle}
      />
      <motion.path
        d='M123,107.3h-16.5c-1.4,5.4-3.7,10.4-6.8,14.8c-4.6-7.7-7.2-16.7-7.2-26.3V61.3c0,0,0,0,0.1,0.1V41.7
        c0,0,0,0-0.1,0V27.4l-7.8-4.1v-4.8h-7v77.1c0,19.6,8.5,37.2,22,49.4c3.7-2.8,7.1-6,10-9.6c0,0,0.1-0.1,0.1-0.1
        c0.2-0.2,0.4-0.5,0.6-0.7c0,0,0,0,0,0C116.6,127,121.1,117.6,123,107.3z M87,100.4h-4.8v-4.8H87V100.4z M87,90.5h-4.8v-4.8H87V90.5
        z M87,80.5h-4.8v-4.8H87V80.5z M87,70.6h-4.8v-4.8H87V70.6z M87,60.6h-4.8v-4.8H87V60.6z M87,50.7h-4.8v-4.8H87V50.7z M87,40.7
        h-4.8v-4.8H87V40.7z'
        variants={icon(themeType)}
        initial='hidden'
        animate='visible'
        transition={{
          default: { duration: 2, ease: 'easeInOut' },
          fill: { duration: 2, ease: [1, 0, 0.8, 1] }
        }}
        style={pathStyle}
      />
    </motion.svg>
  </div>
}

export default AnimatedCondexoLogo
