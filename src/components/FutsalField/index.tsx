import React, { useCallback, useMemo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Players from './Players'
import { get } from 'lodash'
import { Switch } from '@material-ui/core'

const useStyles = makeStyles(theme => {
  const indoorLineColor = 'rgb(0, 0, 138, 1)'
  const outDoorLineColor = '#fafafa'

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
      backgroundImage: ({ indoor = false }) => `url("${indoor ? '/assets/parquet.jpg' : '/assets/grass.jpg'}")`,
      backgroundRepeat: 'repeat',
      backgroundSize: 75,
      backgroundPosition: -20,
      transform: 'rotateX(30deg)',
      transformStyle: 'preserve-3d',
      boxShadow: `-0 15px 20px ${theme.type === 'dark' ? 'none' : 'rgba(0, 0, 0, 0.5)'}`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: ({ indoor = false }) => `2px solid ${indoor ? indoorLineColor : outDoorLineColor}`,
      overflow: 'hidden',
      transition: 'background-image .5s ease',
      '&:before': {
        position: 'absolute',
        top: -10,
        left: '50%',
        height: 100,
        width: '70%',
        content: '""',
        transform: 'translateX(-50%)',
        border: ({ indoor = false }) => `3px solid ${indoor ? indoorLineColor : outDoorLineColor}`,
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
        border: ({ indoor = false }) => `2px solid ${indoor ? indoorLineColor : outDoorLineColor}`,
        borderBottom: 'none',
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100
      }
    },
    lines1: {
      position: 'relative',
      width: '100%',
      height: 2,
      backgroundColor: ({ indoor = false }) => indoor ? indoorLineColor : outDoorLineColor,
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
        backgroundColor: ({ indoor = false }) => indoor ? indoorLineColor : outDoorLineColor
      }
    },
    lines2: {
      position: 'absolute',
      width: '30%',
      height: '20%',
      borderRadius: '50%',
      transform: 'translateY(20px)',
      border: ({ indoor = false }) => `2px solid ${indoor ? indoorLineColor : outDoorLineColor}`,
      '&:before': {
        position: 'absolute',
        top: -54,
        left: '50%',
        height: 6,
        width: 10,
        borderRadius: '50%',
        content: '""',
        transform: 'translateX(-50%)',
        backgroundColor: ({ indoor = false }) => indoor ? indoorLineColor : outDoorLineColor,
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
        backgroundColor: ({ indoor = false }) => indoor ? indoorLineColor : outDoorLineColor,
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

const FutsalField = props => {
  const { positions = [], onPositionClick, name, values, setFieldValue, setFieldTouched, type = 'outdoor' } = props
  const [outDoor, setOutDoor] = useState(true)
  const { wrapper, typeSwitch, fieldWrapper, field, lines1, lines2, trackClass } = useStyles({ indoor: !outDoor })

  const vals = useMemo(() => get(values, name, positions) || [], [name, positions, values])

  const setVal = useCallback(
    val => {
      if (setFieldValue && setFieldTouched && name) {
        setFieldTouched(name, true, false)
        setFieldValue(name, val, false)
      }
    }, [setFieldValue, setFieldTouched, name, onPositionClick])

  const onPositionClickFormik = useCallback(
    pos => {
      const newVals = vals.filter(el => el !== pos)
      if (newVals.length === vals.length) newVals.push(pos)
      setVal(newVals)
    }, [vals, setVal])

  return (
    <div className={wrapper}>
      <div className={fieldWrapper}>
        <div className={field}>
          <div className={lines1} />
          <div className={lines2} />
          <Players name={name} values={vals} onClick={onPositionClickFormik || onPositionClick} />
        </div>
        <div className={typeSwitch}>
          <Switch classes={{ track: trackClass }} color='primary' checked={outDoor} onChange={() => setOutDoor(state => !state)} />
        </div>
      </div>
    </div>
  )
}

export default React.memo(FutsalField)
