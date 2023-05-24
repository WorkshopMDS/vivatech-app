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
