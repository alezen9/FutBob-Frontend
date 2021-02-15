import { UpdateFieldInput } from '@_SDK_Field/inputs'
import { zenToolboxInstance } from '@_utils/Toolbox'
import { FormikHelpers } from 'formik'
import { get } from 'lodash'
import * as yup from 'yup'

export const onSubmit = ({ setIsLoading, createField, updateField, replaceRouteWithID }) => async (
	values: Partial<UpdateFieldInput>,
	helpers: FormikHelpers<any>
) => {
   setIsLoading(true)
	helpers.setSubmitting(true)
   const { _id, price, location, ...rest } = values
   const minBody = {
      ...rest,
      price: zenToolboxInstance.eurosToCents(price),
      location: {
         type: 'Point',
         coordinates: [get(location, 'coordinates.lat', null), get(location, 'coordinates.long', null)]
      }
   }
   if(_id) {
      await updateField({ ...minBody, _id })
   } else {
      const ID = await createField(minBody)
      replaceRouteWithID(ID)
   }
	helpers.setSubmitting(false)
   setIsLoading(false)
}

export const schema = yup.object().shape({
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
    coordinates: yup.object().shape({
      lat: yup.number().nullable().required(),
      long: yup.number().nullable().required()
    })
  }).required()
})
