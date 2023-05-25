const API_URL = 'https://viva-api.fly.dev'
const ENDPOINT = '/user'

export interface IInputJourney {
  journey: string
  score: number
}

export const addJourneyService = (journey: IInputJourney) =>
  fetch(`${API_URL}${ENDPOINT}/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(journey),
  })
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
