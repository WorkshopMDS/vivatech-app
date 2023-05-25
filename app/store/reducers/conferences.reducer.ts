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
