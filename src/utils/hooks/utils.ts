import { chunk, get } from "lodash"
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from "react"

export class UtilsHooks {
   usePrevious = <T>(value: T): T => {
      const ref = useRef<T>(null)
      useEffect(() => {
         ref.current = value
      }, [value])
      return ref.current
   }

   useIsMounted = (): MutableRefObject<boolean> => {
      const isMounted = useRef<boolean>(false)
      useEffect(() => {
         isMounted.current = true
         return () => {
            isMounted.current = false
         }
      }, [])
      return isMounted
   }

   useScrollToTopOnMount = () => {
      useEffect(() => {
         window.scrollTo({top: 0, behavior: 'smooth'})
      }, [])
   }

   useFrontendPagination = (list: any = [], limit: number = 10) => {
      const [dataChuncks, setDataChunks] = useState([])
      const [data, setData] = useState([])
      const [currentPage, setCurrentPage] = useState(1)
      
      const totalCount = useMemo(() => list.length , [JSON.stringify(list)])

      useEffect(() => {
         const chunks = chunk(list, limit)
         setDataChunks(chunks)
         setData(get(chunks, '0', []))
      }, [JSON.stringify(list), limit])

      const onChangePage = useCallback(
         (e: any, newPage: number) => {
            setCurrentPage(newPage)
            const newData = get(dataChuncks, newPage - 1, [])
            setData(newData)
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }, [JSON.stringify(dataChuncks)])

      return {
         limit,
         totalCount,
         currentPage,
         currentChunk: data,
         onChangePage
      }
   }
}