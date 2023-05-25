import AsyncStorage from '@react-native-async-storage/async-storage'
import { ADD_KYC } from '../actions/types'

const initialState = {
  userInterests: [],
  error: '',
  loading: false,
}

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
      }
    default:
      return state
  }
}

export default kycReducer
