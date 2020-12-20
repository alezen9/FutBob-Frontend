import { User } from "./entities"

export type CreateUserInput = Omit<User, '_id'|'futsalPlayer'>

export type UpdateUserInput = Pick<User, '_id'> & Partial<Omit<User, 'futsalPlayer'>>

export type EditableUser = Partial<User>