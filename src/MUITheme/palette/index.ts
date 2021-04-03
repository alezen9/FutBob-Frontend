import { green, lime, pink, red, teal } from "@material-ui/core/colors"

export enum ThemeType {
  light = 'light',
  dark = 'dark'
}

export const INITIAL_THEME_TYPE = ThemeType.light

type MaterialColor = {
   light: string
   main: string
   dark: string
   contrastText?: string
}

type Config = {
   primary: Record<ThemeType, MaterialColor>
   secondary: Record<ThemeType, MaterialColor>
   error: Record<ThemeType, MaterialColor>
   typographyColor: Record<ThemeType, string>
}

export const configColors: Config = {
  primary: {
    [ThemeType.light]: {
      light: teal[400],
      main: teal[800],
      dark: teal[900],
      contrastText: '#fff'
    },
    [ThemeType.dark]: {
      light: teal[400],
      main: teal[800],
      dark: teal[900],
      contrastText: '#fff'
    }
  },
  secondary: {
    [ThemeType.light]: {
      light: lime[700],
      main: lime[800],
      dark: lime[900],
    },
    [ThemeType.dark]: {
      light: lime[700],
      main: lime[800],
      dark: lime[900],
    }
  },
  error: {
    [ThemeType.light]: {
      light: red[500],
      main: red.A400,
      dark: red[600],
      contrastText: '#fff'
    },
    [ThemeType.dark]: {
      light: red[600],
      main: red.A700,
      dark: red[900],
      contrastText: '#fff'
    }
  },
  typographyColor: {
    [ThemeType.light]: '#717171',
    [ThemeType.dark]: '#b3b3b3'
  }
}

class ColorPalette {
   #_primary: Record<ThemeType, MaterialColor>
   #_secondary: Record<ThemeType, MaterialColor>
   #_error: Record<ThemeType, MaterialColor>
   #_typographyColor: Record<ThemeType, string>
   themeType: ThemeType
   primary: MaterialColor
   secondary: MaterialColor
   error: string
   lightGreen: string
   darkGreen: string
   lightRed: string
   darkRed: string
   boxShadow: string
   userTableRowBackgroundColor: string
   backgroundColor: string
   paperBackgroundColor: string
   typographyGrey: string
   borderColor: string
   border: string
   borderWithOpacity: string
   successColor: string
   warningColor: string
   infoColor: string
   oddListStandOut: string
   evenListStandout: string
   dividerColor: string
   draggableSteadyBackground: string
   draggableDraggingBackground: string
   backgroundColorInverted: string
   backgroundColorStandOut: string
   tableCellBackground: string
   tableHeaderCellBackground: string
   shineBackgroundImage: string
   tableBackgroundColor: string


  constructor (themeType: ThemeType = INITIAL_THEME_TYPE) {
    this.themeType = themeType
    this.lightGreen = 'rgb(52,199,89)'
    this.darkGreen = 'rgb(42, 156, 71)'
    this.lightRed = 'rgb(255,59,48)'
    this.darkRed = 'rgb(255,69,58)'
    this.#_primary = configColors.primary
    this.#_secondary = configColors.secondary
    this.#_error = configColors.error
    this.#_typographyColor = configColors.typographyColor
    this.updatePalette()
  }

  switchTheme (themeType: ThemeType = ThemeType.light) {
    this.themeType = themeType
    this.updatePalette()
  }
  updatePalette () {
    this.primary = this.themeType === ThemeType.dark
      ? this.#_primary.dark
      : this.#_primary.light
    this.secondary = this.themeType === ThemeType.dark
      ? this.#_secondary.dark
      : this.#_secondary.light
    this.error = this.themeType === ThemeType.dark
      ? this.#_error.dark.main
      : this.#_error.light.main
    this.backgroundColor = this.themeType === ThemeType.dark
      ? '#111'
      : '#fafafa'
    this.paperBackgroundColor = this.themeType === ThemeType.dark
      ? '#222'
      : '#fafafa'
    this.typographyGrey = this.themeType === ThemeType.dark
      ? this.#_typographyColor.dark
      : this.#_typographyColor.light
    this.borderColor = this.themeType === ThemeType.dark
      ? '#b3b3b3'
      : 'rgba(0, 0, 0, 0.23)'
    this.border = this.themeType === ThemeType.dark
      ? '1px solid #b3b3b3'
      : '1px solid rgba(0, 0, 0, 0.23)'
    this.boxShadow = this.themeType === ThemeType.dark
      ? '0 19px 38px rgba(0,0,0,0.15), 0 15px 12px rgba(0,0,0,0.22)'
      : '0 10px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.03)'
   this.borderWithOpacity = this.themeType === ThemeType.dark
      ? '1px solid rgba(179, 179, 179, .3)'
      : '1px solid rgba(0, 0, 0, 0.1)'
    this.boxShadow = this.themeType === ThemeType.dark
      ? '0 19px 38px rgba(0,0,0,0.15), 0 15px 12px rgba(0,0,0,0.22)'
      : '0 10px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.03)'
    this.userTableRowBackgroundColor = this.themeType === ThemeType.dark
      ? 'rgba(255,255,255,.02)'
      : 'rgba(0,0,0,.05)'
    this.tableCellBackground = this.themeType === ThemeType.dark
      ? '#111'
      : '#fafafa'
    this.tableHeaderCellBackground = this.themeType === ThemeType.dark
      ? '#383838'
      : '#BEBEBE'
    this.successColor = this.themeType === ThemeType.dark
      ? 'rgb(48, 209, 88)'
      : 'rgb(52, 199, 89)'
    this.backgroundColorStandOut = this.themeType === ThemeType.dark
      ? '#181818'
      : '#f2f2f2'
    this.oddListStandOut = this.themeType === ThemeType.dark
      ? 'rgba(255,255,255,.03)'
      : 'rgba(0,0,0,.03)'
    this.evenListStandout = this.themeType === ThemeType.dark     // TO DEFINE
      ? 'orange'
      : 'orange'
    this.dividerColor = this.themeType === ThemeType.dark
      ? '#5E5E5E'
      : '#D5D5D5'
    this.draggableSteadyBackground = this.themeType === ThemeType.dark
      ? '#303030'
      : '#e3e3e3'
    this.draggableDraggingBackground = this.themeType === ThemeType.dark
      ? '#575757'
      : '#b5b5b5',
   this.shineBackgroundImage = this.themeType === ThemeType.dark
      ? 'linear-gradient(110deg, transparent 33%, rgba(255,255,255,0.7) 50%, transparent 66%)'
      : 'linear-gradient(110deg, transparent 33%, rgba(255,255,255,0.7) 50%, transparent 66%)'
    this.tableBackgroundColor = this.themeType === ThemeType.dark
      ? '#131313'
      : '#f7f7f7'
  }
}

export const ZenPalette: ColorPalette = new ColorPalette()
