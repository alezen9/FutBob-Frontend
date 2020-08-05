import { createMuiTheme } from '@material-ui/core/styles'

export const _green = '#2BD4B5'
export const _darkGreen = '#005959'
export const typographyGrey = '#717171'
export const subtitleGrey = '#686868'
export const lightGrey = '#c1c1c1'
export const darkGrey = '#585858'
export const borderRadius = 7

export const inputBorderColorLight = 'rgba(0, 0, 0, 0.23)'

const pinkLight = 'rgb(255,45,85)'
export const pinkDark = 'rgb(255,55,95)'

export const indigoLight = 'rgb(88,86,214)'
const indigoDark = 'rgb(94,92,230)'

export const redLight = 'rgb(255,59,48)'
const redDark = 'rgb(255,69,58)'

export const azureVeryLight = '#1DA1F2'
export const azureLight = 'rgb(0,122,255)'
const azureDark = 'rgb(10,132,255)'
const blue = 'rgba(0,64,221)'

export const greenLight = 'rgba(52,199,89)'
export const green = 'rgba(48,209,88)'

const lightTheme = createMuiTheme({
  type: 'light',
  activeColor: greenLight,
  palette: {
    primary: {
      light: pinkLight,
      main: greenLight,
      dark: greenLight,
      contrastText: '#fff'
    },
    secondary: {
      light: azureLight,
      main: azureDark,
      dark: azureDark,
      contrastText: '#fff'
    },
    error: {
      light: redLight,
      main: redDark,
      dark: redDark,
      contrastText: '#fff'
    }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    useNextVariants: true,
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
      fontWeight: 'semi-bold'
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
      fontWeight: 'semi-bold',
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
        backgroundColor: '#fafafa'
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
        border: `1px solid ${greenLight}`,
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
        borderColor: lightGrey
      }
    },
    MuiAvatar: {
      root: {
        backgroundColor: `${greenLight} !important`
      }
    },
    MuiIconButton: {
      root: {
        color: greenLight
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
            color: greenLight
          }
        }
      }
    }
  }
})

export default lightTheme
