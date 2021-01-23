import React from 'react'
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded'
import AlarmOnRoundedIcon from '@material-ui/icons/AlarmOnRounded'
import BlockRoundedIcon from '@material-ui/icons/BlockRounded'
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded'
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded'
import { Tooltip, IconButton } from '@material-ui/core'
import { routes } from './routes'
import { isObject, uniqueId, reduce, map, compact } from 'lodash'
import { ZenPalette } from '@_palette'
import { TopFormIcon, InjuredIcon, RecoveryIcon } from '@_icons'
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'
import cleanDeep from 'clean-deep'
import { PlayerPosition, PlayerScore } from '@_SDK_Player/entities'
import { OptionType } from '@_components/FormikInput'

export const cleanPathname = (path: string = '') => path.split('?')[0]

export const getTitleFromPathname = (pathname: string) => {
	const routeInfo: any = routes.find(
		({ path }) => cleanPathname(path) === pathname
	)
	if (!routeInfo) return 'Dashboard'
	return routeInfo.title
}

export const capitalize = (s: string) =>
	s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase()

export const asyncTimeout = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms))

export const camelize = (str: string) => {
	if (!str) return ''
	return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
		if (+match === 0) return '' // or if (/\s+/.test(match)) for white spaces
		return index === 0 ? match.toLowerCase() : match.toUpperCase()
	})
}

const defaultStyleIcons = {
	marginRight: '.5em',
	fontSize: '1.1em',
}

const defaultStyleIconsTooltips = {
	fontSize: '0',
	transform: 'scale(.7)',
	color: ZenPalette.typographyGrey,
}

export const paramsToString = (params) => {
	let str = ''
	for (const key in params) {
		if (isObject(params[key])) {
			if (params[key] instanceof Array)
				str +=
					key +
					':' +
					'[' +
					params[key].map((el) => (isNaN(el) ? `"${el}"` : el)) +
					']' +
					', '
			else str += key + ':' + paramsToString(params[key]) + ', '
		} else if (isNaN(params[key])) str += key + ':"' + params[key] + '", '
		else str += key + ':' + params[key] + ', '
	}
	return `{${str.slice(0, -2)}}`
}

export const UserStatusIconMap = Object.freeze({
	0: {
		normal: (
			<AccessTimeRoundedIcon
				style={{ ...defaultStyleIcons, color: 'orange' }}
			/>
		),
		tooltip: (
			<Tooltip title='In attesa'>
				<IconButton
					aria-label=''
					style={{ ...defaultStyleIconsTooltips, color: 'orange' }}
				>
					<AccessTimeRoundedIcon />
				</IconButton>
			</Tooltip>
		),
	},
	1: {
		normal: (
			<CheckCircleOutlineRoundedIcon
				style={{ ...defaultStyleIcons, color: '#00e613' }}
			/>
		),
		tooltip: (
			<Tooltip title='Confermato'>
				<IconButton
					aria-label=''
					style={{ ...defaultStyleIconsTooltips, color: '#00e613' }}
				>
					<CheckCircleOutlineRoundedIcon />
				</IconButton>
			</Tooltip>
		),
	},
	2: {
		normal: (
			<BlockRoundedIcon style={{ ...defaultStyleIcons, color: 'crimson' }} />
		),
		tooltip: (
			<Tooltip title='Bannato'>
				<IconButton
					aria-label=''
					style={{ ...defaultStyleIconsTooltips, color: 'crimson' }}
				>
					<BlockRoundedIcon />,
				</IconButton>
			</Tooltip>
		),
	},
	3: {
		normal: (
			<RemoveCircleOutlineRoundedIcon
				style={{ ...defaultStyleIcons, opacity: 0.6 }}
			/>
		),
		tooltip: (
			<Tooltip title='Non invitato'>
				<IconButton
					aria-label=''
					style={{ ...defaultStyleIconsTooltips, opacity: 0.6 }}
				>
					<RemoveCircleOutlineRoundedIcon />
				</IconButton>
			</Tooltip>
		),
	},
	4: {
		normal: (
			<AlarmOnRoundedIcon style={{ ...defaultStyleIcons, color: '#00d4ff' }} />
		),
		tooltip: (
			<Tooltip title='Primo accesso'>
				<IconButton
					aria-label=''
					style={{ ...defaultStyleIconsTooltips, color: '#00d4ff' }}
				>
					<AlarmOnRoundedIcon />
				</IconButton>
			</Tooltip>
		),
	},
})

export const futsalPositionsOptions = [
	{
		value: 0,
		label: 'Goalkeeper',
	},
	{
		value: 1,
		label: 'Back',
	},
	{
		value: 2,
		label: 'Left wing',
	},
	{
		value: 3,
		label: 'Right wing',
	},
	{
		value: 4,
		label: 'Forward',
	},
]

const PhysicalState = React.memo((props: { label: string; value: number }) => {
	const { label, value } = props
	return (
		<span style={{ display: 'flex', fontSize: '1em', alignItems: 'center' }}>
			{value === 0 && (
				<TopFormIcon style={{ color: 'limegreen', fontSize: '1.2em' }} />
			)}
			{value === 1 && (
				<ExpandLessRoundedIcon style={{ color: 'orange', fontSize: '1.2em' }} />
			)}
			{value === 2 && (
				<ExpandMoreRoundedIcon
					style={{ color: 'crimson', fontSize: '1.2em' }}
				/>
			)}
			{value === 3 && (
				<InjuredIcon style={{ color: 'red', fontSize: '1.2em' }} />
			)}
			{value === 4 && <RecoveryIcon style={{ fontSize: '1.1em' }} />}
			<span style={{ marginLeft: '1em' }}>{label}</span>
		</span>
	)
})

export const playerPhysicalStateOptions = [
	{
		value: 0,
		label: 'Top',
		component: <PhysicalState label='Top' value={0} />,
	},
	{
		value: 1,
		label: 'Medium',
		component: <PhysicalState label='Medium' value={1} />,
	},
	{
		value: 2,
		label: 'Low',
		component: <PhysicalState label='Low' value={2} />,
	},
	{
		value: 3,
		label: 'Injured',
		component: <PhysicalState label='Injured' value={3} />,
	},
	{
		value: 4,
		label: 'Recovery',
		component: <PhysicalState label='Recovery' value={4} />,
	},
]

export const getLabelsByValues = ({
	values = [],
	options = [],
	list = false,
	separator = ', ',
}) => {
	const labels = options.reduce((acc, { value, label }) => {
		if (values.includes(value)) return [...acc, label]
		return acc
	}, [])
	return list
		? labels.map((label) => <div key={uniqueId()}>• {label}</div>)
		: labels.join(separator)
}

export const decamelize = (str: string, separator?: string) => {
	separator = typeof separator === 'undefined' ? ' ' : separator

	return capitalize(
		(str || '')
			.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
			.replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
			.toLowerCase()
	)
}

export const initialScoreValues: PlayerScore = {
	pace: {
		speed: 0,
		stamina: 0,
	},
	shooting: {
		finishing: 0,
		shotPower: 0,
		longShots: 0,
	},
	passing: {
		vision: 0,
		shortPassing: 0,
		longPassing: 0,
	},
	technique: {
		agility: 0,
		ballControl: 0,
		dribbling: 0,
	},
	defense: {
		interception: 0,
		defensiveAwareness: 0,
		versus: 0,
	},
	physical: {
		strength: 0,
	},
}

export const cleanQueryParams = (query) => {
	return reduce(
		query,
		(acc, value, key) => {
			if (/^\[+[a-zA-Z0-9]+\]/gim.test(value)) return acc
			return {
				...acc,
				[key]: value,
			}
		},
		{}
	)
}

export const getScoreColor = (value: number) => {
	if (value < 40) return 'crimson'
	if (value < 65) return 'orange'
	if (value < 85) return ZenPalette.darkGreen
	if (value <= 100) return '#B29600'
	return ZenPalette.typographyGrey
}

export const getMultipleInitValue = (vals = [], options = []) => {
	return cleanDeep(
		options.reduce((acc, val) => {
			const { value, label } = val || {}
			if (vals.includes(value)) acc.push({ value, label })
			return acc
		}, [])
	)
}

export const getOptionsByEnum = (entity): OptionType[] =>
	compact(
		map(entity, (el, i) =>
			!isNaN(el) ? { label: decamelize(i), value: parseInt(el) } : null
		)
	)

export const formatter = new Intl.NumberFormat('it-IT', {
	style: 'currency',
	currency: 'EUR',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
})

export const eurosToCents = (euros: number) => Math.trunc(euros * 100)

export const centsToEuros = (cents: number) => formatter.format(cents / 100)

class ZenHelpers {
	private formatter: Intl.NumberFormat

	constructor() {
		this.formatter = new Intl.NumberFormat('it-IT', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		})
	}

	amount_eurosToCents = (euros: number) => Math.trunc(euros * 100)

	amount_centsToEuros = (cents: number) => this.formatter.format(cents / 100)

	formik_getOptionsByEnum = (entity: object): OptionType[] => {
		return compact(
			map(entity, (el, i) =>
				!isNaN(el)
					? { label: this.text_decamelize(i), value: parseInt(el) }
					: null
			)
		)
	}

	formik_getMultipleInitValue = (vals = [], options = []) => {
		return cleanDeep(
			options.reduce((acc, val) => {
				const { value, label } = val || {}
				if (vals.includes(value)) acc.push({ value, label })
				return acc
			}, [])
		)
	}

	player_getScoreColor = (value: number) => {
		if (value < 40) return 'crimson'
		if (value < 65) return 'orange'
		if (value < 85) return ZenPalette.darkGreen
		if (value <= 100) return '#B29600'
		return ZenPalette.typographyGrey
	}

	general_getLabelsByValues = ({
		values = [],
		options = [],
		list = false,
		separator = ', ',
	}) => {
		const labels = options.reduce((acc, { value, label }) => {
			if (values.includes(value)) return [...acc, label]
			return acc
		}, [])
		return list
			? labels.map((label) => <div key={uniqueId()}>• {label}</div>)
			: labels.join(separator)
	}

	text_decamelize = (str: string, separator?: string) => {
		separator = typeof separator === 'undefined' ? ' ' : separator

		return this.text_capitalize(
			(str || '')
				.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
				.replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
				.toLowerCase()
		)
	}

	route_cleanPathname = (path: string = '') => path.split('?')[0]

	text_getTitleFromPathname = (pathname: string) => {
		const routeInfo: any = routes.find(
			({ path }) => this.route_cleanPathname(path) === pathname
		)
		if (!routeInfo) return 'Dashboard'
		return routeInfo.title
	}

	text_capitalize = (s: string) =>
		s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase()

	general_asyncTimeout = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms))

	text_camelize = (str: string) => {
		if (!str) return ''
		return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
			if (+match === 0) return '' // or if (/\s+/.test(match)) for white spaces
			return index === 0 ? match.toLowerCase() : match.toUpperCase()
		})
	}

	gql_paramsToString = (params) => {
		let str = ''
		for (const key in params) {
			if (isObject(params[key])) {
				if (params[key] instanceof Array)
					str +=
						key +
						':' +
						'[' +
						params[key].map((el) => (isNaN(el) ? `"${el}"` : el)) +
						']' +
						', '
				else str += key + ':' + this.gql_paramsToString(params[key]) + ', '
			} else if (isNaN(params[key])) str += key + ':"' + params[key] + '", '
			else str += key + ':' + params[key] + ', '
		}
		return `{${str.slice(0, -2)}}`
	}

	gql_cleanQueryParams = (query) => {
		ale
		return reduce(
			query,
			(acc, value, key) => {
				if (/^\[+[a-zA-Z0-9]+\]/gim.test(value)) return acc
				return {
					...acc,
					[key]: value,
				}
			},
			{}
		)
	}
}
