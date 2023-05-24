import { ADD_CV } from '../actions/types'

interface CV {
  name: string
  lastName: string
  email: string
  phone: string
  cv: string
}

interface CVState {
  cvs: CV[]
}

const initialState: CVState = {
  cvs: [],
}

function cvReducer(state = initialState, action: any) {
  const { type, payload } = action

  switch (type) {
    case ADD_CV:
      return {
        ...state,
        cvs: [...state.cvs, payload],
      }
    default:
      return state
  }
}

export default cvReducer
