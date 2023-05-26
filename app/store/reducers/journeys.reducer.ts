import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  GET_JOURNEYS,
  GET_JOURNEYS_FAILURE,
  GET_JOURNEYS_SUCCESS,
} from '../actions/types'

const initialState = {
  journeys: [],
  error: '',
  loading: false,
}

const fetchLocalData = async () => {
  try {
    const journeys = await AsyncStorage.getItem('journeys')
    console.log(journeys)
    if (journeys !== null) {
      initialState.journeys = JSON.parse(journeys)
    }
  } catch (e) {
    console.log(e)
  }
}

fetchLocalData()

function journeysReducer(state = initialState, action: any) {
  const { type, payload } = action

  switch (type) {
    case GET_JOURNEYS:
      return {
        ...state,
        loading: true,
      }
    case GET_JOURNEYS_SUCCESS:
      return {
        ...state,
        journeys: payload,
      }
    case GET_JOURNEYS_FAILURE:
      return {
        ...state,
        error: "Can't load journeys",
        loading: false,
      }
    default:
      return state
  }
}

export default journeysReducer
