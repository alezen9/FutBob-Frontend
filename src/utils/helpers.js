import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded'
import AlarmOnRoundedIcon from '@material-ui/icons/AlarmOnRounded'
import BlockRoundedIcon from '@material-ui/icons/BlockRounded'
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded'
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded'
import { Tooltip, IconButton } from '@material-ui/core'
import { sections } from './routes'
import { find, isObject } from 'lodash'
import { FutBobPalette } from '../../palette'

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
