import dayjs from 'dayjs'
import * as yup from 'yup'
import { OptionType } from "@_components/FormikInput";
import { CreatePlayerInput } from "@_SDK_Player/inputs";
import { CreateUserInput } from "@_SDK_User/inputs";
import { routesPaths } from "@_utils/routes";
import { ZenRouteID } from "@_utils/routes/types";
import { ServerMessage } from "@_utils/serverMessages";
import { FormikHelpers } from "formik";
import { get } from "lodash";
import { apiInstance } from "src/SDK";

export const createPlayer = ({ setIsLoading, openSnackbar, router }) => async (
	values: { user: CreateUserInput & { country: OptionType }, player: Omit<CreatePlayerInput, 'user'> },
	helpers: FormikHelpers<any>
) => {
   setIsLoading(true)
	helpers.setSubmitting(true)
   try {
      const { user, player } = values
      const userID = await apiInstance.user.create({ ...user, country: user.country.value })
      if(!userID) throw new Error()
      const playerID = await apiInstance.player.create({ ...player, user: userID })
      if(!playerID) throw new Error()
      openSnackbar({
			variant: 'success',
			message: 'Player created successfully'
		})
      await router.push(routesPaths[ZenRouteID.PLAYER_DETAIL].path, routesPaths[ZenRouteID.PLAYER_DETAIL].as({ _id: playerID }))
   } catch (error) {
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