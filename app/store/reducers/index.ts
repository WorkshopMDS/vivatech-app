import { combineReducers } from 'redux'
import ticketsReducer from './tickets.reducer'
import cvReducer from './cv.reducer'

export default combineReducers({
  tickets: ticketsReducer,
  cv: cvReducer,
})
