import { combineReducers } from 'redux'
import ticketsReducer from './tickets.reducer'
import interestsReducer from './interests.reducer'
import exhibitorsReducer from './exhibitors.reducer'

export default combineReducers({
  tickets: ticketsReducer,
  interests: interestsReducer,
  exhibitors: exhibitorsReducer,
})
