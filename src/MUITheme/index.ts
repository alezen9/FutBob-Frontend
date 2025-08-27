import { ThemeType } from './palette'

declare module '@mui/material/styles' {
  interface Theme {
    type: ThemeType
  }
  interface ThemeOptions {
    type: ThemeType
  }
}

export { default as LightTheme } from './light'
export { default as DarkTheme } from './dark'
export { ZenPalette, ThemeType, INITIAL_THEME_TYPE } from './palette'


