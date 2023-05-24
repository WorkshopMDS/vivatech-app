import { combineReducers } from 'redux'
import ticketsReducer from './tickets.reducer'
import cvReducer from './cv.reducer'
import interestsReducer from './interests.reducer'
import exhibitorsReducer from './exhibitors.reducer'
import conferencesReducer from './conferences.reducer'

export default combineReducers({
  tickets: ticketsReducer,
  cv: cvReducer,
  interests: interestsReducer,
  exhibitors: exhibitorsReducer,
  conferences: conferencesReducer,
})
