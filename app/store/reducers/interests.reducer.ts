import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  GET_INTERESTS,
  GET_INTERESTS_SUCCESS,
  GET_INTERESTS_FAILURE,
} from '../actions/types'

const initialState = {
  interests: [],
  error: '',
  loading: false,
}

const fetchInterestsData = async () => {
  try {
    const interests = await AsyncStorage.getItem('interests')
    if (interests !== null) {
      initialState.interests = JSON.parse(interests)
    }
  } catch (e) {
    console.log(e)
  }
}

fetchInterestsData()

function interestsReducer(state = initialState, action: any) {
  const { type, payload } = action

  switch (type) {
    case GET_INTERESTS:
      return {
        ...state,
        loading: true,
      }
    case GET_INTERESTS_SUCCESS:
      return {
        ...state,
        interests: payload,
      }
    case GET_INTERESTS_FAILURE:
      return {
        ...state,
        error: "Can't load interests",
        loading: false,
      }
    default:
      return state
  }
}

export default interestsReducer
