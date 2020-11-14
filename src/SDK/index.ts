import { LSToken } from '@_utils/LSVariables'
import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { get } from 'lodash'
import getConfig from 'next/config'
import { paramsToString } from '../utils/helpers'
import { FieldsToQuery } from './helpers'
import { CreateFieldInput, FieldFilters, UpdateFieldInput } from './types/Fields'
import { GQL_FieldType, GQL_PlayerType, GQL_UserType } from './types/generic'
import { PlayerFilters, DeletePlayerInput, UpdatePlayerInput, CreatePlayerInput } from './types/Players'
import { SignupInput, UpdateUserInput } from './types/Users'
const { publicRuntimeConfig } = getConfig()

const LogRequest = ({name, response, params, fields, isError = false}) => {
  if(publicRuntimeConfig.ENV === 'test'){
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
    this.localStorageToken = LSToken
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

  hasToken (): boolean {
    return !!(get(this._self, 'defaults.headers.common.Authorization', undefined) || (process.browser && window.localStorage.getItem(this.localStorageToken)))
  }

  async user_signUp (signupInput: SignupInput, fields) {
    const query = `
    mutation {
        signup(signupInput: ${paramsToString(signupInput)})${fields}
    }`
    return this.API({ query, name: 'signup', params: signupInput, fields })
  }

  async user_login (signinInput: { username: string, password: string }): Promise<{ token: string }> {
    const query = `
    query {
        login(signinInput: ${paramsToString(signinInput)}){ token }
    }`
    return this.API({ query, name: 'login', params: signinInput })
  }

  user_logout (_logout?: VoidFunction): void {
    window.localStorage.removeItem(this.localStorageToken)
    this._self.defaults.headers.common['Authorization'] = undefined
    if (_logout) _logout()
  }

  async user_getUserConnected (fields: GQL_UserType) {
    const strFields = FieldsToQuery(fields)
    const query = `
    query {
        getUserConnected ${strFields}
    }`
    return this.API({ query, name: 'getUserConnected', fields })
  }

  async user_changeUsername (newUsername: string) {
    const query = `
    mutation {
        changeUsername(newUsername: "${newUsername}")
    }`
    return this.API({ query, name: 'changeUsername', params: { newUsername } })
  }

  async user_changePassword (oldPassword: string, newPassword: string) {
    const query = `
    mutation {
        changePassword(oldPassword: "${oldPassword}", newPassword: "${newPassword}")
    }`
    return this.API({ query, name: 'changePassword', params: { oldPassword, newPassword } })
  }

  async user_updateUserConnected (userInput: Partial<UpdateUserInput>) {
    const query = `
    mutation {
        updateUserConnected(userInput: ${paramsToString(userInput)})
    }`
    return this.API({ query, name: 'updateUserConnected', params: userInput })
  }

  async user_updateUser (userInput: UpdateUserInput) {
    const query = `
    mutation {
        updateUser(userInput: ${paramsToString(userInput)})
    }`
    return this.API({ query, name: 'updateUser', params: userInput })
  }

  async player_createPlayer (createPlayerInput: CreatePlayerInput) {
    const query = `
    mutation {
        createPlayer(createPlayerInput: ${paramsToString(createPlayerInput)})
    }`
    return this.API({ query, name: 'createPlayer', params: createPlayerInput })
  }

  async player_updatePlayer (updatePlayerInput: UpdatePlayerInput) {
    const query = `
    mutation {
        updatePlayer(updatePlayerInput: ${paramsToString(updatePlayerInput)})
    }`
    return this.API({ query, name: 'updatePlayer', params: updatePlayerInput })
  }


  async player_deletePlayer (deletePlayerInput: DeletePlayerInput) {
    const query = `
    mutation {
        deletePlayer(deletePlayerInput: ${paramsToString(deletePlayerInput)})
    }`
    return this.API({ query, name: 'deletePlayer', params: deletePlayerInput })
  }


  async player_getPlayers (playerFilters: PlayerFilters, fields: GQL_PlayerType) {
    const strFields = FieldsToQuery(fields, true)
    const query = `
    query {
        getPlayers(playerFilters: ${paramsToString(playerFilters)}) ${strFields}
    }`
    return this.API({ query, name: 'getPlayers', params: playerFilters, fields })
  }

  async field_getFields(fieldsFilters: FieldFilters, fields: GQL_FieldType): Promise<any> {
     const strFields = FieldsToQuery(fields, true)
    const query = `
    query {
        getFields(fieldsFilters: ${paramsToString(fieldsFilters)}) ${strFields}
    }`
    return this.API({ query, name: 'getFields', params: fieldsFilters, fields })
  }

  async field_createField(createFieldInput: CreateFieldInput): Promise<any> {
    const query = `
    mutation {
        createField(createFieldInput: ${paramsToString(createFieldInput)})
    }`
    return this.API({ query, name: 'createField' })
  }

  async field_updateField(updateFieldInput: UpdateFieldInput): Promise<any> {
    const query = `
    mutation {
        updateField(updateFieldInput: ${paramsToString(updateFieldInput)})
    }`
    return this.API({ query, name: 'updateField' })
  }

  async field_deleteField(deleteFieldInput: { _id: string }): Promise<any> {
    const query = `
    mutation {
        deleteField(deleteFieldInput: ${paramsToString(deleteFieldInput)})
    }`
    return this.API({ query, name: 'deleteField' })
  }
}

export const apiInstance = new FutBobServer()
