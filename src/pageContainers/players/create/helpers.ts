import dayjs from 'dayjs'
import * as yup from 'yup'

const userSchema = yup.object().shape({
   name: yup.string().required(),
	surname: yup.string().required(),
	dateOfBirth: yup.string().required().test(
      'is-valid-date',
      'Invalid date',
      (val: string) => dayjs(val).isValid()
   ),
	sex: yup.number().required(),
	country: yup.string().required(),
	phone: yup.string().required(),
   additionalInfo: yup.object().shape({
      email: yup.string().email(),
   })
})

const playerSchema = yup.object().shape({
   state: yup.number().required(),
   score: yup.object().shape({}).required(),
	positions: yup.array().of(yup.number().required()).min(1).required()
})

export const schema = yup.object().shape({
   user: userSchema,
   player: playerSchema
})