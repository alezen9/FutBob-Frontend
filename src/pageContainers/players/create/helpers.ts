import dayjs from 'dayjs'
import * as yup from 'yup'
import { OptionType } from "@_components/FormikInput";
import { CreatePlayerInput } from "@_SDK_Player/inputs";
import { CreateUserInput } from "@_SDK_User/inputs";
import { ServerMessage } from "@_utils/serverMessages";
import { FormikHelpers } from "formik";
import { get } from "lodash";
import { apiInstance } from "src/SDK";

export const createPlayer = ({ setIsLoading, openSnackbar, setPlayerID }) => async (
	values: { user: CreateUserInput & { country: OptionType }, player: Omit<CreatePlayerInput, 'user'> },
	helpers: FormikHelpers<any>
) => {
   setIsLoading(true)
	helpers.setSubmitting(true)
   let userID: string, playerID: string
   try {
      const { user, player } = values
      userID = await apiInstance.user.create({ ...user, country: user.country.value })
      if(!userID) throw new Error()
      playerID = await apiInstance.player.create({ ...player, user: userID })
      if(!playerID) throw new Error()
      setPlayerID(playerID)
   } catch (error) {
      try {
         if(playerID) await apiInstance.player.delete(playerID)
         if(userID) await apiInstance.user.delete(userID)
      } catch (error) {
         console.error('something went wrong dammit...')
      }
      openSnackbar({
			variant: 'error',
			message: get(ServerMessage, error, ServerMessage.generic)
		})
   }
	helpers.setSubmitting(false)
   setIsLoading(false)
}

const userSchema = yup.object().shape({
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