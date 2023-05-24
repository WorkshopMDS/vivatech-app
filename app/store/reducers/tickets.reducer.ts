import {
  VALIDATE_TICKET,
  VALIDATE_TICKET_FAILURE,
  VALIDATE_TICKET_SUCCESS,
  VALIDATE_CODE_SUCCESS,
  VALIDATE_CODE_FAILURE,
} from '../actions/types'

const initialState = {
  ticket: '',
  user: '',
  error: '',
  loading: false,
  validated: false,
  codeSent: false,
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
        ticket: payload,
        codeSent: true,
      }
    case VALIDATE_TICKET_FAILURE:
      return {
        ...state,
        error: 'Ticket is invalid',
        loading: false,
      }
    case VALIDATE_CODE_SUCCESS:
      return {
        ...state,
        user: payload,
        validated: true,
        codeSent: false,
      }
    case VALIDATE_CODE_FAILURE:
      return {
        ...state,
        error: 'Code is invalid',
        loading: false,
      }
    default:
      return state
  }
}

export default ticketsReducer
