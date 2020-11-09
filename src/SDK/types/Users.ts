import { User } from "@_entities/User"

export type CreateUserInput = Omit<User, '_id'|'futsalPlayer'>

export type UpdateUserInput = Pick<User, '_id'> & Partial<Omit<User, 'futsalPlayer'>>

export type SignupInput = CreateUserInput & {
   username: string
   password: string
}
