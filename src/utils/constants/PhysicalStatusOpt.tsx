import React from 'react'
import { TopFormIcon, InjuredIcon, RecoveryIcon } from '@_icons'
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'
import { OptionType } from '@_components/FormikInput'

const PhysicalState = React.memo((props: OptionType) => {
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