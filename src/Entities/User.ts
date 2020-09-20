import { Player } from "./Player";

export enum Sex {
    Male,
    Female
}

export interface User {
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