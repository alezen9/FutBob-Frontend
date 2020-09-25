import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeType } from './palette'

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    type: ThemeType
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    type: ThemeType
  }
}

const subtitleGrey = '#686868'
const lightGrey = '#c1c1c1'
const pinkLight = 'rgb(255,45,85)'
const azureLight = 'rgb(0,122,255)'
const azureDark = 'rgb(10,132,255)'
const darkGreen = 'rgb(42, 156, 71)'
const lightRed = 'rgb(255,59,48)'
const darkRed = 'rgb(255,69,58)'
const backgroundColor = '#fafafa'
const typographyGrey = '#717171'
const borderColor = 'rgba(0, 0, 0, 0.23)'
const borderRadius = 7

const lightTheme = createMuiTheme({
  // @ts-ignore
  type: ThemeType.light,
  palette: {
    primary: {
      light: pinkLight,
      main: darkGreen,
      dark: darkGreen,
      contrastText: '#fff'
    },
    secondary: {
      light: azureLight,
      main: azureDark,
      dark: azureDark,
      contrastText: '#fff'
    },
    error: {
      light: lightRed,
      main: darkRed,
      dark: darkRed,
      contrastText: '#fff'
    }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      padding: 0,
      fontSize: '25pt',
      color: typographyGrey
    },
    h2: {
      padding: 0,
      fontSize: '23pt',
      color: typographyGrey
    },
    h3: {
      padding: 0,
      fontSize: '21pt',
      color: typographyGrey
    },
    h4: {
      padding: 0,
      fontSize: '15pt',
      color: typographyGrey,
      fontWeight: 500
    },
    h5: {
      padding: 0,
      fontSize: '13pt',
      color: typographyGrey
    },
    h6: {
      padding: 0,
      fontSize: '13pt',
      fontWeight: 'bold',
      color: typographyGrey
    },
    body1: {
      padding: 0,
      fontSize: '12pt',
      color: typographyGrey
    },
    body2: {
      padding: 0,
      fontSize: '12pt',
      fontWeight: 500,
      color: typographyGrey
    },
    caption: {
      padding: 0,
      fontSize: '10pt',
      color: typographyGrey
    }

  },
  overrides: {
    MuiGrid: {
      root: {
        wordBreak: 'break-word'
      }
    },
    MuiCard: {
      root: {
        // boxShadow: '0 10px 50px rgba(0,0,0,0.05), 0 6px 15px rgba(0,0,0,0.1)',
        boxShadow: '0 18px 38px 0 #e1eafc',
        borderRadius
      }
    },
    MuiPaper: {
      root: {
        borderRadius,
        backgroundColor
      }
    },
    MuiInputBase: {
      root: {
        color: typographyGrey,
        '&$disabled': {
          color: lightGrey,
          opacity: 0.7
        }
      },
      input: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        '&selected': {
          backgroundColor: 'transparent'
        },
        '&$disabled': {
          color: lightGrey,
          opacity: 0.7
        }
      }
    },
    MuiInput: {
      root: {
        color: typographyGrey,
        '&$disabled': {
          color: lightGrey
        }
      },
      inputMultiline: {
        boxSizing: 'border-box',
        borderRadius: 0,
        border: `1px solid ${darkGreen}`,
        background: 'transparent',
        backgroundColor: 'transparent',
        height: 'auto',
        padding: '.5em',
        overflowY: 'scroll',
        whiteSpace: 'normal',
        '&:hover': {
          background: 'transparent',
          backgroundColor: 'transparent'
        }
      }
    },
    MuiOutlinedInput: {
      root: {
        '&$disabled $notchedOutline': {
          borderColor: 'rgba(0,0,0,.15)'
        }
      },
      input: {
        fontSize: '.9em'
      }
    },
    MuiInputLabel: {
      root: {
        color: typographyGrey,
        opacity: '.6'
      }
    },
    MuiButton: {
      root: {
        textTransform: 'none',
        boxShadow: 'none !important',
        fontSize: '17px !important',
        '@media (max-width: 600px)': {
          fontSize: 'inherit'
        }
      },
      contained: {
        color: '#fff',
        borderRadius,
        fontSize: 14,
        '&:hover': {
          color: '#fff'
        }
      },
      outlined: {
        color: typographyGrey,
        borderRadius,
        fontSize: 14,
        borderColor
      }
    },
    MuiAvatar: {
      root: {
        backgroundColor: `${darkGreen} !important`
      }
    },
    MuiIconButton: {
      root: {
        color: darkGreen
      }
    },
    MuiDialog: {
      root: {
        boxShadow: '0 18px 38px 0 #e1eafc'
      },
      paper: {
        borderRadius: 15
      },
      paperFullScreen: {
        width: '95%',
        height: '95%',
        borderRadius: 15
      }
    },
    MuiDialogTitle: {
      root: {
        color: subtitleGrey,
        textAlign: 'center',
        fontSize: 20
      }
    },
    MuiSelect: {
      selectMenu: {
        height: 'none'
      }
    },
    MuiTypography: {
      // warning, scritta piccola (ad esempio in fondo ad una card)
      caption: {
        fontSize: 13,
        color: typographyGrey,
        width: '80%'
      }
    },
    MuiTableHead: {
      root: {
        backgroundColor: 'rgba(0,0,0,.1)'
      }
    },
    MuiTableRow: {
      root: {
        borderBottom: '1px solid rgba(0,0,0,.1)',
        '&:last-of-type': {
          borderBottom: 'none'
        }
      }
    },
    MuiTableCell: {
      head: {
        fontWeight: 600,
        borderBottom: 'none',
        minWidth: 100
      },
      body: {
        fontSize: '.9em',
        borderBottom: 'none'
      }
    },
    MuiMenuItem: {
      root: {
        padding: '.5em 1em',
        minWidth: 150,
        display: 'flex',
        '&:not(:last-of-type):before': {
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          content: '""',
          width: '80%',
          height: '100%',
          borderBottom: '1px solid rgba(0,0,0,.1)'
        },
        '&$selected': {
          '&>p': {
            color: darkGreen
          }
        }
      }
    }
  }
})

export default lightTheme
