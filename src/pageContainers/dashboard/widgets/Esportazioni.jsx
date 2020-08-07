import React from 'react'
import DashboardWidget from '../../../components/DashboardWidget'
import { Grid, Typography, makeStyles, Tooltip, IconButton } from '@material-ui/core'
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded'
import BuildRoundedIcon from '@material-ui/icons/BuildRounded'
import FaceRoundedIcon from '@material-ui/icons/FaceRounded'
import { isEmpty } from 'lodash'
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded'
import moment from 'moment'

const iconMap = {
  Persone: <PeopleAltRoundedIcon />,
  Fornitori: <BuildRoundedIcon />,
  Amministratori: <FaceRoundedIcon />
}

const useStyles = makeStyles(theme => ({
  sectionData: {
    margin: '2em 0',
    '& *': {
      color: '#fafafa'
    },
    '& p': {
      display: 'flex',
      alignItems: 'flex-start'
    },
    '& h6': {
      display: 'flex',
      alignItems: 'flex-start'
    }
  },
  date: {
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}))

const getSectionData = props => {
  const [title, values] = props
  const classes = useStyles()
  return <Grid key={`section-${title}`} item container xs={12} className={classes.sectionData}>
    <Grid item xs={12}>
      <Typography
        variant='h6'>
        {React.cloneElement(iconMap[title], { style: { marginRight: '.5em' } })}
        {title}
      </Typography>
      {values.map((val, i) => {
        const { date, extension, fileName, url } = val
        return (
          <Grid key={`${title}-${i}`} item container xs={12} alignItems='center'>
            <Grid item style={{ display: 'flex', alignItems: 'center' }}>
              <a
                style={{ all: 'unset' }}
                href={url}
                download={`${fileName}.${extension}`}>
                <Tooltip title='Scarica'>
                  <IconButton>
                    <GetAppRoundedIcon />
                  </IconButton>
                </Tooltip>
              </a>
              <Typography variant='body2'>{fileName}</Typography>
            </Grid>
            <Grid item className={classes.date}>
              <Typography variant='caption'>{moment(date).format('DD MMM YYYY HH:mm')}</Typography>
            </Grid>
          </Grid>
        )
      })}
    </Grid>
  </Grid>
}

const RenderExports = React.memo(props => {
  const { exports = {} } = props
  return <>
    <Typography variant='caption' style={{ color: '#fafafa', width: '100%' }}>
    *Lo storico delle esportazioni verrà perso alla chiusura della scheda corrente, del browser o al reload della pagina
    </Typography>
    {Object.entries(exports).map(getSectionData)}
  </>
})

const EsportazioniContent = React.memo(props => {
  const { exports = {} } = {}
  return (
    <Grid container style={{ minHeight: 100 }}>
      {isEmpty(exports)
        ? <>
          <Typography style={{ color: '#fafafa', marginTop: '1em' }}>Qui troverai le tue ultime esportazioni</Typography>
          <Typography variant='caption' style={{ color: '#fafafa', width: '100%', fontSize: '10pt' }}>
          *Lo storico delle esportazioni verrà perso alla chiusura della scheda corrente, del browser o al reload della pagina
          </Typography>
          </>
        : <RenderExports exports={exports} />}
    </Grid>
  )
})

const Esportazioni = props => {
  return (
    <DashboardWidget
      {...props}
      content={<EsportazioniContent />}
    />
  )
}

export default React.memo(Esportazioni)
