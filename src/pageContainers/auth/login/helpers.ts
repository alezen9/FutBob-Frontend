import { LoginInput } from '@_SDK_Auth/inputs'
import { ServerMessage } from '@_utils/serverMessages'
import { FormikHelpers } from 'formik'
import { apiInstance } from 'src/SDK'
import { get } from 'lodash'
import * as yup from 'yup'

export const onLogin = ({ openSnackbar, setIsLoading, setIsLogged, goToHome }) => async (
	values: LoginInput,
	helpers: FormikHelpers<any>
) => {
	setIsLoading(true)
	helpers.setSubmitting(true)
	try {
		const { token } = await apiInstance.auth.login(values)
		if (token) {
			apiInstance.auth.setToken(token)
			setIsLogged(true)
			goToHome()
		}
	} catch (error) {
		openSnackbar({
			variant: 'error',
			message: get(ServerMessage, error, 'Wrong email or password!')
		})
	}
	setIsLoading(false)
	helpers.setSubmitting(false)
}

export const schema = yup.object().shape({
	email: yup.string().required(),
	password: yup.string().required()
})
