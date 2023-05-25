import { Buffer } from 'buffer'
import { getAccessToken } from '../../utils/auth'

const API_URL = 'https://viva-api.fly.dev'
const ENDPOINT = '/user'

export interface IInputJourney {
  journey: string
  score: number
}

export const changeCVService = async (cv: string) => {
  const accessToken = await getAccessToken()
  fetch(`${API_URL}${ENDPOINT}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ cv }),
  })
    .then(response => response.json())
    .then(response => {
      if (response.data) {
        return response.data
      }
      return Promise.reject()
    })
    .catch(error => {
      console.log('error', error)
      return Promise.reject(error)
    })
}

export const addJourneyService = async (journey: IInputJourney) => {
  const accessToken = await getAccessToken()
  if (!accessToken) {
    return
  }
  const parts: string[] = accessToken
    .split('.')
    .map(part =>
      Buffer.from(
        part.replace(/-/g, '+').replace(/_/g, '/'),
        'base64',
      ).toString(),
    )
  const token = JSON.parse(parts[1])

  fetch(`${API_URL}${ENDPOINT}/${token.id}/journeys`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ journeys: [journey] }),
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
}
