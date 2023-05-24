import { DarkTheme, DefaultTheme, useTheme } from '@react-navigation/native'

const Colors = {
  border: '#A0A0A0',
  primary: '#5508a0',
  primary100: '#ff00e4',
  primary200: '#ff0081',
  primary300: '#a1009b',
  orange: '#f15700',
  yellow: '#ffff00',
  green: '#00ff00',
  blue: '#00ffff',
  gradient100: '#fff265',
  gradient200: '#ff5900',
  gradient300: '#f5255d',
}

export const VivaThemeLight = {
  ...DefaultTheme,
  roundness: '4px',
  colors: {
    ...DefaultTheme.colors,
    ...Colors,
  },
}

export const VivaThemeDark: VivaThemeType = {
  ...DarkTheme,
  roundness: '4px',
  colors: {
    ...DarkTheme.colors,
    ...Colors,
  },
}

export type VivaThemeType = typeof VivaThemeLight

export const useCustomTheme = (): VivaThemeType => {
  return useTheme() as VivaThemeType
}
