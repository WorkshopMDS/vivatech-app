import { getExhibitorsService } from '../services/exhibitors.service'
import {
  GET_EXHIBITORS,
  GET_EXHIBITORS_SUCCESS,
  GET_EXHIBITORS_FAILURE,
} from '../actions/types'

export const getExhibitors = () => (dispatch: any) => {
  dispatch({
    type: GET_EXHIBITORS,
  })

  return getExhibitorsService().then(
    async data => {
      dispatch({
        type: GET_EXHIBITORS_SUCCESS,
        payload: data,
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
