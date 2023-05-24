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
