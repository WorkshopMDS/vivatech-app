import { getAccessToken } from '../../utils/auth'

const API_URL = 'https://viva-api.fly.dev'
const ENDPOINT = '/user'

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
