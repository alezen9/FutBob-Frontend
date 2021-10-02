import { ThemeType } from './palette'

declare module '@mui/material/styles/createMuiTheme' {
  interface Theme {
    type: ThemeType
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    type: ThemeType
  }
}

export { default as LightTheme } from './light'
export { default as DarkTheme } from './dark'
export { ZenPalette, ThemeType, INITIAL_THEME_TYPE } from './palette'


