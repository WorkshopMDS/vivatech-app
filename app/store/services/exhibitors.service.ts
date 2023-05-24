const API_URL = 'https://viva-api.fly.dev'
const ENDPOINT = '/exhibitors'

export const getExhibitorsService = () =>
  fetch(`${API_URL}${ENDPOINT}`)
    .then(response => response.json())
    .then(response => {
      if (response.data) {
        return response.data
      }
      return Promise.reject()
    })
    .catch(error => {
      console.log(error)
      return Promise.reject(error)
    })
