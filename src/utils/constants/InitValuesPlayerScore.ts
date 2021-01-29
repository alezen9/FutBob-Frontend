import { PlayerScore } from "@_SDK_Player/types";

export const initialScoreValues: PlayerScore = {
	pace: {
		speed: 0,
		stamina: 0
	},
	shooting: {
		finishing: 0,
		shotPower: 0,
		longShots: 0
	},
	passing: {
		vision: 0,
		shortPassing: 0,
		longPassing: 0
	},
	technique: {
		agility: 0,
		ballControl: 0,
		dribbling: 0
	},
	defense: {
		interception: 0,
		defensiveAwareness: 0,
		versus: 0
	},
	physical: {
		strength: 0
	}
}