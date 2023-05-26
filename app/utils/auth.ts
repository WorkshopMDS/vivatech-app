import AsyncStorage from '@react-native-async-storage/async-storage'

const API_URL = 'https://viva-api.fly.dev'

export const getAccessToken = async () => {
  const accessToken = await AsyncStorage.getItem('access')
  const refreshToken = await AsyncStorage.getItem('refresh')

  if (!accessToken || !refreshToken) {
    return
  }

  return fetch(`${API_URL}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => {
      if (response.status === 401) {
        fetch(`${API_URL}/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
          },
        })
          .then(res => {
            if (res.status === 200) {
              return res.json()
            }
            return Promise.reject()
          })
          .then(r => {
            AsyncStorage.setItem('access', r.access)
            AsyncStorage.setItem('refresh', r.refresh)
          })
      }
    })
    .then(async () => {
      const newToken = await AsyncStorage.getItem('access')
      return newToken
    })
}
