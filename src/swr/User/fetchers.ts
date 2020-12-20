import { User } from '@_SDK_User/entities'
import { apiInstance } from 'src/SDK'
import { user_allFields } from 'src/SDK/Modules/User/gql_all'

const swrUserFetchers = Object.freeze({
  profileFetcher: (key: string): Promise<User> => apiInstance.user.getMe(user_allFields)
})

export default swrUserFetchers
