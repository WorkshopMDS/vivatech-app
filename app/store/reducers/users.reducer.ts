import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  ADD_USERS_JOURNEYS,
  ADD_USERS_JOURNEYS_ERROR,
  ADD_USERS_JOURNEYS_SUCCESS,
} from '../actions/types'

const initialState = {
  userJourneys: [],
  userJourneysScore: [],
  error: '',
  loading: false,
}

const fetchTicketData = async () => {
  try {
    const userJourneys = await AsyncStorage.getItem('userJourneys')
    if (userJourneys !== null) {
      initialState.userJourneys = JSON.parse(userJourneys)
    }
  } catch (e) {
    console.log(e)
  }
}

fetchTicketData()

function usersReducer(state = initialState, action: any) {
  const { type, payload } = action

  switch (type) {
    case ADD_USERS_JOURNEYS:
      return {
        ...state,
        loading: true,
      }
    case ADD_USERS_JOURNEYS_ERROR:
      return {
        ...state,
        error: 'An error occurred when add a new user journey score',
        loading: false,
      }
    case ADD_USERS_JOURNEYS_SUCCESS:
      return {
        ...state,
        userJourneysScore: payload,
      }
    default:
      return state
  }
}

export default usersReducer
