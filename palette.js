const ThemeType = Object.freeze({
  light: 0,
  dark: 1
})

class ColorPalette {
  constructor (themeType) {
    this.themeType = themeType || ThemeType.light
    this.lightGreen = 'rgb(52,199,89)'
    this.darkGreen = 'rgb(42, 156, 71)'
    this.lightRed = 'rgb(255,59,48)'
    this.darkRed = 'rgb(255,69,58)'
    this.typographyGrey = themeType === 'dark'
      ? '#b3b3b3'
      : '#717171'
  }

  swithTheme (type) {
    this.themeType = type
    // colors here
    this.typographyGrey = type === ThemeType.light
      ? '#717171'
      : '#b3b3b3'
  }
}

export const FutBobPalette = new ColorPalette()
