import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FilterView from '../Filter/FilterView'
import ExhibitorsView from './ExhibitorsView'

const Stack = createNativeStackNavigator()

function ExhibitorStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Centres d'interêts" component={FilterView} />
      <Stack.Screen name="Exposants" component={ExhibitorsView} />
    </Stack.Navigator>
  )
}

export default ExhibitorStack
