const ThemeType = Object.freeze({
  light: 'light',
  dark: 'dark'
})

class ColorPalette {
  constructor (themeType) {
    this.themeType = themeType || ThemeType.light
    this.lightGreen = 'rgb(52,199,89)'
    this.darkGreen = 'rgb(42, 156, 71)'
    this.lightRed = 'rgb(255,59,48)'
    this.darkRed = 'rgb(255,69,58)'
    this.updatePalette()
  }

  swithTheme (type) {
    this.themeType = type
    this.updatePalette()
  }

  updatePalette () {
    this.backgroundColor = this.themeType === ThemeType.dark
      ? '#111'
      : '#fafafa'
    this.typographyGrey = this.themeType === ThemeType.dark
      ? '#b3b3b3'
      : '#717171'
    this.borderColor = this.themeType === ThemeType.dark
      ? '#b3b3b3'
      : 'rgba(0, 0, 0, 0.23)'
    this.border = this.themeType === ThemeType.dark
      ? '1px solid #b3b3b3'
      : '1px solid rgba(0, 0, 0, 0.23)'
  }
}

export const FutBobPalette = new ColorPalette()
