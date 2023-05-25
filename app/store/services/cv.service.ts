import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAccessToken } from '../../utils/auth'

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dlrfnsmnp/upload'
const API_URL = 'https://viva-api.fly.dev'
const ENDPOINT = '/user'

export const uploadCVService = (base64Pdf: string) =>
  fetch(CLOUDINARY_URL, {
    method: 'POST',
    body: JSON.stringify({
      file: base64Pdf,
      upload_preset: 'ml_default',
    }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(res => {
      return res.json()
    })
    .catch(err => {
      console.log(err)
    })

export const scanCVService = async () => {
  const cvScanned = JSON.parse((await AsyncStorage.getItem('cv')) || '[]')

  const accessToken = await getAccessToken()
  const body = JSON.stringify({
    cvScanned,
  })

  fetch(`${API_URL}${ENDPOINT}`, {
    method: 'PATCH',
    body,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(res => {
      return res.json()
    })
    .catch(err => {
      return err
    })
}
