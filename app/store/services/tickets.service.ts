const API_URL = 'https://viva-api.fly.dev'
const ENDPOINT = '/ticket'

export const validateTicketService = (ticket: string) =>
  fetch(`${API_URL}${ENDPOINT}/validation/${ticket}`)
    .then(response => response.json())
    .then(response => {
      if (response.data) {
        return {
          ticket,
          user: response.data.user,
        }
      }
      return Promise.reject()
    })
    .catch(error => {
      console.log(error)
      return Promise.reject(error)
    })
