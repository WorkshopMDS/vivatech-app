import { Conference } from '../../models/ConferenceType'

const confList: Conference[] = []

export function conferenceReducer(state = confList, action: any) {
  const { type, payload } = action
  switch (type) {
    case 'ADD_CONFERENCE':
      return [...state, payload]
    case 'REMOVE_CONFERENCE':
      return state.filter(conf => conf.id !== payload)
    case 'UPDATE_CONFERENCE':
      return state.map(conf => {
        if (conf.id === payload.id) {
          return payload
        }
        return conf
      })
    default:
      return state
  }
}
