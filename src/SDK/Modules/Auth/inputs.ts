import { Sex } from "@_SDK_User/types"

export class LoginInput {
   email: string
   password: string
}

export class RegisterInput {
   name: string
   surname: string
   dateOfBirth: string|Date
   sex: Sex
   country: string
   phone: string
   email: string
   password: string
}