import { combineReducers } from 'redux'
import ticketsReducer from './tickets.reducer'
import { conferenceReducer } from './conference.reducer'

export default combineReducers({
  tickets: ticketsReducer,
  conferences: conferenceReducer,
})
