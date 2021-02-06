import { Sex } from '@_SDK_User/types'

export class LoginInput {
	email: string
	password: string
}

export class RegisterInput {
	name: string
	surname: string
	dateOfBirth: string | Date
	sex: Sex
	country: string
	phone: string
	email: string
}


export class FinalizeRegistrationInput {
   unverifiedCode: string
   password: string
   confirmPassword: string
}

export class RequestResendInput {
   expiredCode: string
   email: string
}