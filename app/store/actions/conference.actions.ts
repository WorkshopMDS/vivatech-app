import AsyncStorage from '@react-native-async-storage/async-storage'
import { getConferencesService } from '../services/conference.service'
import {
  GET_CONFERENCE,
  GET_CONFERENCE_SUCCESS,
  GET_CONFERENCE_FAILURE,
} from '../actions/types'

export const getConferences = () => (dispatch: any) => {
  dispatch({
    type: GET_CONFERENCE,
  })

  return getConferencesService().then(
    async data => {
      await AsyncStorage.setItem(
        'conferences',
        JSON.stringify(
          data.data.sort((a: any, b: any) => {
            return new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
          }),
        ),
      )
      dispatch({
        type: GET_CONFERENCE_SUCCESS,
        payload: data.data.sort((a: any, b: any) => {
          return new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
        }),
      })

      return Promise.resolve()
    },
    error => {
      dispatch({
        type: GET_CONFERENCE_FAILURE,
        payload: error,
      })

      return Promise.reject()
    },
  )
}
