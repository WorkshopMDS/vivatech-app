import { Buffer } from 'buffer'
import {
  validateCodeTicketService,
  validateTicketService,
} from '../services/tickets.service'
import {
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
