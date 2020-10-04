import * as yup from 'yup'

export const createEditPlayerValidationSchema = yup.object().shape({
  user: yup.object().shape({
    name: yup.string().required('Required!'),
    surname: yup.string().required('Required!'),
    dateOfBirth: yup.string().required('Required!'),
    sex: yup.string().required('Required!'),
    phone: yup.string().min(13, 'Phone number not valid!').required('Required!'),
    email: yup.string().email().nullable(),
    country: yup.string().required('Required')
  }).required('Required!')
})
