import { DarkTheme, DefaultTheme, useTheme } from '@react-navigation/native'

const Colors = {
  border: '#A0A0A0',
  primary: '#5508a0',
  primary100: '#ff00e4',
  primary200: '#ff0081',
  primary300: '#a1009b',
  primary1000: '#5508a0',
  orange: '#f15700',
  yellow: '#ffff00',
  green: '#00ff00',
  blue: '#00ffff',
  gradient100: '#F8F265',
  gradient200: '#ff5900',
  gradient300: '#f5255d',
}

export const VivaThemeLight = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...Colors,
  },
}

export const VivaThemeDark: VivaThemeType = {
  ...DarkTheme,

  colors: {
    ...DarkTheme.colors,
    background: '#202020',
    ...Colors,
    primary1000: '#FFFFFF',
  },
}

export type VivaThemeType = typeof VivaThemeLight

export const useCustomTheme = (): VivaThemeType => {
  return useTheme() as VivaThemeType
}
