import { Buffer } from 'buffer'
import { validateTicketService } from '../services/tickets.service'
import {
  VALIDATE_TICKET,
  VALIDATE_TICKET_FAILURE,
  VALIDATE_TICKET_SUCCESS,
} from './types'

export const validateTicket = (ticket: string) => (dispatch: any) => {
  dispatch({
    type: VALIDATE_TICKET,
  })

  return validateTicketService(ticket).then(
    async data => {
      const decodedUser = await Buffer.from(data.user, 'base64').toString(
        'ascii',
      )
      dispatch({
        type: VALIDATE_TICKET_SUCCESS,
        payload: {
          ticket: data.ticket,
          user: JSON.parse(decodedUser),
        },
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
