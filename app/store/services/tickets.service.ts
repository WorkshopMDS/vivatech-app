const API_URL = 'https://viva-api.fly.dev'
const ENDPOINT = '/ticket'

export const validateTicketService = (ticket: string) =>
  fetch(`${API_URL}${ENDPOINT}/validation/${ticket}`)
    .then(response => response.json())
    .then(response => {
      if (response) {
        return response
      }
      return Promise.reject()
    })
    .catch(error => {
      console.log('error', error)
      return Promise.reject(error)
    })

export const validateCodeTicketService = (ticket: string, code: string) =>
  fetch(`${API_URL}${ENDPOINT}/code/${ticket}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  })
    .then(response => response.json())
    .then(response => {
      if (response.data) {
        return response.data
      }
      return Promise.reject(new Error("Le code n'est pas valide"))
    })
    .catch(error => {
      console.log('error', error)
      return Promise.reject(error)
    })
