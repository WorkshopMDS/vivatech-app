const API_URL = 'https://viva-api.fly.dev'
const ENDPOINT = '/journey'

export const getAllJourneys = () =>
  fetch(`${API_URL}${ENDPOINT}s`)
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
