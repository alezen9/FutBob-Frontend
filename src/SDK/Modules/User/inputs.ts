import { AdditionalInfo, Sex } from './types'

export class ChangePasswordInput {
	oldPassword: string
	newPassword: string
}
export class CreateUserInput {
	name: string
	surname: string
	dateOfBirth: string | Date
	sex: Sex
	country: string
	phone: string
   additionalInfo?: AdditionalInfo
}
export class UpdateRegistryInput {
	_id: string
	name?: string
	surname?: string
	dateOfBirth?: string | Date
	sex?: Sex
	country?: string
	phone?: string
   email?: string
   additionalInfo?: AdditionalInfo
}
