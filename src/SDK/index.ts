import { LSToken } from '@_utils/LSVariables'
import axios, { AxiosInstance } from 'axios'
import { get } from 'lodash'
// start modules
import AuthServer from './Modules/Auth'
import FieldServer from './Modules/Field'
import PlayerServer from './Modules/Player'
import UserServer from './Modules/User'
// end modules
import getConfig from 'next/config'
import { zenAxiosInstance } from './helpers/ZenAxios'
const { publicRuntimeConfig } = getConfig()



export class ZenServer {
  _LSToken: string
  _self: AxiosInstance
  authHeader: string|undefined
  /** start modules */
  auth: AuthServer
  user: UserServer
  player: PlayerServer
  field: FieldServer
  /** end modules */
  constructor () {
   this._LSToken = LSToken
   this.authHeader = process.browser
   ? window.localStorage.getItem(this._LSToken) 
   : undefined
   // axios
   this._self = zenAxiosInstance.create(this)
   // modules
   this.auth = new AuthServer(this)
   this.user = new UserServer(this)
   this.player = new PlayerServer(this)
   this.field = new FieldServer(this)
  }

  async API ({ query, name, params, fields }: { query: string, name: string, params?: any, fields?: object }) {
    return this._self.post('/graphql', { query })
      .then((res: any) => {
        const { data, errors } = res
        if (errors && errors.length) {
          this.LogRequest({
            name,
            params,
            fields,
            response: errors,
            isError: true
          })
          throw errors[0].message
        } else {
          this.LogRequest({
            name,
            params,
            fields,
            response: data[name]
          })
          return data[name]
        }
      })
  }

  private LogRequest = ({name, response, params, fields, isError = false}) => {
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
}

export const apiInstance = new ZenServer()
