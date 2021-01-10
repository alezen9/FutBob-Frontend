import { Player } from "../Player/entities"

export enum Sex {
   Male,
   Female
}

export type User = {
   _id: string
   registry: {
      name: string
      surname: string
      dateOfBirth: string
      sex: Sex
      country: string
      email?: string
      phone: string
   },
   player?: Player
   username?: string
}