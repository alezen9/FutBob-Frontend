import * as yup from 'yup'

export const createEditPlayerValidationSchema = yup.object().shape({
  user: yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    dateOfBirth: yup.string().required(),
    sex: yup.string().required(),
    phone: yup.string().min(13, 'Phone number not valid!').required(),
    email: yup.string().email().nullable(),
    country: yup.string().required()
  }).required()
})
