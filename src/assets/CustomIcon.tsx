import React, { useMemo } from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import { makeStyles } from '@material-ui/core'
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded'
import CancelRoundedIcon from '@material-ui/icons/CancelRounded'
import { FutBobPalette } from '../../palette'
import { getScoreColor } from '../utils/helpers'

const useStyles = makeStyles(theme => ({
  topFormIcon: {
    display: 'flex',
    flexDirection: 'column',
    height: 24,
    position: 'relative',
    width: 24,
    '& > svg': {
      position: 'absolute',
      left: ' 50%',
      top: '-.2rem',
      transform: 'translateX(-50%)'
    },
    '& > svg:last-of-type': {
      top: '.2rem'
    }
  },
  injured: {
    transform: 'rotateZ(45deg)'
  },
  overallScore: {
    position: 'relative',
    color: ({ color }) => color,
    '& > svg': {
      fontSize: '3em'
    },
    '& > span': {
      position: 'absolute',
      top: '35%',
      left: '50%',
      transform: 'translate(-50%, -35%)',
      fontWeight: 'bold',
      fontSize: '.9em'
    }
  }
}))

export const FutBobLogo = props => {
  return (
    <SvgIcon {...props} viewBox='0 0 943.62 769.01'>
      <g id='LINE'>
        <line x1='142.58' y1='630.59' x2='142.58' y2='615.21' />
      </g>
      <g id='LINE-2' >
        <line x1='285.17' y1='615.21' x2='285.17' y2='769.01' />
      </g>
      <g id='LWPOLYLINE'>
        <path d='M546.18,411H261V734A138.42,138.42,0,0,0,399.44,872.37h4.16V564.76H688.77V549.38A138.42,138.42,0,0,0,550.35,411Z' transform='translate(-118.43 -103.36)' />
      </g>
      <g id='LINE-3' >
        <line x1='598.85' y1='446.03' x2='598.85' y2='461.41' />
      </g>
      <g id='LINE-4' >
        <line x1='712.92' y1='307.61' x2='525.23' y2='307.61' />
      </g>
      <g id='LINE-5' >
        <line x1='456.27' y1='769.01' x2='452.1' y2='769.01' />
      </g>
      <g id='LWPOLYLINE-2'>
        <path d='M831.35,564.76a76.9,76.9,0,1,1,0,153.8H570.54A138.42,138.42,0,0,0,432.12,857v15.38H831.35c127.41,0,230.7-103.29,230.7-230.7a230.7,230.7,0,0,0-58.75-153.8c84.94-95,76.82-240.82-18.15-325.76a230.7,230.7,0,0,0-153.8-58.75H620.85a137,137,0,0,1,96.43,138.42v15.38H831.35a76.9,76.9,0,1,1,0,153.8H620.85a137,137,0,0,1,96.43,138.42v15.38Z' transform='translate(-118.43 -103.36)' />
      </g>
      <g id='LWPOLYLINE-3'>
        <path d='M546.18,103.36h4.16A138.42,138.42,0,0,1,688.77,241.78v15.38H256.85A138.42,138.42,0,0,1,118.43,118.74V103.36H550.35' transform='translate(-118.43 -103.36)' />
      </g>
    </SvgIcon>
  )
}

export const FieldOutdoor = props => {
  return (
    <SvgIcon {...props} viewBox='0 0 456.52 288.98'>
      <polygon fill='#39b54a' points='3.85 285.98 75.59 3 338.07 3 452.08 285.98 3.85 285.98' />
      <path fill='#fff' d='M868,225.16l111.58,277H539.62l70.21-277H868m4-6H605.16l-73.25,289H988.43L872,219.16Z' transform='translate(-531.91 -219.16)' />
      <path fill='#39b54a' d='M748.92,354.56c-17.32,0-33.59-5.63-42.47-14.71-4.33-4.43-6.57-9.38-6.46-14.32.31-14.12,20.23-25.6,44.4-25.6,24.4,0,46.25,11.68,48.71,26,.85,4.94-.65,9.86-4.34,14.22C781.29,349.06,766,354.56,748.92,354.56Z' transform='translate(-531.91 -219.16)' />
      <path fill='#fff' d='M744.39,302.93c11.58,0,22.81,2.65,31.6,7.47,8.11,4.44,13.14,10.15,14.15,16.07.7,4.1-.53,8.07-3.67,11.79-6.92,8.2-21.31,13.3-37.55,13.3-16.54,0-32-5.29-40.32-13.81-2.62-2.67-5.72-7-5.61-12.16.17-7.59,7.1-12.84,11.22-15.3,8-4.74,18.68-7.36,30.18-7.36m0-6c-25.83,0-47,12.37-47.4,28.53-.37,17.25,22.86,32.1,51.93,32.1s50.09-14.85,47.14-32.1c-2.77-16.16-25.83-28.53-51.67-28.53Z' transform='translate(-531.91 -219.16)' />
      <path fill='#39b54a' stroke='#fff' strokeMiterlimit={10} strokeWidth={3} d='M609,508.13' transform='translate(-531.91 -219.16)' />
      <path fill='none' stroke='#fff' strokeMiterlimit={10} strokeWidth={3} d='M910.54,505.59C891.06,444.15,822,402.16,752.25,402.16S619.92,444,609.47,505.31' transform='translate(-531.91 -219.16)' />
      <polyline fill='#39b54a' stroke='#fff' strokeWidth={3} points='213.93 106.47 379.75 106.47 47.15 106.47' />
      <path fill='none' stroke='#fff' strokeMiterlimit={10} strokeWidth={3} d='M827.6,222.06c3.93,24-32.86,45-85.44,45S649.5,245.94,650,221.92' transform='translate(-531.91 -219.16)' />
    </SvgIcon>
  )
}

export const RecoveryIcon = props => {
  return (
    <SvgIcon {...props} viewBox='0 0 611.64 611.64'>
      <rect fill='none' stroke='currentColor' strokeWidth={50} x='522.82' y='356.96' width='237.1' height='243.02' transform='translate(190.64 -486.03) rotate(45)' />
      <path fill='none' stroke='currentColor' strokeWidth={50} d='M698.28,204H826.35a70,70,0,0,1,70,70v97.1a70,70,0,0,1-70,70H698.28a0,0,0,0,1,0,0V204A0,0,0,0,1,698.28,204Z' transform='translate(-330.06 485.6) rotate(-45)' />
      <path fill='none' stroke='currentColor' strokeWidth={50} d='M641.37,478.47' transform='translate(-335.53 -172.66)' />
      <path fill='none' stroke='currentColor' strokeWidth={50} d='M471.6,480.58,639.25,648.24,548.69,738.8a70,70,0,0,1-99,0L381,670.14a70,70,0,0,1,0-99l90.56-90.56' transform='translate(-335.53 -172.66)' />
      <circle cx='238.68' cy='305.75' r='23.83' />
      <circle cx='305.89' cy='238.18' r='23.83' />
      <circle cx='305.89' cy='372.48' r='23.83' />
      <circle cx='373.23' cy='304.56' r='23.83' />
      <circle cx='307.19' cy='305.75' r='23.83' />
    </SvgIcon>
  )
}

export const TopFormIcon = props => {
  const { topFormIcon } = useStyles()
  return (
    <span className={topFormIcon} {...props}>
      <ExpandLessRoundedIcon />
      <ExpandLessRoundedIcon />
    </span>
  )
}

export const InjuredIcon = props => {
  const { injured } = useStyles()
  return <CancelRoundedIcon className={injured} {...props} />
}

export const OverallScore = props => {
  const { value = 0, autoColor = true, ...rest } = props
  const color = useMemo(() => {
    if (!autoColor) return FutBobPalette.typographyGrey
    return getScoreColor(value)
  }, [value, autoColor])

  const { overallScore } = useStyles({ color })
  return <span className={overallScore} {...rest} >
    <SvgIcon viewBox='0 0 1000 1000'>
      <path d='M881.4,151.4C768.5,99,561.4,10.2,500.8,10c-60.5,0.2-268.5,89.3-381.9,141.8c-23.8,11-39.5,36.2-38.9,62.6c1.9,95.7,14.6,236.2,64.4,361.8c107.9,272.1,297.2,399.7,350.3,413.1c1.9,0.5,3.8,0.7,5.7,0.7c2,0,4-0.2,5.9-0.8c60.8-16.1,247.5-157.7,349.1-413c49.8-125.1,62.6-266.2,64.6-362.6C920.5,190.2,902.4,161.2,881.4,151.4L881.4,151.4z M812.1,559c-94.6,237.8-264.5,363.9-311.9,383.1C450.7,923.5,285.6,805.6,187.8,559c-47.2-119-59.3-253.6-61.2-345.5c-0.2-9,5.8-16.5,11.9-19.3C307.3,116,463.1,56.8,500.8,56.7c37.9,0.1,193,59,360.9,137c4.2,2.2,11.8,13.8,11.7,19C871.5,305.2,859.3,440.4,812.1,559L812.1,559z' />
    </SvgIcon>
    <span>{value}</span>
  </span>
}

export const JerseyIcon = props => {
  return (
    <SvgIcon {...props} viewBox='0 0 531.44 474.27'>
      <path fill='none' stroke='currentColor' strokeMiterlimit={10} strokeWidth={50} d='M683,590.47H567.3a30,30,0,0,1-30-30V367.72a10,10,0,0,0-17.07-7.07l-5,5a10,10,0,0,1-14.14,0l-50.05-50.05a30,30,0,0,1-.21-42.22l81.06-82.7a30,30,0,0,1,14-8.07l60.74-15.44a29.75,29.75,0,0,1,15.08.08c18.2,4.87,68.71,15.43,122.19.16a29.85,29.85,0,0,1,15.5-.2L820,182.57a30,30,0,0,1,14,8.07l81.06,82.7a30,30,0,0,1-.21,42.22l-50,50.05a10,10,0,0,1-14.14,0l-5-5a10,10,0,0,0-17.07,7.07V560.47a30,30,0,0,1-30,30Z' transform='translate(-417.28 -141.2)' />
    </SvgIcon>
  )
}

export const FieldIcon = props => {
  return (
    <SvgIcon {...props} viewBox='0 0 779.9 617.98'>
      <path fill='none' stroke='currentColor' strokeMiterlimit={10} strokeWidth={50} d='M349.26,705.21l57.22-343.14H990l108.47,343.14c3.22,10.2-7.71,18.57-24.46,18.57H376.49C359.74,723.78,347.56,715.41,349.26,705.21Z' transform='translate(-334.1 -120.8)' />
      <path fill='none' stroke='currentColor' strokeMiterlimit={10} strokeWidth={50} d='M406.48,362.07,443,143.22c.68-4.11,9.73-7.42,20.2-7.42H882.88c19.64,0,37.53,6.22,40,14L990,362.07Z' transform='translate(-334.1 -120.8)' />
      <path fill='none' stroke='currentColor' strokeMiterlimit={10} strokeWidth={50} d='M702.58,420.43c67.56,0,117.74-26.81,112.34-58.36-5.14-30-59.06-53.23-120.67-53.23s-112.07,23.24-112.73,53.23C580.83,393.62,635,420.43,702.58,420.43Z' transform='translate(-334.1 -120.8)' />
      <path fill='none' stroke='currentColor' strokeMiterlimit={10} strokeWidth={50} d='M491.63,135.8c-5,42.38,82.38,79.52,195.63,79.52S882.37,178.18,871,135.8' transform='translate(-334.1 -120.8)' />
      <path fill='none' stroke='currentColor' strokeMiterlimit={10} strokeWidth={50} d='M422,723.78C433.51,626.4,563.12,555.89,712.7,555.89s289.71,70.51,315.79,167.89' transform='translate(-334.1 -120.8)' />
    </SvgIcon>
  )
}

export const PassingIcon = props => {
  return (
    <SvgIcon {...props} viewBox='0 0 429.65 328.32'>
      <circle cx='47.24' cy='279.35' r='47.24' />
      <path d='M609.65,288.08,545,225.75l-9.21-8.88c-11.13-10.72-28.12,6.23-17,17l64.69,62.33,9.22,8.88c11.13,10.72,28.12-6.23,17-17Z' transform='translate(-353.51 -211.87)' />
      <path d='M591.33,215.51,529,280.21l-8.88,9.22c-10.72,11.13,6.23,28.12,17,17l62.33-64.7,8.88-9.21c10.72-11.13-6.23-28.12-17-17Z' transform='translate(-353.51 -211.87)' />
      <path d='M779.51,518.23l-64.69-62.32L705.6,447c-11.13-10.72-28.12,6.22-17,17l64.69,62.32,9.22,8.88c11.13,10.72,28.12-6.23,17-17Z' transform='translate(-353.51 -211.87)' />
      <path d='M761.19,445.67l-62.33,64.7L690,519.59c-10.72,11.12,6.23,28.12,17,17l62.33-64.7,8.88-9.22c10.72-11.12-6.23-28.12-17-17Z' transform='translate(-353.51 -211.87)' />
      <line fill='none' stroke='currentColor' strokeMiterlimit={5} strokeWidth={10} x1='262.69' y1='106.65' x2='338.19' y2='207.11' />
      <polygon points='355.65 189.9 316.81 219.1 350.82 223.92 355.65 189.9' />
      <line fill='none' stroke='currentColor' strokeMiterlimit={5} strokeWidth={10} x1='70.69' y1='223.92' x2='146.19' y2='123.46' />
      <polygon points='124.81 111.47 163.65 140.66 158.82 106.65 124.81 111.47' />
    </SvgIcon>
  )
}

export const ShootingIcon = props => {
  return (
    <SvgIcon {...props} viewBox='0 0 617.29 617.29'>
      {/* <circle fill='none' stroke='currentColor' strokeMiterlimit={5} strokeWidth={50} class='cls-1' cx='308.64' cy='308.64' r='255.86' /> */}
      <circle fill='none' stroke='currentColor' strokeMiterlimit={5} strokeWidth={50} class='cls-1' cx='308.64' cy='308.64' r='170.57' />
      <path fill='none' stroke='currentColor' strokeMiterlimit={5} strokeWidth={20} d='M1006,349H482.2c-24,0-48.17-.74-72.18,0h-1c-13.51,0-13.53,21,0,21H932.8c24,0,48.17.74,72.18,0h1c13.51,0,13.53-21,0-21Z' transform='translate(-398.86 -50.86)' />
      <path fill='none' stroke='currentColor' strokeMiterlimit={5} strokeWidth={20} d='M697,61V584.8c0,24-.74,48.17,0,72.18,0,.34,0,.68,0,1,0,13.51,21,13.53,21,0V134.2c0-24,.74-48.17,0-72.18,0-.34,0-.68,0-1,0-13.51-21-13.53-21,0Z' transform='translate(-398.86 -50.86)' />
      <circle fill='none' stroke='currentColor' strokeMiterlimit={5} strokeWidth={30} class='cls-2' cx='308.64' cy='308.64' r='85.29' />
    </SvgIcon>
  )
}

export const DefenseIcon = props => {
  return (
    <SvgIcon {...props} viewBox='0 0 372 496'>
      <path d='M635,157.58c51.67,37.3,94.12,47.36,144.67,49.93V405.39c0,62.87-34.87,79.09-144.67,146.88-109.74-67.75-144.67-84-144.67-146.88V207.51C540.88,204.94,583.33,194.88,635,157.58ZM635,105c-69.67,59.23-113.34,62-186,62V405.39c0,95.13,66.2,120,186,195.61,119.8-75.66,186-100.48,186-195.61V167C748.34,167,704.67,164.23,635,105Z' transform='translate(-449 -105)' />
    </SvgIcon>
  )
}

export const PhysicalIcon = props => {
  return (
    <SvgIcon {...props} viewBox='0 0 620.26 699.68'>
      <path fill='none' stroke='currentColor' strokeMiterlimit={5} strokeWidth={60} d='M979.32,566.83c-37.58,55.26-33.16,79.57-33.16,79.57s4.42,42-46.41,44.21S744.28,703,725.12,684C709,668,462.08,794.5,442.19,558s243.14-227.67,298.4-134.83l11.11,16c14.11-82.26,83.7-154.1,87.26-174,5.08-28.44-22.32-14.59-33.16-19.89-5.89-2.88-53.89-17.41-89.12-36.42a60.4,60.4,0,0,1-31.48-58.15c2-24.59,6.6-43.16,11.25-56.45a44.88,44.88,0,0,1,40.71-30c35.23-1.29,101.39,4.72,181.3,52.38a36.26,36.26,0,0,1,17.66,28.69c2.52,37.12,10.66,121.7,34.36,167.41C1001.42,372.31,1016.9,511.57,979.32,566.83Z' transform='translate(-411.12 -34)' />
      <path fill='none' stroke='currentColor' strokeMiterlimit={5} strokeWidth={60} d='M799.17,576.77C753.06,532.23,744,484.09,751.7,439.1' transform='translate(-411.12 -34)' />
    </SvgIcon>
  )
}