import * as yup from 'yup'

export const createEditFieldValidationSchema = yup.object().shape({
  name: yup.string().required('Required!'),
  type: yup.number().required('Required!'),
  state: yup.number().required('Required!'),
  cost: yup.number().required('Required!'),
  measurements: yup.object().shape({
    width: yup.number().required('Required!'),
    height: yup.number().required('Required!')
  }).required('Required!'),
  location: yup.object().shape({
    type: yup.string().required('Required!'),
    coordinates: yup.array(yup.number().nullable()).required('Required!')
  }).required('Required!')
})
