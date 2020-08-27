import axios from 'axios'
import { get } from 'lodash'
import getConfig from 'next/config'
import { paramsToString } from '../utils/helpers'
const { publicRuntimeConfig } = getConfig()

class FutBobServer {
  constructor () {
    this.localStorageToken = 'FutBobToken'
    this.TOKEN = process.browser
      ? window.localStorage.getItem(this.localStorageToken)
      : undefined
    const authHeader = `Bearer ${this.TOKEN}`
    this._self = axios.create({
      baseURL: `${publicRuntimeConfig.API_URL}`,
      timeout: 100000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...this.TOKEN && { Authorization: authHeader }
      }
    })
    this._self.interceptors.response.use(
      response => response.data || null,
      error => {
        throw get(error, 'response.data.errors[0].message', error)
      }
    )
    this._self.interceptors.request.use(config => {
      if (process.browser && !config.headers.common['Authorization'] && window.localStorage.getItem(this.localStorageToken)) {
        const _token = window.localStorage.getItem(this.localStorageToken)
        const authorization = `Bearer ${_token}`
        config.headers.common['Authorization'] = authorization
        this._self.defaults.headers.common['Authorization'] = `Bearer ${_token}`
        this.TOKEN = _token
      } else if (this.TOKEN) {
        const authorization = `Bearer ${this.TOKEN}`
        config.headers.common['Authorization'] = authorization
        this._self.defaults.headers.common['Authorization'] = `Bearer ${this.TOKEN}`
      }
      return config
    },
    err => Promise.reject(err))
  }

  async API ({ query, name }) {
    return this._self.post('/graphql', { query })
      .then(res => {
        const { data, errors } = res
        if (errors && errors.length) throw errors[0].message
        else return data[name]
      })
  }

  /**
   *
   * @param {string} token
   */
  setToken (token) {
    const tokenSet = get(this._self, 'defaults.headers.common.Authorization', undefined)
    let _token = tokenSet ? tokenSet.split(' ')[1] : undefined
    if (token !== _token) {
      this._self.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    this.TOKEN = token
    window.localStorage.setItem(this.localStorageToken, token)
  }

  /**
   *
   * @param {any} signupInput
   * @param {string} signupInput.name
   * @param {string} signupInput.surname
   * @param {string} signupInput.dateOfBirth
   * @param {string} signupInput.phone
   * @param {string?} signupInput.email
   * @param {number?} signupInput.sex
   * @param {string} signupInput.username
   * @param {string} signupInput.password
   */
  // eslint-disable-next-line
  async user_signUp (signupInput, fields) {
    const query = `
    mutation {
        signup(signupInput: ${paramsToString(signupInput)})${fields}
    }`
    return this.API({ query, name: 'signup' })
  }

  /**
   *
   * @param {any} signinInput
   * @param {string} signinInput.username
   * @param {string} signinInput.password
   * @param {any} fields
   * @param {string?} fields.token
   * @param {string?} fields.expiresIn
   */
  async user_login (signinInput, fields) { // eslint-disable-line
    const query = `
    query {
        login(signinInput: ${paramsToString(signinInput)})${fields}
    }`
    return this.API({ query, name: 'login' })
  }

  /**
   *
   * @param {function?} _logout
   */
  user_logout (_logout) { // eslint-disable-line
    window.localStorage.removeItem(this.localStorageToken)
    if (_logout) _logout()
  }

  /**
   *
   * @param {any} fields
   * @param {string?} fields._id
   * @param {string?} fields.name
   * @param {string?} fields.surname
   * @param {string?} fields.dateOfBirth
   * @param {string?} fields.phone
   * @param {string?} fields.email
   * @param {string?} fields.sex
   * @param {string?} fields.username
   * @param {any?} fields.futsalPlayer
   * @param {string?} fields.futsalPlayer._id
   * @param {number[]?} fields.futsalPlayer.positions
   * @param {number?} fields.futsalPlayer.type
   * @param {number?} fields.futsalPlayer.state
   * @param {any?} fields.futsalPlayer.user
   * @param {any?} fields.futsalPlayer.score
   * @param {any?} fields.futsalPlayer.matches
   */
  async user_getUserConnected (fields) { // eslint-disable-line
    const query = `
    query {
        getUserConnected ${fields}
    }`
    return this.API({ query, name: 'getUserConnected' })
  }

  /**
   *
   * @param {string} newUsername
   */
  async user_changeUsername (newUsername) { // eslint-disable-line
    const query = `
    mutation {
        changeUsername(newUsername: "${newUsername}")
    }`
    return this.API({ query, name: 'changeUsername' })
  }

  /**
   *
   * @param {string} oldPassword
   * @param {string} newPassword
   */
  async user_changePassword (oldPassword, newPassword) { // eslint-disable-line
    const query = `
    mutation {
        changePassword(oldPassword: "${oldPassword}", newPassword: "${newPassword}")
    }`
    return this.API({ query, name: 'changePassword' })
  }

  /**
   *
   * @param {any} userInput
   * @param {string} userInput._id
   * @param {string?} userInput.name
   * @param {string?} userInput.surname
   * @param {string?} userInput.dateOfBirth
   * @param {string?} userInput.phone
   * @param {string?} userInput.email
   * @param {number?} userInput.sex
   */
  async user_updateUserConnected (userInput) { // eslint-disable-line
    const query = `
    mutation {
        updateUserConnected(userInput: ${paramsToString(userInput)})
    }`
    return this.API({ query, name: 'updateUserConnected' })
  }

  /**
   *
   * @param {any} userInput
   * @param {string} userInput._id
   * @param {string?} userInput.name
   * @param {string?} userInput.surname
   * @param {string?} userInput.dateOfBirth
   * @param {string?} userInput.phone
   * @param {string?} userInput.email
   * @param {number?} userInput.sex
   */
  async user_updateUser (userInput) { // eslint-disable-line
    const query = `
    mutation {
        updateUser(userInput: ${paramsToString(userInput)})
    }`
    return this.API({ query, name: 'updateUser' })
  }

  /**
   *
   * @param {any} createPlayerInput
   * @param {string?} createPlayerInput.userId
   * @param {any?} createPlayerInput.userData
   * @param {string} createPlayerInput.userData.name
   * @param {string} createPlayerInput.userData.surname
   * @param {string} createPlayerInput.userData.dateOfBirth
   * @param {string} createPlayerInput.userData.phone
   * @param {string?} createPlayerInput.userData.email
   * @param {number} createPlayerInput.userData.sex
   * @param {any} createPlayerInput.playerData
   * @param {number[]} createPlayerInput.playerData.positions
   * @param {number?} createPlayerInput.playerData.state
   * @param {number} createPlayerInput.playerData.type
   * @param {any} createPlayerInput.playerData.score
   */
  async player_createPlayer (createPlayerInput) { // eslint-disable-line
    const query = `
    mutation {
        createPlayer(createPlayerInput: ${paramsToString(createPlayerInput)})
    }`
    return this.API({ query, name: 'createPlayer' })
  }

  /**
   *
   * @param {any} updatePlayerInput
   * @param {string} updatePlayerInput._id
   * @param {number[]?} updatePlayerInput.positions
   * @param {number?} updatePlayerInput.state
   * @param {any?} updatePlayerInput.score
   */
  async player_updatePlayer (updatePlayerInput) { // eslint-disable-line
    const query = `
    mutation {
        updatePlayer(updatePlayerInput: ${paramsToString(updatePlayerInput)})
    }`
    return this.API({ query, name: 'updatePlayer' })
  }

  /**
   *
   * @param {any} deletePlayerInput
   * @param {string} deletePlayerInput._id
   * @param {string} deletePlayerInput.idUser
   * @param {number} deletePlayerInput.type
   */
  async player_deletePlayer (deletePlayerInput) { // eslint-disable-line
    const query = `
    mutation {
        deletePlayer(deletePlayerInput: ${paramsToString(deletePlayerInput)})
    }`
    return this.API({ query, name: 'deletePlayer' })
  }

  /**
   *
   * @param {any} playerFilters
   * @param {any} fields
   * @param {string?} fields._id
   * @param {number[]?} fields.positions
   * @param {number?} fields.type
   * @param {number?} fields.state
   * @param {any?} fields.score
   * @param {any?} fields.matches
   * @param {any?} fields.user
   */
  async player_getPlayers (playerFilters, fields) { // eslint-disable-line
    const query = `
    query {
        getPlayers(playerFilters: ${paramsToString(playerFilters)}) ${fields}
    }`
    return this.API({ query, name: 'getPlayers' })
  }
}

export const apiInstance = new FutBobServer()
