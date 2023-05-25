import {
  ADD_USERS_JOURNEYS,
  ADD_USERS_JOURNEYS_ERROR,
  ADD_USERS_JOURNEYS_SUCCESS,
} from './types'
import { addJourneyService, IInputJourney } from '../services/users.services'

export const addJourney = (journey: IInputJourney) => (dispatch: any) => {
  dispatch({
    type: ADD_USERS_JOURNEYS,
  })

  return addJourneyService(journey).then(
    () => {
      dispatch({
        type: ADD_USERS_JOURNEYS_SUCCESS,
        payload: journey,
      })

      return Promise.resolve()
    },
    error => {
      dispatch({
        type: ADD_USERS_JOURNEYS_ERROR,
        payload: error,
      })

      return Promise.reject()
    },
  )
}
