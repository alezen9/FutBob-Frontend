// import React, { useEffect, useCallback, useState } from 'react'
// import PropTypes from 'prop-types'
// import { Fab, CircularProgress, makeStyles } from '@material-ui/core'
// import CheckIcon from '@material-ui/icons/Check'
// import SaveIcon from '@material-ui/icons/Save'
// import ErrorIcon from '@material-ui/icons/Error'
// import { get, isEmpty, find, isEqual } from 'lodash'
// import HourglassFullIcon from '@material-ui/icons/HourglassFull'
// import cleanDeep from 'clean-deep'
// import { usePrevious } from '@_utils/customHooks'

// const useStyles = makeStyles({
//   fabClass: ({ error, validationError = false }) => {
//     return {
//       backgroundColor: validationError
//         ? '#FFCC00'
//         : error
//           ? 'crimson'
//           : '#005959',
//       '&:hover': {
//         backgroundColor: validationError
//           ? '#FFE066'
//           : error
//             ? 'red'
//             : '#005959'
//       }
//     }
//   },
//   loading: {
//     position: 'absolute',
//     left: 0
//   },
//   '@keyframes rotateLoop': {
//     from: {
//       transform: 'rotateZ(0)'
//     },
//     to: {
//       transform: 'rotateZ(360deg)'
//     }
//   },
//   rotationClass: {
//     animation: `$rotateLoop 1.5s infinite`
//   }
// })

// export const REQUEST_KEY = 'GENERIC_FORM'

// const GlobalSave = props => {
//   const {
//     keys = [REQUEST_KEY],
//     onSubmit = null,
//     disabled = null,
//     onComplete = null,
//     validationError = null,
//     formik = {}
//   } = props
//   const prevFormikValues = usePrevious(get(formik, 'values', {}))
//   const [isFirstRun, setIsFirstRun] = useState(true)
//   const [_validationError, setValidationError] = useState(false)
//   const [_disabled, setIsDisabled] = useState(false)
//   const [_error, setError] = useState(false)

//   const { loading, fabClass, rotationClass } = useStyles({ error: false, validationError: validationError === null ? _validationError : validationError })

//   const onCompleteImmutable = useCallback(
//     () => {
//       if (onComplete) onComplete()
//     }, [onComplete])

//   useEffect(() => {
//     if (!isEqual(cleanDeep(prevFormikValues), cleanDeep(get(formik, 'values', null)))) {
//       setValidationError(false)
//       setError(false)
//     }
//   }, [get(formik, 'values', {}), prevFormikValues])

//   useEffect(() => {
//     if (disabled === null) {
//       const hasTyped = !isEmpty(get(formik, 'touched', {}))
//       setIsDisabled(!hasTyped)
//       setValidationError(!isEmpty(cleanDeep(get(formik, 'errors', {}))))
//     }
//   }, [get(formik, 'touched', {}), disabled, get(formik, 'errors', {})])

//   useEffect(() => {
//     if (!appIsFetching && isFirstRun) setIsFirstRun(false)
//   }, [appIsFetching, isFirstRun])

//   useEffect(() => {
//     keys.forEach(key => {
//       dispatch(requestResetByKey(key))
//     })
//     return () => {
//       keys.forEach(key => {
//         dispatch(requestResetByKey(key))
//       })
//     }
//   }, [dispatch, requestResetByKey])

//   useEffect(() => {
//     if (allSuccess && !prevAllSuccess) {
//       setTimeout(() => {
//         keys.forEach(key => {
//           dispatch(requestResetByKey(key))
//         })
//         if (onCompleteImmutable) onCompleteImmutable()
//       }, 1000)
//     }
//   }, [allSuccess, prevAllSuccess, onCompleteImmutable, dispatch, requestResetByKey, keys])

//   return (
//     <div>
//       <Fab
//         className={fabClass}
//         onClick={_validationError ? null : formik && !isEmpty(formik) ? formik.handleSubmit : onSubmit || null}
//         color='secondary'
//         disabled={isLoading || disabled === null ? _disabled : disabled}
//       >
//         {isFirstRun
//           ? <SaveIcon />
//           : isLoading
//             ? <HourglassFullIcon className={rotationClass} />
//             : _error
//               ? <ErrorIcon />
//               : false
//                 ? <CheckIcon />
//                 : <SaveIcon />}
//       </Fab>
//       {isLoading && <CircularProgress size={56} className={loading} />}
//     </div>
//   )
// }

// GlobalSave.propTypes = {
//   keys: PropTypes.arrayOf(PropTypes.string),
//   disabled: PropTypes.bool,
//   onComplete: PropTypes.func,
//   formik: (props, _, __) => !props.formik && !props.onSubmit
//     ? new Error('Provide "formik" or "onSubmit" for a manual submit handler')
//     : null,
//   onSubmit: (props, _, __) => !props.formik && !props.onSubmit
//     ? new Error('Provide "_handleSubmit" or "formik" for auto submit handle')
//     : null
// }

// export default React.memo(GlobalSave)
import React from 'react'

const SaveTMP = () => <></>

export default SaveTMP
