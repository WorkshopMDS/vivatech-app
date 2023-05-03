import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import Navigation from './app/Navigation'

export default function App() {
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
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  )
}
