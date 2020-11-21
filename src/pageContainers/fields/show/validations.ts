import * as yup from 'yup'

export const createEditFieldValidationSchema = yup.object().shape({
  name: yup.string().required(),
  type: yup.number().required(),
  state: yup.number().required(),
  price: yup.number().required(),
  measurements: yup.object().shape({
    width: yup.number().required(),
    height: yup.number().required()
  }).required(),
  location: yup.object().shape({
    type: yup.string().required(),
    coordinates: yup.array().of(yup.number().nullable().strict().required())
  }).required()
})
