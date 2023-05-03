import { Theme, useTheme } from '@react-navigation/native'

const VivaTheme = (Default: Theme) => {
  return {
    ...Default,
    colors: {
      ...Default.colors,
      border: '#A0A0A0',
      primary: '#5508a0',
      primary100: '#ff00e4',
      primary200: '#ff0081',
      primary300: '#a1009b',
      orange: '#f15700',
      yellow: '#ffff00',
      green: '#00ff00',
      blue: '#00ffff',
    },
  }
}

export type VivaThemeType = ReturnType<typeof VivaTheme>

export const useCustomTheme = (): VivaThemeType => {
  return useTheme() as VivaThemeType
}

export default VivaTheme
