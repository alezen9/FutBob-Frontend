import { User } from '@_entities/User'
import { apiInstance } from 'src/SDK'
import { allUserFields } from 'src/SDK/allFields'

const swrUserFetchers = Object.freeze({
  profileFetcher: (key: string): Promise<User> => apiInstance.user_getUserConnected(allUserFields)
})

export default swrUserFetchers
