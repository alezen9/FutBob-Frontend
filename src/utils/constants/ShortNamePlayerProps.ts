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
  [PlayerPosition.GoalKeeper]: 'GK',
  [PlayerPosition.Back]: 'DEF',
  [PlayerPosition.LeftWing]: 'LW',
  [PlayerPosition.RightWing]: 'RW',
  [PlayerPosition.Forward]: 'FWD'
}
