import React from 'react'
import { TopFormIcon, InjuredIcon, RecoveryIcon } from '@_icons'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import { OptionType } from '@_components/FormikInput'
import { PhysicalState } from '@_SDK_Player/types'

const PhysicalStateIcon = React.memo((props: OptionType) => {
	const { label, value } = props
	return (
		<span style={{ display: 'flex', fontSize: '1em', alignItems: 'center' }}>
			{value === 0 && <TopFormIcon style={{ color: 'limegreen', fontSize: '1.2em' }} />}
			{value === 1 && <ExpandLessRoundedIcon style={{ color: 'orange', fontSize: '1.2em' }} />}
			{value === 2 && <ExpandMoreRoundedIcon style={{ color: 'crimson', fontSize: '1.2em' }} />}
			{value === 3 && <InjuredIcon style={{ color: 'red', fontSize: '1.2em' }} />}
			{value === 4 && <RecoveryIcon style={{ fontSize: '1.1em' }} />}
			<span style={{ marginLeft: '1em' }}>{label}</span>
		</span>
	)
})

export const PhysicalStateOpts = [
	{
		value: PhysicalState.Top,
		label: 'Top',
		component: <PhysicalStateIcon label='Top' value={PhysicalState.Top} />
	},
	{
		value: PhysicalState.Medium,
		label: 'Medium',
		component: <PhysicalStateIcon label='Medium' value={PhysicalState.Medium} />
	},
	{
		value: PhysicalState.Low,
		label: 'Low',
		component: <PhysicalStateIcon label='Low' value={PhysicalState.Low} />
	},
	{
		value: PhysicalState.Injured,
		label: 'Injured',
		component: <PhysicalStateIcon label='Injured' value={PhysicalState.Injured} />
	},
	{
		value: PhysicalState.Recovery,
		label: 'Recovery',
		component: <PhysicalStateIcon label='Recovery' value={PhysicalState.Recovery} />
	}
]