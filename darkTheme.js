import { createMuiTheme } from '@material-ui/core/styles'

export const _green = '#2BD4B5'
export const _darkGreen = '#005959'
export const typographyGrey = '#b3b3b3'
export const subtitleGrey = '#686868'
export const lightGrey = '#c1c1c1'
export const darkGrey = '#585858'
export const borderRadius = 7

export const inputBorderColorDark = '#b3b3b3'

const pinkLight = 'rgb(255,45,85)'
const pinkDark = 'rgb(255,55,95)'

const indigoLight = 'rgb(88,86,214)'
const indigoDark = 'rgb(94,92,230)'

const redLight = 'rgb(255,59,48)'
const redDark = 'rgb(255,69,58)'

const azureLight = 'rgb(0,122,255)'
const azureDark = 'rgb(10,132,255)'
const blue = 'rgba(0,64,221)'

export const greenLight = 'rgba(52,199,89)'
export const green = 'rgba(48,209,88)'

const darkTheme = createMuiTheme({
  type: 'dark',
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
        boxShadow: '0 18px 38px 0 #e1eafc',
        borderRadius
      }
    },
    MuiPaper: {
      root: {
        borderRadius,
        backgroundColor: '#222'
      }
    },
    MuiInputBase: {
      root: {
        color: typographyGrey,
        '&$disabled': {
          color: lightGrey
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
          color: 'rgba(255,255,255,.4)'
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
        '&:hover $notchedOutline': {
          borderColor: 'rgba(255,255,255,.7)'
        },
        '&$disabled $notchedOutline': {
          borderColor: 'rgba(255,255,255,.2)'
        }
      },
      input: {
        fontSize: '.9em'
      },
      notchedOutline: {
        borderColor: typographyGrey,
        '&:hover': {
          borderColor: 'rgba(255,255,255,.7)'
        }
      }
    },
    MuiInputLabel: {
      root: {
        color: typographyGrey,
        opacity: '.6',
        '&$disabled': {
          color: 'rgba(255,255,255,.3)'
        }
      }
    },
    MuiButtonBase: {
      root: {
        '&$disabled': {
          backgroundColor: 'rgba(255,255,255,.2)',
          color: 'rgba(255,255,255,.05)'
        }
      }
    },
    MuiButton: {
      root: {
        textTransform: 'none',
        boxShadow: 'none !important',
        fontSize: '17px !important',
        '@media (max-width: 600px)': {
          fontSize: 'inherit'
        },
        '&$disabled': {
          backgroundColor: 'rgba(255,255,255,.2)',
          color: 'rgba(255,255,255,.05)'
        }
      },
      contained: {
        color: '#fff',
        borderRadius,
        fontSize: 14,
        '&:hover': {
          color: '#fff'
        },
        '&$disabled': {
          backgroundColor: 'rgba(255,255,255,.2)',
          color: 'rgba(255,255,255,.05)'
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
    MuiListItemIcon: {
      root: {
        color: 'unset',
        transition: 'color .3s ease'
      }
    },
    MuiSelect: {
      selectMenu: {
        height: 'none'
      },
      iconOutlined: {
        color: typographyGrey
      }
    },
    MuiTable: {
      root: {
        backgroundColor: '#111'
      }
    },
    MuiTableHead: {
      root: {
        backgroundColor: '#222'
      }
    },
    MuiTableRow: {
      root: {
        borderBottom: '1px solid rgba(255,255,255,.15)',
        '&:last-of-type': {
          borderBottom: 'none'
        }
      }
    },
    MuiTableCell: {
      head: {
        fontWeight: 600,
        color: typographyGrey,
        borderBottom: 'none',
        minWidth: 100
      },
      body: {
        fontSize: '.9em',
        color: 'rgba(255,255,255,.5)',
        borderBottom: 'none'
      }
    },
    MuiPaginationItem: {
      root: {
        color: typographyGrey,
        '&$disabled': {
          color: typographyGrey
        }
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
          borderBottom: '1px solid rgba(255,255,255,.2)'
        },
        '&:hover': {
          backgroundColor: '#444'
        },
        '&$selected': {
          backgroundColor: 'unset',
          '&:hover': {
            backgroundColor: '#444'
          },
          '&>p': {
            color: greenLight
          }
        }
      }
    }
  }
})

export default darkTheme
