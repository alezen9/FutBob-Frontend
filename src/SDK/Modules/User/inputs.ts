import { Sex } from "./types"

export class ChangePasswordInput {
   oldPassword: string
   newPassword: string
}

export class CreateUserInput {
   name: string
   surname: string
   dateOfBirth: string|Date
   sex: Sex
   country: string
   email?: string
   phone: string
}
export class UpdateRegistryInput {
   _id: string
   name?: string
   surname?: string
   dateOfBirth?: string|Date
   sex?: Sex
   country?: string
   email?: string
   phone?: string
}