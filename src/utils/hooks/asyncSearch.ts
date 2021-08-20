import { OptionType } from "@_components/FormikInput"
import { useCallback, useEffect, useRef, useState } from "react"
import axios, { CancelTokenSource } from 'axios'
import { apiInstance } from "src/SDK"
import { flatten, get } from "lodash"
import { Field } from "@_SDK_Field/types"
import { AppointmentPlayerType } from "src/SDK/Modules/Appointment/types"
import { Player } from "@_SDK_Player/types"
import { FreeAgent } from "@_SDK_FreeAgent/types"

export class AsyncSearchHooks {

   useFieldsAsyncSearch = () => {
      const requestSource = useRef<CancelTokenSource>(null)
      const [mounted, setIsMounted] = useState(true)

      useEffect(() => {
         setIsMounted(true)
         return () => {
         setIsMounted(false)
         }
      }, [])

      const searchFieldsOnType = useCallback(
         async (value?: string): Promise<OptionType[]> => {
         if (requestSource.current) requestSource.current.cancel('User input changed.')
         const CancelToken = axios.CancelToken
         const source = CancelToken.source()
         if (mounted) requestSource.current = source
         const cancelToken = source.token
         return apiInstance.field.getList({ searchText: value }, { skip: 0, limit: 100 }, '{ result { _id, type, name } }', { cancelToken })
            .then(res => {
               const opts: OptionType[] = (get(res, 'result', []) as Field[]).map(field => ({
                  label: field.name,
                  value: field._id,
                  type: field.type
               }))
               return opts
            })
         }, [])

      return { searchFieldsOnType }
   }

    usePlayersAsyncSearch = () => {
      const requestSource = useRef<CancelTokenSource>(null)
      const [mounted, setIsMounted] = useState(true)

      useEffect(() => {
         setIsMounted(true)
         return () => {
         setIsMounted(false)
         }
      }, [])

      const searchPlayersAndFreeAgentOnType = useCallback(
         async (value?: string): Promise<OptionType[]> => {
         if (requestSource.current) requestSource.current.cancel('User input changed.')
         const CancelToken = axios.CancelToken
         const source = CancelToken.source()
         if (mounted) requestSource.current = source
         const cancelToken = source.token
         const promises: Promise<OptionType[]>[] = [
            apiInstance.player.getList({ searchText: value }, { skip: 0, limit: 100 }, {}, `{
               result {
                  _id,
                  user {
                     registry {
                        surname,
                        name
                     }
                  }
               }
            }`, { cancelToken })
               .then(res => {
                  return (get(res, 'result', []) as Player[]).map(player => ({
                     label: `[Registered] ${player.user.registry.surname} ${player.user.registry.name}`,
                     value: player._id,
                     type: AppointmentPlayerType.Registered
                  }))
               }),
            apiInstance.freeAgent.getList({ searchText: value }, { skip: 0, limit: 100 }, `{
               result {
                  _id,
                  name,
                  surname
               }
            }`, { cancelToken })
               .then(res => {
                  return (get(res, 'result', []) as FreeAgent[]).map(freeAgent => ({
                     label: `[Free agent] ${freeAgent.surname} ${freeAgent.name}`,
                     value: freeAgent._id,
                     type: AppointmentPlayerType.FreeAgent
                  }))
               })
         ]
         return Promise.all(promises).then(flatten)
      }, [])

      return { searchPlayersAndFreeAgentOnType }
   }
}