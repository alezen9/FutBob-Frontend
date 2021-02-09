import { FormikHelpers } from 'formik'
import * as yup from 'yup'
import { ChangePasswordInput } from '@_SDK_User/inputs'

export const onUpdateMyPassword = ({ setIsLoading, updateMyPassword  }) => async (
	values: ChangePasswordInput & { confirmPassword: string },
	helpers: FormikHelpers<any>
) => {
	setIsLoading(true)
   helpers.setSubmitting(true)
   const { confirmPassword, ...body } = values
	const done = await updateMyPassword(body)
	setIsLoading(false)
	helpers.setSubmitting(false)
   if(done) helpers.resetForm()
}

export const schema = yup.object().shape({
   oldPassword: yup.string().required(),
	newPassword: yup.string().required(),
   confirmPassword: yup.string().required().oneOf([yup.ref('newPassword')], 'Passwords must match')
})