const API_URL = 'https://viva-api.fly.dev'
const ENDPOINT = '/conference'

// Get all conferences
export const getConferenceList = () => {
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
export const getConferenceById = (id: string) => {
  return fetch(`${API_URL}${ENDPOINT}/${id}`)
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
}
