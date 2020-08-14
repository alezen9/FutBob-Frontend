import produce from 'immer'

export const _immer = config => (set, get, api) => config(fn => set(produce(fn)), get, api)

export const userFields = `{
    _id,
    name,
    surname,
    dateOfBirth,
    sex,
    futsalPlayer {
      _id,
      positions,
      state,
      type,
      radar {
        speed,
        stamina,
        defence,
        balance,
        ballControl,
        passing,
        finishing
      }
    }
    avatar,
    username,
    email,
    phone
  }`

export const playerFields = `{
    _id,
    user {
      _id,
      name,
      surname,
      dateOfBirth,
      sex,
      phone,
      email
    },
    positions,
    state,
    radar {
      speed,
      stamina,
      defence,
      balance,
      ballControl,
      passing,
      finishing
    }
  }`
