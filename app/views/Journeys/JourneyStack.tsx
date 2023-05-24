import { createStackNavigator } from '@react-navigation/stack'
import JourneysListView from './JourneysListView'
import JourneyItemView from './JourneyItemView'
import QuestionView from '../Questions/QuestionView'

const Stack = createStackNavigator()

function ProgramStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="JourneysList" component={JourneysListView} />
      <Stack.Screen name="JourneyItem" component={JourneyItemView} />
      <Stack.Screen name="QuestionView" component={QuestionView} />
    </Stack.Navigator>
  )
}

export default ProgramStack
