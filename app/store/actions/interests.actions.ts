import AsyncStorage from '@react-native-async-storage/async-storage'
import { getInterestsService } from '../services/interests.service'
import {
  GET_INTERESTS,
  GET_INTERESTS_SUCCESS,
  GET_INTERESTS_FAILURE,
} from '../actions/types'

export const getInterests = () => (dispatch: any) => {
  dispatch({
    type: GET_INTERESTS,
  })

  return getInterestsService().then(
    async data => {
      AsyncStorage.setItem('interests', JSON.stringify(data))
      dispatch({
        type: GET_INTERESTS_SUCCESS,
        payload: data,
      })

      return Promise.resolve()
    },
    error => {
      dispatch({
        type: GET_INTERESTS_FAILURE,
        payload: error,
      })

      return Promise.reject()
    },
  )
}
