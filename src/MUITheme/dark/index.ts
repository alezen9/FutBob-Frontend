// theme/dark.ts
import { createTheme } from '@mui/material/styles'
import { configColors, ThemeType } from '../palette'

const subtitleGrey = '#686868'
const lightGrey = '#c1c1c1'
const borderColor = '#b3b3b3'
const borderRadius = 7

const DarkTheme = createTheme({
type: ThemeType.dark,
  palette: {
    mode: 'dark',
    primary: configColors.primary.dark,
    secondary: configColors.secondary.dark,
    error: configColors.error.dark,
    text: { primary: configColors.typographyColor.dark }
  },
  shape: { borderRadius },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: { padding: 0, fontSize: '25pt', color: configColors.typographyColor.dark },
    h2: { padding: 0, fontSize: '23pt', color: configColors.typographyColor.dark },
    h3: { padding: 0, fontSize: '21pt', color: configColors.typographyColor.dark },
    h4: { padding: 0, fontSize: '15pt', color: configColors.typographyColor.dark, fontWeight: 500 },
    h5: { padding: 0, fontSize: '13pt', color: configColors.typographyColor.dark },
    h6: { padding: 0, fontSize: '13pt', fontWeight: 'bold', color: configColors.typographyColor.dark },
    body1:{ padding: 0, fontSize: '12pt', color: configColors.typographyColor.dark },
    body2:{ padding: 0, fontSize: '12pt', fontWeight: 500, color: configColors.typographyColor.dark },
    caption:{ padding: 0, fontSize: '10pt', color: configColors.typographyColor.dark }
  },
  components: {
    MuiGrid: {
      styleOverrides: {
        root: { wordBreak: 'break-word' }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: '0 18px 38px 0 #e1eafc', borderRadius }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius, backgroundColor: '#222' },
        elevation1: { boxShadow: '0 7px 20px black' }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: configColors.typographyColor.dark,
          '&.Mui-disabled': { color: lightGrey }
        },
        input: {
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          '&.Mui-disabled': { color: 'rgba(255,255,255,.4)' }
        }
      }
    },
    // If you still use <Input />, keep this. Otherwise prefer <TextField /> with variant="outlined"
    MuiInput: {
      styleOverrides: {
        root: {
          color: configColors.typographyColor.dark,
          '&.Mui-disabled': { color: lightGrey }
        },
        inputMultiline: {
          boxSizing: 'border-box',
          borderRadius: 0,
          border: `1px solid ${configColors.primary.dark.main}`,
          background: 'transparent',
          backgroundColor: 'transparent',
          height: 'auto',
          padding: '.5em',
          overflowY: 'scroll',
          whiteSpace: 'normal',
          '&:hover': { background: 'transparent', backgroundColor: 'transparent' }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,.7)' },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,.2)' }
        },
        input: { fontSize: '.9em' },
        notchedOutline: { borderColor }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: configColors.typographyColor.dark,
          opacity: '.6',
          '&.Mui-disabled': { color: 'rgba(255,255,255,.3)' }
        }
      }
    },
    MuiStepper: { styleOverrides: { root: { background: 'transparent' } } },
    MuiStepIcon: {
      styleOverrides: {
        "root": {
         color: 'rgba(255,255,255,.1)',
         "&.Mui-active": {
               "color": "currentColor"
            }
         }
      }
    },
    MuiStepLabel: {
      styleOverrides: {
        root: { '&.Mui-disabled': { opacity: 0.3 } }
      }
    },
    MuiMobileStepper: {
      styleOverrides: {
        dotActive: { backgroundColor: configColors.primary.dark.dark },
        dot: { backgroundColor: 'rgba(255,255,255,.2)' }
      }
    },
    MuiDivider: { styleOverrides: { root: { backgroundColor: 'rgba(255,255,255,.3)' } } },
    MuiBackdrop: { styleOverrides: { root: { backdropFilter: 'blur(12px)' } } },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            backgroundColor: 'rgba(255,255,255,.2)',
            color: 'rgba(255,255,255,.05)'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 300,
          minWidth: 120,
          textTransform: 'none',
          boxShadow: 'none',
          fontSize: '17px',
          '@media (max-width: 600px)': { fontSize: 'inherit' },
          '&.Mui-disabled': {
            backgroundColor: 'rgba(255,255,255,.2)',
            color: 'rgba(255,255,255,.05)'
          }
        },
        contained: {
          color: '#fff',
          borderRadius,
          fontSize: 14,
          '&:hover': { color: '#fff' },
          '&.Mui-disabled': {
            backgroundColor: 'rgba(255,255,255,.2)',
            color: 'rgba(255,255,255,.05)'
          }
        },
        outlined: {
          color: configColors.typographyColor.dark,
          borderRadius,
          fontSize: 14,
          borderColor,
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,.1)',
            color: 'rgba(255,255,255,.1)'
          }
        },
        text: { '&:hover': { backgroundColor: 'rgba(255,255,255,.05)' } }
      }
    },
    MuiAvatar: { styleOverrides: { root: { backgroundColor: `${configColors.primary.dark.main} !important` } } },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: configColors.primary.dark.main,
          '&.Mui-disabled': { color: 'rgba(255,255,255,.07)' },
          '&:hover': { backgroundColor: 'rgba(255,255,255,.05)' }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        root: { boxShadow: '0 18px 38px 0 #e1eafc' },
        paper: ({ theme }) => ({
          borderRadius: 7,
          [theme.breakpoints.down('sm')]: { margin: 0 }
        }),
        paperFullScreen: {
          width: '95%',
          height: '95%',
          borderRadius: 7
        },
        paperFullWidth: ({ theme }) => ({
          [theme.breakpoints.down('sm')]: { width: 'calc(100% - 32px)' }
        })
      }
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: configColors.typographyColor.dark,
          '&.Mui-disabled': { color: configColors.typographyColor.dark }
        },
        outlined: { border: '1px solid rgba(255,255,255,.1)' }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: { color: subtitleGrey, textAlign: 'center', fontSize: 20 }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: { '&:hover': { backgroundColor: 'rgba(255,255,255, .03) !important' } }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: { color: 'unset', transition: 'color .3s ease' }
      }
    },
    MuiSelect: {
      // v5 no longer has `selectMenu` / `iconOutlined` classes.
      // Use `select` and `icon` (applies to all variants) or target `.MuiOutlinedInput-root` if needed.
      styleOverrides: {
        select: { /* height: 'none'  // likely unnecessary */ },
        icon: { color: configColors.typographyColor.dark }
      }
    },
    MuiTab: {
      styleOverrides: {
        textColorInherit: {
          '&.Mui-disabled': {
            color: '#fafafa',
            opacity: 0.2,
            background: `repeating-linear-gradient(
              -55deg,
              #222,
              #222 10px,
              #333 10px,
              #333 20px
            )`
          }
        }
      }
    },
    MuiTable: { styleOverrides: { root: { backgroundColor: '#111' } } },
    MuiTableHead: { styleOverrides: { root: { backgroundColor: '#222' } } },
    MuiTableRow: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255,255,255,.15)',
          '&:last-of-type': { borderBottom: 'none' }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 500,
          color: configColors.typographyColor.dark,
          borderBottom: 'none',
          minWidth: 100
        },
        body: {
          paddingTop: 12,
          paddingBottom: 12,
          fontSize: '.9em',
          fontWeight: 300,
          color: 'rgba(255,255,255,.5)',
          borderBottom: 'none'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          position: 'relative',
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
          '&:hover': { backgroundColor: '#444' },
          '&.Mui-selected': {
            backgroundColor: 'unset',
            '&:hover': { backgroundColor: '#444' },
            '& > p': { color: configColors.primary.dark.main }
          }
        }
      }
    }
  }
})

export default DarkTheme