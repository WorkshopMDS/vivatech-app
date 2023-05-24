import {
  GET_EXHIBITORS,
  GET_EXHIBITORS_SUCCESS,
  GET_EXHIBITORS_FAILURE,
} from '../actions/types'

const initialState = {
  exhibitors: [],
  error: '',
  loading: false,
}

function exhibitorsReducer(state = initialState, action: any) {
  const { type, payload } = action

  switch (type) {
    case GET_EXHIBITORS:
      return {
        ...state,
        loading: true,
      }
    case GET_EXHIBITORS_SUCCESS:
      return {
        ...state,
        exhibitors: payload,
      }
    case GET_EXHIBITORS_FAILURE:
      return {
        ...state,
        error: "Can't load exhibitors",
        loading: false,
      }
    default:
      return state
  }
}

export default exhibitorsReducer
