import { ADD_CV } from './types'

export const addCV =
  (cv: {
    name: string
    lastName: string
    email: string
    phone: string
    cv: string
  }) =>
  (dispatch: any) => {
    dispatch({
      type: ADD_CV,
      payload: cv,
    })

    return Promise.resolve(cv)
  }
