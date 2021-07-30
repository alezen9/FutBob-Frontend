import { OptionType } from "@_components/FormikInput"
import { ZenPalette } from "@_MUITheme"
import cleanDeep from "clean-deep"
import { compact, isObject, map, isUndefined, keys, has, get, entries, isObjectLike, isEqual, reduce, uniqueId } from "lodash"
import { routes } from "./routes"

class ZenToolbox {
   #formatter: Intl.NumberFormat

   constructor() {
      this.#formatter = new Intl.NumberFormat('it-IT', {
         style: 'currency',
         currency: 'EUR',
         minimumFractionDigits: 2,
         maximumFractionDigits: 2
      })
   }

   capitalize = (s: string) => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase()

   asyncTimeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

   camelize = (str: string) => {
      if (!str) return ''
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
         if (+match === 0) return '' // or if (/\s+/.test(match)) for white spaces
         return index === 0 ? match.toLowerCase() : match.toUpperCase()
      })
   }

   /**
    * @description Takes an object as param and returns the same object in string format valid for gql queries
    */
   // paramsToString = params => {
   //    let str = ''
   //    for (const key in params) {
   //       if (isObject(params[key])) {
   //          if (params[key] instanceof Array)
   //             str += key + ':' + '[' + params[key].map(el => (isNaN(el) ? `"${el}"` : el)) + ']' + ', '
   //          else str += key + ':' + this.paramsToString(params[key]) + ', '
   //       } else if (isNaN(params[key])) str += key + ':"' + params[key] + '", '
   //       else str += key + ':' + params[key] + ', '
   //    }
   //    return `{${str.slice(0, -2)}}`
   // }

   paramsToString = obj => {
      // Make sure we don't alter integers.
      if (typeof obj === 'number') return obj
      // Stringify everything other than objects.
      if (typeof obj !== 'object' || Array.isArray(obj)) return JSON.stringify(obj).replace(/"(\w+)"\s*:/g, '$1:')
      // Iterate through object keys to convert into a string
      // to be interpolated into the query.
      const props = Object.keys(obj).map(key => `${key}:${this.paramsToString(obj[key])}`).join(',')
      return `{${props}}`

   }

   decamelize = (str: string, separator?: string) => {
      separator = typeof separator === 'undefined' ? ' ' : separator

      return this.capitalize(
         (str || '')
            .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
            .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
            .toLowerCase()
      )
   }

   getMultipleInitValue = (vals: OptionType[] = [], options: OptionType[] = []) => {
      return cleanDeep(
         options.reduce((acc, val) => {
            const { value, label } = val || {}
            if (vals.includes(value)) acc.push({ value, label })
            return acc
         }, [])
      )
   }

   getOptionsByEnum = (entity): OptionType[] => {
      return compact(map(entity, (el, i) => (!isNaN(el) ? { label: this.decamelize(i), value: parseInt(el) } : null)))
   }

   eurosToCents = (euros: number) => Math.trunc(euros * 100)

   centsToEuros = (cents: number) => {
      const formatted = this.#formatter.format(cents / 100)
      const res = formatted.replace(',', '.').replace('€', '').trim()
      return Number(res)
   }

   centsToEurosFormatted = (cents: number) => this.#formatter.format(cents / 100)

   /**
    * 
    * @description Given two objects it returns what changed from object 1 (older) to object 2 (newer)
    */
   v2_deepDiff = (fromObject: Object, toObject: Object) => {
      const changes = {}

      const buildPath = (path: string, obj: Object, key: string) => isUndefined(path) ? key : `${path}.${key}`

      const walk = (fromObject: Object, toObject: Object, path?: string) => {
         for (const key of keys(fromObject)) {
            const currentPath = buildPath(path, fromObject, key)
            if (!has(toObject, key)) {
               changes[currentPath] = get(toObject, key, null)
            }
         }

         for (const [key, to] of entries(toObject)) {
            const currentPath = buildPath(path, toObject, key)
            if (!has(fromObject, key)) {
               changes[currentPath] = to
            } else {
               const from = get(fromObject, key)
               if (!isEqual(from, to)) {
                  if (isObjectLike(to) && isObjectLike(from)) {
                     walk(from, to, currentPath)
                  } else {
                     changes[currentPath] = to
                  }
               }
            }
         }
      }

      walk(fromObject, toObject)

      return changes
   }

   /**
    * @description Similar to v2 but this one returns an object for the fields that has been changed { from: 'aleks', to: 'messi' }
    * @deprecated use v2_deepDiff instead
   */
   deepDiff = (fromObject: Object, toObject: Object) => {
      const changes = {}

      const buildPath = (path: string, obj: Object, key: string) => isUndefined(path) ? key : `${path}.${key}`

      const walk = (fromObject: Object, toObject: Object, path?: string) => {
         for (const key of keys(fromObject)) {
            const currentPath = buildPath(path, fromObject, key)
            if (!has(toObject, key)) {
               changes[currentPath] = { from: get(fromObject, key) }
            }
         }

         for (const [key, to] of entries(toObject)) {
            const currentPath = buildPath(path, toObject, key)
            if (!has(fromObject, key)) {
               changes[currentPath] = { to }
            } else {
               const from = get(fromObject, key)
               if (!isEqual(from, to)) {
                  if (isObjectLike(to) && isObjectLike(from)) {
                     walk(from, to, currentPath)
                  } else {
                     changes[currentPath] = { from, to }
                  }
               }
            }
         }
      }

      walk(fromObject, toObject)

      return changes
   }



   cleanPathname = (path: string = '') => path.split('?')[0]

   getTitleFromPathname = (pathname: string) => {
      const routeInfo: any = routes.find(({ path }) => this.cleanPathname(path) === pathname)
      if (!routeInfo) return 'Dashboard'
      return routeInfo.title
   }

   getLabelsByValues = ({ values = [], options = [], list = false, separator = ', ' }) => {
      const labels = options.reduce((acc, { value, label }) => {
         if (values.includes(value)) return [...acc, label]
         return acc
      }, [])
      return list ? labels.map(label => <div key={uniqueId()}>• {label}</div>) : labels.join(separator)
   }

   cleanQueryParams = query => {
      return reduce(
         query,
         (acc, value, key) => {
            if (/^\[+[a-zA-Z0-9]+\]/gim.test(value)) return acc
            return {
               ...acc,
               [key]: value
            }
         },
         {}
      )
   }

   getScoreColor = (value: number) => {
      if (value === 0) return ZenPalette.typographyGrey
      if (value < 50) return 'crimson'
      if (value < 70) return '#cd6532' // bronze
      if (value < 85) return '#037d5a' // green
      return 'gold'
   }

   getScoreColorFillGradient = (value: number) => {
      if (value < 40) return 'url(#red)'
      if (value < 65) return 'url(#orange)'
      if (value < 85) return 'url(#green)'
      if (value <= 100) return 'url(#gold)'
      return ZenPalette.typographyGrey
   }
}

const zenToolbox = new ZenToolbox()
export default zenToolbox