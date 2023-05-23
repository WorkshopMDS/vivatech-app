import axios from 'axios'

const API_URL = 'https://viva-api.fly.dev'
const ENDPOINT = '/ticket'

export const validateTicketService = (ticket: string) =>
  axios
    .get(`${API_URL + ENDPOINT}/validation/${ticket}`)
    .then(response => {
      if (response.data) {
        return {
          ticket,
          user: response.data.data.user,
        }
      }
      return Promise.reject()
    })
    .catch(error => {
      console.log(API_URL + ENDPOINT)
      console.log(error)
      return Promise.reject(error)
    })
