import { User } from "./entities"

export type CreateUserInput = Omit<User, '_id'|'player'>

export type UpdateUserInput = Pick<User, '_id'> & Partial<Omit<User, 'player'>>

export type EditableUser = Partial<User>