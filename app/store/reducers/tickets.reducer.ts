import {
  VALIDATE_TICKET,
  VALIDATE_TICKET_FAILURE,
  VALIDATE_TICKET_SUCCESS,
} from '../actions/types'

const initialState = {
  ticket: '',
  user: '',
  error: '',
  loading: false,
  validated: false,
}

function ticketsReducer(state = initialState, action: any) {
  const { type, payload } = action

  switch (type) {
    case VALIDATE_TICKET:
      return {
        ...state,
        loading: true,
      }
    case VALIDATE_TICKET_SUCCESS:
      return {
        ...state,
        validated: true,
        ticket: payload.ticket,
        user: payload.user,
        loading: false,
      }
    case VALIDATE_TICKET_FAILURE:
      return {
        ...state,
        error: 'Ticket is invalid',
        loading: false,
      }
    default:
      return state
  }
}

export default ticketsReducer
