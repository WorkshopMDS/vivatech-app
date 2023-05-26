import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  GET_CONFERENCE,
  GET_CONFERENCE_SUCCESS,
  GET_CONFERENCE_FAILURE,
} from '../actions/types'

const initialState = {
  conferences: [],
  error: '',
  loading: false,
}

const fetchConferences = async () => {
  try {
    const conferences = await AsyncStorage.getItem('conferences')
    if (conferences !== null) {
      initialState.conferences = JSON.parse(conferences)
    }
  } catch (e) {
    console.log(e)
  }
}

fetchConferences()

function conferencesReducer(state = initialState, action: any) {
  const { type, payload } = action

  switch (type) {
    case GET_CONFERENCE:
      return {
        ...state,
        loading: true,
      }
    case GET_CONFERENCE_SUCCESS:
      return {
        ...state,
        conferences: payload,
      }
    case GET_CONFERENCE_FAILURE:
      return {
        ...state,
        error: "Can't load conferences",
        loading: false,
      }
    default:
      return state
  }
}

export default conferencesReducer
