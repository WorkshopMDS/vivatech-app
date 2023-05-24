import AsyncStorage from '@react-native-async-storage/async-storage'
import { ADD_CV } from './types'
import { CV } from '../reducers/cv.reducer'

export const addCV = (cv: CV) => async (dispatch: any) => {
  const cvList = await AsyncStorage.getItem('cv')

  if (cvList) {
    const cvListParsed = JSON.parse(cvList)
    cvListParsed.push(cv)
    AsyncStorage.setItem('cv', JSON.stringify(cvListParsed))
  } else {
    AsyncStorage.setItem('cv', JSON.stringify([cv]))
  }

  dispatch({
    type: ADD_CV,
    payload: cv,
  })

  return Promise.resolve(cv)
}
