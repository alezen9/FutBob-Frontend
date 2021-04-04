import { FormikHelpers } from 'formik'
import * as yup from 'yup'
import { CreatePlayerInput } from '@_SDK_Player/inputs'

export const onSubmit = ({ setIsLoading, createMyPlayer, updateMyPlayer }) => async (
	values: Omit<CreatePlayerInput, 'user'> & { user?: string, _id?: string},
	helpers: FormikHelpers<any>
) => {
   setIsLoading(true)
   helpers.setSubmitting(true)
   const { user, _id, ...body } = values
   if(_id) await updateMyPlayer({ ...body, _id })
   else await createMyPlayer({ ...body, user })
   helpers.setSubmitting(false)
   setIsLoading(false)
}

export const schema = yup.object().shape({
   user: yup.string().required(),
   state: yup.number().required(),
   score: yup.object().shape({}).required(),
	positions: yup.array().of(yup.number().required()).min(1).required()
})