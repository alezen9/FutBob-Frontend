import { apiInstance } from 'src/SDK'
import { User } from '@_SDK_User/types'
import { allItem } from './gql'

const swrMeFetchers = Object.freeze({
	me: (key: string): Promise<User> => apiInstance.user.getMe(allItem)
})

export default swrMeFetchers
