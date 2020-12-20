import { Player } from "../Player/entities"

export enum Sex {
   Male,
   Female
}

export type User = {
   _id: string
   name: string
   surname: string
   dateOfBirth: string
   sex: Sex
   country: string
   futsalPlayer?: Player
   avatar?: string
   username?: string
   email?: string
   phone: string
}