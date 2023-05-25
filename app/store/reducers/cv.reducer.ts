import AsyncStorage from '@react-native-async-storage/async-storage'
import { ADD_CV } from '../actions/types'

export interface CV {
  firstname: string
  lastname: string
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

const fetchLocalData = async () => {
  try {
    const cvs = await AsyncStorage.getItem('cv')
    if (cvs !== null) {
      initialState.cvs = JSON.parse(cvs)
    }
  } catch (e) {
    console.log(e)
  }
}

fetchLocalData()

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
