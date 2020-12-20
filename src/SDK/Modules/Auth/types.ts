import { CreateUserInput } from "../User/types"

export type SigninInput = {
   username: string
   password: string
}

export type SignupInput = CreateUserInput & SigninInput 