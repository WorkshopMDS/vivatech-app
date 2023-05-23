import { createStackNavigator } from '@react-navigation/stack'
import FilterView from '../Filter/FilterView'
import ExhibitorsView from './ExhibitorsView'

const Stack = createStackNavigator()

function ExhibitorStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Centres d'interêts" component={FilterView} />
      <Stack.Screen name="Exposants" component={ExhibitorsView} />
    </Stack.Navigator>
  )
}

export default ExhibitorStack
