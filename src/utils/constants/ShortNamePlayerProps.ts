import { PlayerPosition } from '@_SDK_Player/types'

export const ShortName_Skill = {
  Pace: 'PAC',
  Shooting: 'SHO',
  Passing: 'PAS',
  Technique: 'TEC',
  Defense: 'DEF',
  Physical: 'PHY'
}

export const ShortName_Position = {
  [PlayerPosition.FutsalGoalKeeper]: 'GK',
  [PlayerPosition.FutsalBack]: 'DEF',
  [PlayerPosition.FutsalLeftWing]: 'LW',
  [PlayerPosition.FutsalRightWing]: 'RW',
  [PlayerPosition.FutsalForward]: 'FWD'
}
