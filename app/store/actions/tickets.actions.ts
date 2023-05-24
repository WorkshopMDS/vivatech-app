import { Buffer } from 'buffer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  validateCodeTicketService,
  validateTicketService,
} from '../services/tickets.service'
import {
  LOGOUT,
  VALIDATE_CODE,
  VALIDATE_CODE_SUCCESS,
  VALIDATE_TICKET,
  VALIDATE_TICKET_FAILURE,
  VALIDATE_TICKET_SUCCESS,
} from './types'

export const validateTicket = (ticket: string) => (dispatch: any) => {
  dispatch({
    type: VALIDATE_TICKET,
  })

  return validateTicketService(ticket).then(
    () => {
      AsyncStorage.setItem('ticket', ticket)
      dispatch({
        type: VALIDATE_TICKET_SUCCESS,
        payload: ticket,
      })

      return Promise.resolve()
    },
    error => {
      dispatch({
        type: VALIDATE_TICKET_FAILURE,
        payload: error,
      })

      return Promise.reject()
    },
  )
}

export const validateCode =
  (ticket: string, code: string) => (dispatch: any) => {
    dispatch({
      type: VALIDATE_CODE,
    })

    return validateCodeTicketService(ticket, code).then(
      data => {
        const decoded = Buffer.from(data.user, 'base64').toString('ascii')
        AsyncStorage.setItem('user', JSON.stringify(decoded))
        dispatch({
          type: VALIDATE_CODE_SUCCESS,
          payload: JSON.parse(decoded),
        })

        return Promise.resolve()
      },
      error => {
        console.log('error', error)
        dispatch({
          type: VALIDATE_TICKET_FAILURE,
          payload: error,
        })

        return Promise.reject()
      },
    )
  }

export const logout = () => (dispatch: any) => {
  AsyncStorage.removeItem('ticket')
  AsyncStorage.removeItem('user')
  dispatch({
    type: LOGOUT,
    payload: null,
  })
}
