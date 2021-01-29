import { useEffect, useRef } from "react"
import { ZenMainHooks } from './main'

class ZenHooks extends ZenMainHooks {

   usePrevious = <T>(value: T): T => {
      const ref = useRef<T>(null)
      useEffect(() => {
         ref.current = value
      }, [value])
      return ref.current
   }

   useIsMounted = (): boolean => {
      const isMounted = useRef<boolean>(false)
      useEffect(() => {
         isMounted.current = true
         return () => {
            isMounted.current = false
         }
      }, [])
      return isMounted.current
   }

}

export const zenHooksInstance = new ZenHooks()