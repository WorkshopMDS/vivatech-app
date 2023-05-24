import { combineReducers } from 'redux'
import ticketsReducer from './tickets.reducer'
import cvReducer from './cv.reducer'
import { conferenceReducer } from './conference.reducer'

export default combineReducers({
  tickets: ticketsReducer,
  cv: cvReducer,
  conferences: conferenceReducer,
})
