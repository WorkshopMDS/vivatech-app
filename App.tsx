import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { useColorScheme } from 'react-native'
import { useFonts } from 'expo-font'
import { ThemeProvider } from 'styled-components'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import Navigation from './app/Navigation'
import VivaTheme from './app/utils/Theme'

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <ThemeProvider {...{ theme }}>
            <NavigationContainer {...{ theme }}>
              <Navigation />
            </NavigationContainer>
          </ThemeProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
