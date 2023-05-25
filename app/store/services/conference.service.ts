const API_URL = 'https://viva-api.fly.dev'
const ENDPOINT = '/conference'

// Get all conferences
export const getConferencesService = () => {
  return fetch(`${API_URL}${ENDPOINT}s`)
    .then(response => response.json())
    .then(response => {
      if (response) {
        return response
      }
      return Promise.reject()
    })
    .catch(error => {
      console.error('error', error)
      return Promise.reject(error)
    })
}

// Get conference by id
export const getConferenceByIdService = (id: string) => {
  return fetch(`${API_URL}${ENDPOINT}/${id}`)
    .then(response => response.json())
    .then(response => {
      if (response) {
        return response
      }
      return Promise.reject()
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
