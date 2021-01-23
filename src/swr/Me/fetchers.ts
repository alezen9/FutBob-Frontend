import { apiInstance } from 'src/SDK'
import { User } from '@_SDK_User/types'

const swrMeFetchers = Object.freeze({
	me: (key: string): Promise<User> => apiInstance.user.getMe('{ _id }') // TBS fields
})

export default swrMeFetchers
