import { FormikHelpers } from 'formik'
import { get, isEmpty } from 'lodash'
import * as yup from 'yup'
import { UpdateRegistryInput } from '@_SDK_User/inputs'
import { OptionType } from '@_components/FormikInput'
import cleanDeep from 'clean-deep'
import dayjs from 'dayjs'
import { WithInitialValues } from '@_utils/types'
import zenToolbox from '@_utils/toolbox'

export const onUpdatePlayerRegistry = ({ isMe, setIsLoading, updatePlayerRegistry }) => async (
	values: WithInitialValues<UpdateRegistryInput & { country: OptionType }>,
	helpers: FormikHelpers<any>
) => {
	setIsLoading(true)
	helpers.setSubmitting(true)
   const body = cleanDeep({
      ...values,
      ...values.country && { country: get(values, 'country.value', 'IT') }
   })
   const { initialValues, ...rest } = body
   const diff = zenToolbox.v2_deepDiff(initialValues, rest) as UpdateRegistryInput
   let done = true

   if(!isEmpty(diff)) {
      done = await updatePlayerRegistry({ _id: body._id, ...diff }, isMe)
   }
	setIsLoading(false)
	helpers.setSubmitting(false)
   if(done) helpers.setTouched({}, false)
}

export const schema = yup.object().shape({
   name: yup.string().required(),
	surname: yup.string().required(),
	dateOfBirth: yup.string().required().test(
      'is-valid-date',
      'Invalid date',
      (val: string) => dayjs(val).isValid()
   ),
	sex: yup.number().required(),
	country: yup.mixed().required(),
	phone: yup.string().required(),
   additionalInfo: yup.object().shape({
      email: yup.string().email().nullable()
   }).nullable()
})