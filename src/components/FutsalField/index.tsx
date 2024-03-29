import React, { useCallback, useMemo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Players from './Players'
import { get } from 'lodash'
import { Switch, Typography } from '@material-ui/core'
import { FormikEssentials } from '@_components/FormikInput'

const useStyles = makeStyles(theme => {
   const indoorLineColor: string = 'rgb(0, 0, 138, 1)'
   const outDoorLineColor: string = '#fafafa'

   return {
      typeSwitch: {
         transform: 'translateY(50px)',
         textAlign: 'center'
      },
      wrapper: {
         position: 'relative',
         width: '100%',
         height: 400,
         [theme.breakpoints.down('xs')]: {
            height: 370
         }
      },
      fieldWrapper: {
         position: 'absolute',
         top: 0,
         left: '50%',
         transform: 'translateX(-50%)',
         width: 350,
         height: 300,
         perspective: 250,
         [theme.breakpoints.down('xs')]: {
            width: 250,
            height: 270
         }
      },
      field: {
         position: 'relative',
         width: '100%',
         height: '100%',
         borderRadius: 7,
         backgroundImage: (props: any) => `url("${props.indoor ? '/assets/parquet.jpg' : '/assets/grass.jpg'}")`,
         backgroundRepeat: 'repeat',
         backgroundSize: 75,
         backgroundPosition: -20,
         transform: 'rotateX(30deg)',
         transformStyle: 'preserve-3d',
         boxShadow: `-0 15px 20px ${theme.type === 'dark' ? 'rgba(0,0,0,.8)' : 'rgba(0, 0, 0, 0.3)'}`,
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         border: (props: any) => `2px solid ${props.indoor ? indoorLineColor : outDoorLineColor}`,
         overflow: 'hidden',
         // transition: 'background-image .5s ease',
         '&:before': {
            position: 'absolute',
            top: -10,
            left: '50%',
            height: 100,
            width: '70%',
            content: '""',
            transform: 'translateX(-50%)',
            border: (props: any) => `3px solid ${props.indoor ? indoorLineColor : outDoorLineColor}`,
            borderTop: 'none',
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100
         },
         '&:after': {
            position: 'absolute',
            bottom: -35,
            left: '50%',
            height: 100,
            width: '70%',
            content: '""',
            transform: 'translateX(-50%)',
            border: (props: any) => `2px solid ${props.indoor ? indoorLineColor : outDoorLineColor}`,
            borderBottom: 'none',
            borderTopLeftRadius: 100,
            borderTopRightRadius: 100
         }
      },
      lines1: {
         position: 'relative',
         width: '100%',
         height: 2,
         backgroundColor: (props: any) => props.indoor ? indoorLineColor : outDoorLineColor,
         transform: 'translateY(20px)',
         '&:after': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            height: 5,
            width: 10,
            borderRadius: '50%',
            content: '""',
            transform: 'translate(-50%, -50%)',
            backgroundColor: (props: any) => props.indoor ? indoorLineColor : outDoorLineColor
         }
      },
      lines2: {
         position: 'absolute',
         width: '30%',
         height: '20%',
         borderRadius: '50%',
         transform: 'translateY(20px)',
         border: (props: any) => `2px solid ${props.indoor ? indoorLineColor : outDoorLineColor}`,
         '&:before': {
            position: 'absolute',
            top: -54,
            left: '50%',
            height: 6,
            width: 10,
            borderRadius: '50%',
            content: '""',
            transform: 'translateX(-50%)',
            backgroundColor: (props: any) => props.indoor ? indoorLineColor : outDoorLineColor,
            [theme.breakpoints.down('xs')]: {
               top: '-88%'
            }
         },
         '&:after': {
            position: 'absolute',
            top: 90,
            left: '50%',
            height: 5,
            width: 10,
            borderRadius: '50%',
            content: '""',
            transform: 'translateX(-50%)',
            backgroundColor: (props: any) => props.indoor ? indoorLineColor : outDoorLineColor,
            [theme.breakpoints.down('xs')]: {
               top: 71
            }
         }
      },
      trackClass: {
         ...theme.type === 'dark' && {
            backgroundColor: 'rgba(255,255,255,.5)'
         }
      }
   }
})

type Props = Partial<FormikEssentials> & {
   withPlayers?: boolean
   positions?: number[]
   onPositionClick?: () => any
   onTypeChange?: (newType: string) => void
   name?: string
   type?: 'indoor' | 'outdoor'
   hideSwitch?: boolean
}

const FutsalField: React.FC<Props> = props => {
   const { withPlayers = true, positions = [], onPositionClick, onTypeChange, name, values, errors, setFieldValue, setFieldTouched, type = 'outdoor', hideSwitch = false } = props
   const [outDoor, setOutDoor] = useState(type === 'outdoor')
   const { wrapper, typeSwitch, fieldWrapper, field, lines1, lines2, trackClass } = useStyles({ indoor: !outDoor })

   const vals: number[] = useMemo(() => get(values, name, positions) || [], [name, positions, values])

   const setVal = useCallback(
      val => {
         if (setFieldValue && setFieldTouched && name) {
            setFieldValue(name, val, false)
               // @ts-ignore
               .then(() => { setFieldTouched(name, true) })
         }
      }, [setFieldValue, setFieldTouched, name])

   const onPositionClickFormik = useCallback(
      (pos: number) => {
         const newVals = vals.filter((el: number) => el !== pos)
         if (newVals.length === vals.length) newVals.push(pos)
         setVal(newVals)
      }, [vals, setVal])

   const toggleField = useCallback(() => {
      let newType = 'outdoor'
      setOutDoor(state => {
         newType = state
            ? 'indoor'
            : 'outdoor'
         return !state
      })
      if (onTypeChange) onTypeChange(newType)
   }, [onTypeChange])

   return (
      <>
         <div className={wrapper}>
            <div className={fieldWrapper}>
               <div className={field}>
                  <div className={lines1} />
                  <div className={lines2} />
                  {withPlayers && <Players values={vals} onClick={onPositionClickFormik || onPositionClick} />}
               </div>
               {!hideSwitch && <div className={typeSwitch}>
                  <Switch classes={{ track: trackClass }} color='primary' checked={outDoor} onChange={toggleField} />
               </div>}
            </div>
         </div>
         {get(errors, name, null) && <Typography variant='body2' color='error' style={{ fontSize: '.85em' }} align='center'>Select at least one option</Typography>}
      </>
   )
}

export default React.memo(FutsalField)
