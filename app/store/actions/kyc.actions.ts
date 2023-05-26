import AsyncStorage from '@react-native-async-storage/async-storage'
import { updateUserKYCService } from '../services/users.service'
import { ADD_KYC } from './types'

export const addUserKYC = (interests: string[]) => async (dispatch: any) => {
  AsyncStorage.setItem('userFilledKYC', 'true')
  const user = await AsyncStorage.getItem('user')
  AsyncStorage.setItem('userInterests', JSON.stringify(interests))

  // set to false, to be called when QR code is scanned on login
  if (user && false) {
    const userParsed = JSON.parse(user || '{}')
    userParsed.interests = interests
    AsyncStorage.setItem('user', JSON.stringify(userParsed))
    await updateUserKYCService(interests).then(() => {
      dispatch({
        type: ADD_KYC,
        payload: interests,
      })
    })
  } else
    dispatch({
      type: ADD_KYC,
      payload: interests,
    })
}

export const getUserKYC = () => async (dispatch: any) => {
  const userInterests = await AsyncStorage.getItem('userInterests')
  dispatch({ type: 'GET_KYC', payload: JSON.parse(userInterests || '[]') })
}
