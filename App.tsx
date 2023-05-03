import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { useColorScheme } from 'react-native'
import { useFonts } from 'expo-font'
import { ThemeProvider } from 'styled-components'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import VivaTheme from './app/Theme'
import Navigation from './app/Navigation'

export default function App() {
  const scheme = useColorScheme()

  const isDarkMode = scheme === 'dark'

  const theme = VivaTheme(isDarkMode ? DarkTheme : DefaultTheme)

  const [fontsLoaded] = useFonts({
    'Museo-100': require('./assets/fonts/MuseoSans-100.otf'),
    'Museo-300': require('./assets/fonts/MuseoSans-300.otf'),
    'Museo-500': require('./assets/fonts/MuseoSans_500.otf'),
    'Museo-700': require('./assets/fonts/MuseoSans_700.otf'),
    'Museo-900': require('./assets/fonts/MuseoSans_900.otf'),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider {...{ theme }}>
        <NavigationContainer {...{ theme }}>
          <Navigation />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
