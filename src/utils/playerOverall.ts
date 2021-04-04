import { Defense, Pace, Passing, Physical, PlayerPosition, PlayerScore, Shooting, Technique } from '@_SDK_Player/types'
import { reduce } from 'lodash'
import { RadarChartData } from '@_components/Charts/Radar'
import zenToolbox from '@_utils/toolbox'

export const getPlayerOverall = (score: PlayerScore, positions: PlayerPosition[]): { overall: number, chartData: RadarChartData[] } => {
   const { chartData, ...zoneOverall } = reduce(
		score,
		(acc, val, key) => {
			// calcolo media ponderata della categoria corrente
         const keyMean = getKeyMean(val, key)
         // aggiungo a chartData i valori che poi andrò a visualizzare nel grafico in dettaglio player
         acc.chartData.push({ prop: zenToolbox.capitalize(key), value: Math.trunc(keyMean) })
			// calcolo media ponderata della categoria corrente secondo le zone del campo
			acc[Zone.Back] += keyMean * lvl2Coeff[key][Zone.Back]
			acc[Zone.Center] += keyMean * lvl2Coeff[key][Zone.Center]
			acc[Zone.Forward] += keyMean * lvl2Coeff[key][Zone.Forward]
			return acc
		},
		{
			[Zone.Back]: 0,
			[Zone.Center]: 0,
			[Zone.Forward]: 0,
         chartData: [] as RadarChartData[]
		}
	)
	// sistemo in ordine di importanza i ruoli del giocatore secondo la zona del campo interessata
	const zoneRoleImportance = [
		...new Set<Zone>(
			reduce(
				positions,
				(acc, val) => {
					if ([PlayerPosition.LeftWing, PlayerPosition.RightWing].includes(val)) acc.push(Zone.Center)
					else if ([PlayerPosition.Back, PlayerPosition.GoalKeeper].includes(val)) acc.push(Zone.Back)
					else if ([PlayerPosition.Forward].includes(val)) acc.push(Zone.Forward)
					return acc
				},
				[]
			)
		)
	]
	const nRoles = zoneRoleImportance.length
	// calcolo l'overall ponderato per zona del campo
	const overall = reduce(
		zoneRoleImportance,
		(acc, val, idx) => {
			acc += zoneOverall[val] * roleCoeff[nRoles][idx]
			return acc
		},
		0
	)

	return { overall: Math.trunc(overall), chartData }
}

type SingleScoreVal = Pace|Shooting|Passing|Technique|Defense|Physical

export const getKeyMean = (val: SingleScoreVal, key: string, truncate = false) => {
   const keyMean = reduce(val, (acc1, val1, key1) => {
      acc1 += val1 * lvl1Coeff[key][key1]
      return acc1
   }, 0)
   return truncate
      ? Math.trunc(keyMean)
      : keyMean
}

enum Zone {
	Forward = 'Forward',
	Center = 'Center',
	Back = 'Back'
}

const roleCoeff = Object.freeze({
	1: [1],
	2: [0.75, 0.25],
	3: [0.5, 0.3, 0.2]
})

const lvl1Coeff: PlayerScore = Object.freeze({
	pace: {
		speed: 0.6,
		stamina: 0.4
	},
	passing: {
		vision: 0.6,
		shortPassing: 0.3,
		longPassing: 0.1
	},
	defense: {
		interception: 0.2,
		defensiveAwareness: 0.3,
		versus: 0.5
	},
	shooting: {
		finishing: 0.6,
		shotPower: 0.1,
		longShots: 0.3
	},
	technique: {
		agility: 0.3,
		ballControl: 0.5,
		dribbling: 0.2
	},
	physical: {
		strength: 1
	}
})

type ScoreKey = keyof typeof lvl1Coeff

const lvl2Coeff: Record<ScoreKey, Record<Zone, number>> = Object.freeze({
	pace: {
		[Zone.Back]: 0.05,
		[Zone.Center]: 0.08,
		[Zone.Forward]: 0.05
	},
	shooting: {
		[Zone.Back]: 0.03,
		[Zone.Center]: 0.15,
		[Zone.Forward]: 0.7
	},
	passing: {
		[Zone.Back]: 0.06,
		[Zone.Center]: 0.35,
		[Zone.Forward]: 0.05
	},
	technique: {
		[Zone.Back]: 0.01,
		[Zone.Center]: 0.35,
		[Zone.Forward]: 0.05
	},
	defense: {
		[Zone.Back]: 0.7,
		[Zone.Center]: 0.04,
		[Zone.Forward]: 0.05
	},
	physical: {
		[Zone.Back]: 0.15,
		[Zone.Center]: 0.03,
		[Zone.Forward]: 0.1
	}
})
