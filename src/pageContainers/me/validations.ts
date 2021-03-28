import * as yup from 'yup'

export const generalInfoSchema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  dateOfBirth: yup.string().required(),
  sex: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().nullable(),
  country: yup.mixed().required()
})

export const privateInfoSchema = yup.object().shape({
  username: yup.string().required(),
  oldPassword: yup.string().when('newPassword', {
    is: val => !!val,
    then: yup.string().required()
  }),
  newPassword: yup.string().when('oldPassword', {
    is: val => !!val,
    then: yup.string().required()
  })
}, [['oldPassword', 'newPassword'], ['newPassword', 'oldPassword']])
