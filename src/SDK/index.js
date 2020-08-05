import axios from 'axios'
import { get } from 'lodash'
import getConfig from 'next/config'
import { paramsToString } from '../utils/helpers'
const { publicRuntimeConfig } = getConfig()

class FutBobServer {
  constructor () {
    this.localStorageToken = 'FutBobToken'
    const token = process.browser
      ? window.localStorage.getItem(this.localStorageToken)
      : undefined
    this._self = axios.create({
      baseURL: `${publicRuntimeConfig.API_URL}`,
      timeout: 100000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...{ ...token && { token } }
      }
    })
    this._self.interceptors.response.use(
      response => response.data || null,
      error => {
        throw get(error, 'response.data.errors[0].message', error)
      }
    )
  }

  async API ({ query, name }) {
    return this._self.post('/graphql', { query })
      .then(res => {
        const { data, errors } = res
        if (errors && errors.length) throw errors[0].message
        else return data[name]
      })
  }

  setToken (token) {
    const tokenSet = get(this._self, 'defaults.headers.common.Authorization', undefined)
    let _token = tokenSet ? tokenSet.split(' ')[1] : undefined
    if (token !== _token) {
      this._self.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }

  async user_signUp (signupInput, fields) {
    const query = `
    mutation {
        signup(signupInput: ${paramsToString(signupInput)})${fields}
    }`
    return this.API({ query, name: 'signup' })
  }

  async user_login (signinInput, fields) {
    const query = `
    query {
        login(signinInput: ${paramsToString(signinInput)})${fields}
    }`
    return this.API({ query, name: 'login' })
  }

  user_logout (_logout) {
    window.localStorage.removeItem(this.localStorageToken)
    if (_logout) _logout()
  }

  async user_getUserConnected (fields) {
    const query = `
    query {
        getUserConnected ${fields}
    }`
    return this.API({ query, name: 'getUserConnected' })
  }

  async user_changeUsername (newUsername) {
    const query = `
    mutation {
        changeUsername(newUsername: "${newUsername}")
    }`
    return this.API({ query, name: 'changeUsername' })
  }

  async user_changePassword (oldPassword, newPassword) {
    const query = `
    mutation {
        changePassword(oldPassword: "${oldPassword}", newPassword: "${newPassword}")
    }`
    return this.API({ query, name: 'changePassword' })
  }

  async user_updateUserConnected (userInput) {
    const query = `
    mutation {
        updateUserConnected(userInput: ${paramsToString(userInput)})
    }`
    return this.API({ query, name: 'updateUserConnected' })
  }

  async user_updateUser (userInput) {
    const query = `
    mutation {
        updateUser(userInput: ${paramsToString(userInput)})
    }`
    return this.API({ query, name: 'updateUser' })
  }

  async player_createPlayer (createPlayerInput) {
    const query = `
    mutation {
        createPlayer(createPlayerInput: ${paramsToString(createPlayerInput)})
    }`
    return this.API({ query, name: 'createPlayer' })
  }

  async player_updatePlayer (updatePlayerInput) {
    const query = `
    mutation {
        updatePlayer(updatePlayerInput: ${paramsToString(updatePlayerInput)})
    }`
    return this.API({ query, name: 'updatePlayer' })
  }

  async player_deletePlayer (deletePlayerInput) {
    const query = `
    mutation {
        deletePlayer(deletePlayerInput: ${paramsToString(deletePlayerInput)})
    }`
    return this.API({ query, name: 'deletePlayer' })
  }

  async player_getPlayers (playerFilters, fields) {
    const query = `
    query {
        getPlayers(playerFilters: ${paramsToString(playerFilters)}) ${fields}
    }`
    return this.API({ query, name: 'getPlayers' })
  }
}

export const apiInstance = new FutBobServer()
