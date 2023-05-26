import { combineReducers } from 'redux'
import ticketsReducer from './tickets.reducer'
import cvReducer from './cv.reducer'
import interestsReducer from './interests.reducer'
import exhibitorsReducer from './exhibitors.reducer'
import journeysReducer from './journeys.reducer'
import conferencesReducer from './conferences.reducer'
import kycReducer from './kyc.reducer'

export default combineReducers({
  tickets: ticketsReducer,
  cv: cvReducer,
  interests: interestsReducer,
  exhibitors: exhibitorsReducer,
  journeys: journeysReducer,
  conferences: conferencesReducer,
  kyc: kycReducer,
})
