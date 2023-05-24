import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  VALIDATE_TICKET,
  VALIDATE_TICKET_FAILURE,
  VALIDATE_TICKET_SUCCESS,
  VALIDATE_CODE_SUCCESS,
  VALIDATE_CODE_FAILURE,
  LOGOUT,
} from '../actions/types'

const initialState = {
  ticket: '',
  user: {},
  error: '',
  loading: false,
  validated: false,
  codeSent: false,
}

const fetchTicketData = async () => {
  try {
    const ticket = await AsyncStorage.getItem('ticket')
    if (ticket !== null) {
      initialState.ticket = ticket
    }
  } catch (e) {
    console.log(e)
  }
}

fetchTicketData()

const fetchUserData = async () => {
  try {
    const user = await AsyncStorage.getItem('user')
    if (user !== null) {
      const jsonUser = JSON.parse(user)
      initialState.user = JSON.parse(jsonUser)
    }
  } catch (e) {
    console.log(e)
  }
}

fetchUserData()

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
    case LOGOUT:
      return {
        ...state,
        ticket: '',
        user: {},
        error: '',
        loading: false,
        validated: false,
        codeSent: false,
      }
    default:
      return state
  }
}

export default ticketsReducer
