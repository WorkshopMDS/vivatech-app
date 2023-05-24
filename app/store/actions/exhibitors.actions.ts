import AsyncStorage from '@react-native-async-storage/async-storage'
import { getExhibitorsService } from '../services/exhibitors.service'
import {
  GET_EXHIBITORS,
  GET_EXHIBITORS_SUCCESS,
  GET_EXHIBITORS_FAILURE,
} from '../actions/types'

const HALLS = ['Hall 1', 'Hall 2', 'Hall 3']

export const getExhibitors = () => (dispatch: any) => {
  dispatch({
    type: GET_EXHIBITORS,
  })

  return getExhibitorsService().then(
    async data => {
      const mapped = data.map((exhibitor: any) => {
        const newExhibitor = { ...exhibitor }
        newExhibitor.hall = HALLS[Math.floor(Math.random() * HALLS.length)]
        newExhibitor.stand = Math.floor(Math.random() * 250)
        return newExhibitor
      })

      AsyncStorage.setItem('exhibitors', JSON.stringify(mapped))

      dispatch({
        type: GET_EXHIBITORS_SUCCESS,
        payload: mapped,
      })

      return Promise.resolve()
    },
    error => {
      dispatch({
        type: GET_EXHIBITORS_FAILURE,
        payload: error,
      })

      return Promise.reject()
    },
  )
}
