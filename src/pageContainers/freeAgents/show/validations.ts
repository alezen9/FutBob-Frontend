import * as yup from 'yup'

export const createEditFreeAgentValidationSchema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required()
})
