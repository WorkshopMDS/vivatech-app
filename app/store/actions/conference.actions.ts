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
      dispatch({
        type: GET_CONFERENCE_SUCCESS,
        payload: data.data,
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
