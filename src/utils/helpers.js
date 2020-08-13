import React from 'react'
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded'
import AlarmOnRoundedIcon from '@material-ui/icons/AlarmOnRounded'
import BlockRoundedIcon from '@material-ui/icons/BlockRounded'
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded'
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded'
import { Tooltip, IconButton } from '@material-ui/core'
import { sections } from './routes'
import { find, isObject, uniqueId } from 'lodash'
import { FutBobPalette } from '../../palette'
import { TopFormIcon, InjuredIcon, RecoveryIcon } from '../assets/CustomIcon'
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'

export const getTitleFromPathname = pathname => {
  const routeInfo = find(sections, ['path', pathname])
  if (!routeInfo) return 'Dashboard'
  return routeInfo.title
}

export const capitalize = s => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase()

export const asyncTimeout = ms => new Promise(resolve => setTimeout(resolve, ms))

export const camelize = str => {
  if (!str) return ''
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return '' // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase()
  })
}

const defaultStyleIcons = {
  marginRight: '.5em',
  fontSize: '1.1em'
}

const defaultStyleIconsTooltips = {
  fontSize: '0',
  transform: 'scale(.7)',
  color: FutBobPalette.typographyGrey
}

export const paramsToString = params => {
  let str = ''
  for (const key in params) {
    if (isObject(params[key])) {
      if (params[key] instanceof Array) str += key + ':' + '[' + params[key].map(el => isNaN(el) ? `"${el}"` : el) + ']' + ', '
      else str += key + ':' + paramsToString(params[key]) + ', '
    } else if (isNaN(params[key])) str += key + ':"' + params[key] + '", '
    else str += key + ':' + params[key] + ', '
  }
  return `{${str.slice(0, -2)}}`
}

export const UserStatusIconMap = {
  0: {
    normal: <AccessTimeRoundedIcon style={{ ...defaultStyleIcons, color: 'orange' }} />,
    tooltip: <Tooltip title='In attesa'>
      <IconButton aria-label='' style={{ ...defaultStyleIconsTooltips, color: 'orange' }}>
        <AccessTimeRoundedIcon />
      </IconButton>
    </Tooltip>
  },
  1: {
    normal: <CheckCircleOutlineRoundedIcon style={{ ...defaultStyleIcons, color: '#00e613' }} />,
    tooltip: <Tooltip title='Confermato'>
      <IconButton aria-label='' style={{ ...defaultStyleIconsTooltips, color: '#00e613' }}>
        <CheckCircleOutlineRoundedIcon />
      </IconButton>
    </Tooltip>
  },
  2: {
    normal: <BlockRoundedIcon style={{ ...defaultStyleIcons, color: 'crimson' }} />,
    tooltip: <Tooltip title='Bannato'>
      <IconButton aria-label='' style={{ ...defaultStyleIconsTooltips, color: 'crimson' }}>
        <BlockRoundedIcon />,
      </IconButton>
    </Tooltip>
  },
  3: {
    normal: <RemoveCircleOutlineRoundedIcon style={{ ...defaultStyleIcons, opacity: 0.6 }} />,
    tooltip: <Tooltip title='Non invitato'>
      <IconButton aria-label='' style={{ ...defaultStyleIconsTooltips, opacity: 0.6 }}>
        <RemoveCircleOutlineRoundedIcon />
      </IconButton>
    </Tooltip>
  },
  4: {
    normal: <AlarmOnRoundedIcon style={{ ...defaultStyleIcons, color: '#00d4ff' }} />,
    tooltip: <Tooltip title='Primo accesso'>
      <IconButton aria-label='' style={{ ...defaultStyleIconsTooltips, color: '#00d4ff' }}>
        <AlarmOnRoundedIcon />
      </IconButton>
    </Tooltip>
  }
}

export const futsalPositionsOptions = [
  {
    value: 0,
    label: 'Goalkeeper'
  },
  {
    value: 1,
    label: 'Back'
  },
  {
    value: 2,
    label: 'Left wing'
  },
  {
    value: 3,
    label: 'Right wing'
  },
  {
    value: 4,
    label: 'Forward'
  }
]

export const footballPositionsOptions = [
  {
    value: 5,
    label: 'Goalkeeper'
  },
  {
    value: 6,
    label: 'Sweeper'
  },
  {
    value: 7,
    label: 'Centre back'
  },
  {
    value: 8,
    label: 'Left full back'
  },
  {
    value: 9,
    label: 'Right full back'
  },
  {
    value: 10,
    label: 'Left wing back'
  },
  {
    value: 11,
    label: 'Right wing back'
  },
  {
    value: 12,
    label: 'Defensive midfielder'
  },
  {
    value: 13,
    label: 'Central midfielder'
  },
  {
    value: 14,
    label: 'Left midfielder'
  },
  {
    value: 15,
    label: 'Right midfielder'
  },
  {
    value: 16,
    label: 'Attacking midfielder'
  },
  {
    value: 17,
    label: 'Center forward'
  },
  {
    value: 18,
    label: 'Striker'
  },
  {
    value: 19,
    label: 'Second striker'
  }
]

const PhysicalState = React.memo(props => {
  const { label, value } = props
  return <span style={{ display: 'flex', fontSize: '1em', alignItems: 'center' }}>
    {value === 0 && <TopFormIcon style={{ color: 'limegreen', fontSize: '1.2em' }} />}
    {value === 1 && <ExpandLessRoundedIcon style={{ color: 'orange', fontSize: '1.2em' }} />}
    {value === 2 && <ExpandMoreRoundedIcon style={{ color: 'crimson', fontSize: '1.2em' }} />}
    {value === 3 && <InjuredIcon style={{ color: 'red', fontSize: '1.2em' }} />}
    {value === 4 && <RecoveryIcon style={{ fontSize: '1.1em' }} />}
    <span style={{ marginLeft: '1em' }}>{label}</span>
  </span>
})

export const playerPhysicalStateOptions = [
  {
    value: 0,
    label: 'Top',
    component: <PhysicalState label='Top' value={0} />
  },
  {
    value: 1,
    label: 'Medium',
    component: <PhysicalState label='Medium' value={1} />
  },
  {
    value: 2,
    label: 'Low',
    component: <PhysicalState label='Low' value={2} />
  },
  {
    value: 3,
    label: 'Injured',
    component: <PhysicalState label='Injured' value={3} />
  },
  {
    value: 4,
    label: 'Recovery',
    component: <PhysicalState label='Recovery' value={4} />
  }
]

export const getLabelsByValues = ({ values = [], options = [], list = false }) => {
  const labels = options.reduce((acc, { value, label }) => {
    if (values.includes(value)) return [...acc, label]
    return acc
  }, [])
  return list
    ? labels.map(label => <div key={uniqueId()}>• {label}</div>)
    : labels.join(', ')
}

export const decamelize = (str, separator) => {
  separator = typeof separator === 'undefined' ? ' ' : separator

  return capitalize((str || '')
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    .toLowerCase())
}
