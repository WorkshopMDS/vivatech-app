import AsyncStorage from '@react-native-async-storage/async-storage'
import { ADD_CV, UPDATE_CV, UPLOAD_CV } from './types'
import { CV } from '../reducers/cv.reducer'
import { scanCVService, uploadCVService } from '../services/cv.service'
import { changeCVService } from '../services/users.service'

export const addCV = (cv: CV) => async (dispatch: any) => {
  const cvList = await AsyncStorage.getItem('cv')

  if (cvList) {
    const cvListParsed = JSON.parse(cvList)
    cvListParsed.push(cv)
    AsyncStorage.setItem('cv', JSON.stringify(cvListParsed))
  } else {
    AsyncStorage.setItem('cv', JSON.stringify([cv]))
  }

  await scanCVService()

  dispatch({
    type: ADD_CV,
    payload: cv,
  })

  return Promise.resolve(cv)
}

export const uploadCV = (cv: string) => async (dispatch: any) => {
  dispatch({
    type: UPLOAD_CV,
  })
  uploadCVService(cv).then(async data => {
    changeCVService(data.url).then(async () => {
      const user = await AsyncStorage.getItem('user')
      const userParsed = JSON.parse(user || '{}')
      userParsed.cv = data.url
      AsyncStorage.setItem('user', JSON.stringify(userParsed))

      dispatch({
        type: UPDATE_CV,
        payload: data.url,
      })
    })

    return Promise.resolve()
  })
}
