import { FinalizeRegistrationInput, RegisterInput } from '@_SDK_Auth/inputs'
import { ServerMessage } from '@_utils/serverMessages'
import { FormikHelpers } from 'formik'
import { apiInstance } from 'src/SDK'
import { get } from 'lodash'
import * as yup from 'yup'

/** REQUEST */

export const onForgotPassword = ({ openSnackbar, setIsLoading, setEmailSent }) => async (
	values: { email: string },
	helpers: FormikHelpers<any>
) => {
	setIsLoading(true)
	helpers.setSubmitting(true)
	try {
      const emailSent = await apiInstance.auth.requestResetPassword(values.email)
      openSnackbar({
			variant: 'success',
			message: 'An email to reset your password has been sent to you'
		})
      setEmailSent(emailSent)
	} catch (error) {
      console.log(error)
		openSnackbar({
			variant: 'error',
			message: get(ServerMessage, error, ServerMessage.generic)
		})
	}
	setIsLoading(false)
	helpers.setSubmitting(false)
}

export const schemaRequestReset = yup.object().shape({
	email: yup.string().email().required()
})





/** FINALIZE */

export const onResetPassword = ({ openSnackbar, setIsLoading, goToHome, setIsLogged }) => async (
	values: FinalizeRegistrationInput,
	helpers: FormikHelpers<any>
) => {
	setIsLoading(true)
	helpers.setSubmitting(true)
	try {
      const { token } = await apiInstance.auth.finalizeResetPassword(values)
      if(token){
         apiInstance.auth.setToken(token)
         setIsLogged(true)
         goToHome()
      }
	} catch (error) {
      console.log(error)
		openSnackbar({
			variant: 'error',
			message: get(ServerMessage, error, ServerMessage.generic)
		})
	}
	setIsLoading(false)
	helpers.setSubmitting(false)
}

export const schemaResetPassword = yup.object().shape({
	unverifiedCode: yup.string().required(),
   password: yup.string().required(),
	confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match')
})

/** RESEND */

export const onResendCode = ({ openSnackbar, setIsLoading, setEmailSent, code }) => async () => {
	setIsLoading(true)
	try {
      await apiInstance.auth.requestResetPasswordEmailResend(code)
      setEmailSent(true)
	} catch (error) {
      console.log(error)
		openSnackbar({
			variant: 'error',
			message: get(ServerMessage, error, ServerMessage.generic)
		})
	}
	setIsLoading(false)
}