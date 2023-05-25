import AsyncStorage from '@react-native-async-storage/async-storage'
import { updateUserKYCService } from '../services/users.service'

export const addUserKYC = (interests: string[]) => async (dispatch: any) => {
  const user = await AsyncStorage.getItem('user')
  AsyncStorage.setItem('userInterests', JSON.stringify(interests))

  if (user) {
    const userParsed = JSON.parse(user || '{}')
    userParsed.interests = interests
    AsyncStorage.setItem('user', JSON.stringify(userParsed))
    await updateUserKYCService(interests).then(() => {
      dispatch({
        type: 'ADD_KYC',
        payload: interests,
      })
    })
  } else
    dispatch({
      type: 'ADD_KYC',
      payload: interests,
    })
}

export const getUserKYC = () => async (dispatch: any) => {
  const userInterests = await AsyncStorage.getItem('userInterests')
  dispatch({ type: 'GET_KYC', payload: JSON.parse(userInterests || '[]') })
}
