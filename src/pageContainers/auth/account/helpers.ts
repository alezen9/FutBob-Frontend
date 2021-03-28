import { FinalizeRegistrationInput, RegisterInput } from '@_SDK_Auth/inputs'
import { ServerMessage } from '@_utils/serverMessages'
import { FormikHelpers } from 'formik'
import { apiInstance } from 'src/SDK'
import { get } from 'lodash'
import * as yup from 'yup'
import dayjs from 'dayjs'
import { OptionType } from '@_components/FormikInput'

/** REQUEST */

export const onRequestAccount = ({ openSnackbar, setIsLoading, setEmailSent }) => async (
	values: RegisterInput & { country: OptionType },
	helpers: FormikHelpers<any>
) => {
	setIsLoading(true)
	helpers.setSubmitting(true)
	try {
      const body = {...values, country: values.country.value}
      const emailSent = await apiInstance.auth.requestRegistration(body)
      openSnackbar({
			variant: 'success',
			message: 'A verification email has been sent to you'
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

export const schemaRequestAccount = yup.object().shape({
	email: yup.string().email().required(),
   name: yup.string().required(),
	surname: yup.string().required(),
	dateOfBirth: yup.string().test(
      'is-valid-date',
      'Invalid date',
      (val: string) => dayjs(val).isValid()
   ).required(),
	sex: yup.number().required(),
	country: yup.mixed().required(),
	phone: yup.string().required()
})





/** FINALIZE */

export const onFinalizeAccount = ({ openSnackbar, setIsLoading, goToHome, setIsLogged }) => async (
	values: FinalizeRegistrationInput,
	helpers: FormikHelpers<any>
) => {
	setIsLoading(true)
	helpers.setSubmitting(true)
	try {
      const { token } = await apiInstance.auth.finalizeRegistration(values)
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

export const schemaFinalizeAccount = yup.object().shape({
	unverifiedCode: yup.string().required(),
   password: yup.string().required(),
	confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match')
})

/** RESEND */

export const onResendCode = ({ openSnackbar, setIsLoading, setEmailSent, code }) => async () => {
	setIsLoading(true)
	try {
      await apiInstance.auth.requestRegistrationEmailResend(code)
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