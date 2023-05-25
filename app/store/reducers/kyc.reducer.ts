import AsyncStorage from '@react-native-async-storage/async-storage'
import { ADD_KYC } from '../actions/types'

const initialState = {
  userInterests: [],
  error: '',
  loading: false,
  isFilled: false,
}

const fetchIsFilled = async () => {
  try {
    const isFilled = await AsyncStorage.getItem('userFilledKYC')
    if (isFilled !== null) {
      initialState.isFilled = JSON.parse(isFilled)
    }
  } catch (e) {
    console.log(e)
  }
}

fetchIsFilled()

const fetchUserInterests = async () => {
  try {
    const userInterests = await AsyncStorage.getItem('userInterests')
    if (userInterests !== null) {
      initialState.userInterests = JSON.parse(userInterests)
    }
  } catch (e) {
    console.log(e)
  }
}

fetchUserInterests()

function kycReducer(state = initialState, action: any) {
  const { type, payload } = action

  switch (type) {
    case ADD_KYC:
      return {
        ...state,
        userInterests: payload,
        isFilled: true,
      }
    case 'GET_KYC':
      return {
        ...state,
        userInterests: payload,
        loading: true,
      }
    default:
      return state
  }
}

export default kycReducer
