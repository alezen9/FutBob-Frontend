import { Player } from '@_SDK_Player/types'

export enum Sex {
	Male,
	Female
}

export class Credentials {
	email: string
}

export type AdditionalInfo = {
   email?: string
}
export class Registry {
	name: string
	surname: string
	dateOfBirth: Date | string
	sex: Sex
	country: string
	phone: string
   additionalInfo?: AdditionalInfo
}
export class User {
	_id: string
	registry: Registry
	credentials?: Credentials
	player?: Player
}
