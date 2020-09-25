import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { get } from 'lodash'
import getConfig from 'next/config'
import { paramsToString } from '../utils/helpers'
import { FieldsToQuery } from './helpers'
import { GQL_PlayerType, GQL_UserType } from './types'
const { publicRuntimeConfig } = getConfig()

const LogRequest = ({name, response, params, fields, isError = false}) => {
  if(process.env.NODE_ENV == 'development'){
    if(isError) {
      console.error('API: ', name)
      console.error('Params: \n', params)
      console.error('RequestedFields: \n', fields)
      console.error('Response: \n', response)
    } else {
      console.group(`%cAPI: ${name}`, 'color: rgb(42, 156, 71);')
      params && console.log(`Params: \n`, params)
      fields && console.log(`RequestedFields: \n`, fields)
      console.log(`Response: \n`, response)
      console.groupEnd()
    }
  }
}

class FutBobServer {
  localStorageToken: string
  _self: AxiosInstance
  authHeader: string|undefined
  constructor () {
    this.localStorageToken = 'FutBobToken'
    this.authHeader = process.browser ? window.localStorage.getItem(this.localStorageToken) : undefined
    this._self = axios.create({
      baseURL: `${publicRuntimeConfig.API_URL}`,
      timeout: 100000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...this.authHeader && { Authorization: `Bearer ${this.authHeader}` }
      }
    })
    this._self.interceptors.response.use(
      response => response.data || null,
      error => {
        throw get(error, 'response.data.errors[0].message', error)
      }
    )
    this._self.interceptors.request.use(config => {
      if (process.browser && !config.headers.common['Authorization'] && process.browser && window.localStorage.getItem(this.localStorageToken)) {
        const _token = window.localStorage.getItem(this.localStorageToken)
        const authorization = `Bearer ${_token}`
        config.headers.common['Authorization'] = authorization
        this._self.defaults.headers.common['Authorization'] = `Bearer ${_token}`
      }
      return config
    },
    err => Promise.reject(err))
  }

  async API ({ query, name, params, fields }: { query: string, name: string, params?: any, fields?: object }) {
    return this._self.post('/graphql', { query })
      .then((res: any) => {
        const { data, errors } = res
        if (errors && errors.length) {
          LogRequest({
            name,
            params,
            fields,
            response: errors,
            isError: true
          })
          throw errors[0].message
        } else {
          LogRequest({
            name,
            params,
            fields,
            response: data[name]
          })
          return data[name]
        }
      })
  }

  setToken (token: string) {
    const tokenSet = get(this._self, 'defaults.headers.common.Authorization', undefined)
    let _token = tokenSet ? tokenSet.split(' ')[1] : undefined
    if (token !== _token) {
      this._self.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    window.localStorage.setItem(this.localStorageToken, token)
  }

  hasToken () {
    return get(this._self, 'defaults.headers.common.Authorization', undefined) || (process.browser && window.localStorage.getItem(this.localStorageToken))
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
    return this.API({ query, name: 'signup', params: signupInput, fields })
  }

  async user_login (signinInput: { username: string, password: string }) { // eslint-disable-line
    const query = `
    query {
        login(signinInput: ${paramsToString(signinInput)}){ token }
    }`
    return this.API({ query, name: 'login', params: signinInput })
  }

  user_logout (_logout?: VoidFunction) { // eslint-disable-line
    window.localStorage.removeItem(this.localStorageToken)
    this._self.defaults.headers.common['Authorization'] = undefined
    if (_logout) _logout()
  }

  async user_getUserConnected (fields: GQL_UserType) { // eslint-disable-line
    const strFields = FieldsToQuery(fields)
    const query = `
    query {
        getUserConnected ${strFields}
    }`
    return this.API({ query, name: 'getUserConnected', fields })
  }

  async user_changeUsername (newUsername: string) { // eslint-disable-line
    const query = `
    mutation {
        changeUsername(newUsername: "${newUsername}")
    }`
    return this.API({ query, name: 'changeUsername', params: { newUsername } })
  }

  async user_changePassword (oldPassword: string, newPassword: string) { // eslint-disable-line
    const query = `
    mutation {
        changePassword(oldPassword: "${oldPassword}", newPassword: "${newPassword}")
    }`
    return this.API({ query, name: 'changePassword', params: { oldPassword, newPassword } })
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
    return this.API({ query, name: 'updateUserConnected', params: userInput })
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
    return this.API({ query, name: 'updateUser', params: userInput })
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
    return this.API({ query, name: 'createPlayer', params: createPlayerInput })
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
    return this.API({ query, name: 'updatePlayer', params: updatePlayerInput })
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
    return this.API({ query, name: 'deletePlayer', params: deletePlayerInput })
  }

  /**
   *
   * @param {any} playerFilters
   * @param {any} fields
   * @param {string[]?} fields.ids
   * @param {number[]?} fields.positions
   * @param {number?} fields.type
   * @param {number?} fields.state
   * @param {any?} fields.score
   * @param {any?} fields.matches
   * @param {any?} fields.user
   */
  async player_getPlayers (playerFilters, fields: GQL_PlayerType) { // eslint-disable-line
    const strFields = FieldsToQuery(fields)
    const query = `
    query {
        getPlayers(playerFilters: ${paramsToString(playerFilters)}) ${strFields}
    }`
    return this.API({ query, name: 'getPlayers', params: playerFilters, fields })
  }
}

export const apiInstance = new FutBobServer()
