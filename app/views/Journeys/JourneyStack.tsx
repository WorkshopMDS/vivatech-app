import { createNativeStackNavigator } from '@react-navigation/native-stack'
import JourneysListView from './JourneysListView'
import JourneyItemView from './JourneyItemView'
import TutorialQuestionView from '../Questions/TutorialQuestionView'
import QuestionsManager from '../Questions/QuestionsManager'
import JourneyResult from './JourneyResult'

const Stack = createNativeStackNavigator()

function ProgramStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="JourneysList" component={JourneysListView} />
      <Stack.Screen name="JourneyItem" component={JourneyItemView} />
      <Stack.Screen name="JourneyResult" component={JourneyResult} />
      <Stack.Screen name="QuestionsManager" component={QuestionsManager} />
      <Stack.Screen
        name="TutorialQuestionView"
        component={TutorialQuestionView}
      />
    </Stack.Navigator>
  )
}

export default ProgramStack
