import { UpdatePlayerInput } from '@_SDK_Player/inputs'
import { FormikHelpers } from 'formik'
import * as yup from 'yup'

export const onUpdatePlayerSkills = ({ setIsLoading, updatePlayerSkills, isMe }) => async (
	values: UpdatePlayerInput,
	helpers: FormikHelpers<any>
) => {
   setIsLoading(true)
   helpers.setSubmitting(true)
   await updatePlayerSkills(values, isMe)
   helpers.setSubmitting(false)
   setIsLoading(false)
}

export const schema = yup.object().shape({
   state: yup.number().required(),
   score: yup.object().shape({}).required(),
	positions: yup.array().of(yup.number().required()).min(1).required()
})