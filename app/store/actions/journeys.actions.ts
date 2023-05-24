import { getAllJourneys } from '../services/journeys.service'
import {
  GET_JOURNEYS,
  GET_JOURNEYS_FAILURE,
  GET_JOURNEYS_SUCCESS,
} from '../actions/types'

export const getJourneys = () => (dispatch: any) => {
  dispatch({
    type: GET_JOURNEYS,
  })

  return getAllJourneys().then(
    async data => {
      dispatch({
        type: GET_JOURNEYS_SUCCESS,
        payload: data.data,
      })

      return Promise.resolve()
    },
    error => {
      dispatch({
        type: GET_JOURNEYS_FAILURE,
        payload: error,
      })

      return Promise.reject()
    },
  )
}
