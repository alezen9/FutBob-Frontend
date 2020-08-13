import * as yup from 'yup'

export const generalInfoSchema = yup.object().shape({
  name: yup.string().required('Required!'),
  surname: yup.string().required('Required!'),
  dateOfBirth: yup.string().required('Required!'),
  sex: yup.string().required('Required!'),
  phone: yup.string().required('Required!'),
  email: yup.string().email()
})

export const privateInfoSchema = yup.object().shape({
  username: yup.string().required('Required!'),
  oldPassword: yup.string().when('newPassword', {
    is: val => !!val,
    then: yup.string().required('Required!')
  }),
  newPassword: yup.string().when('oldPassword', {
    is: val => !!val,
    then: yup.string().required('Required!')
  })
}, [['oldPassword', 'newPassword'], ['newPassword', 'oldPassword']])
