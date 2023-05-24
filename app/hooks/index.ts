import { useCallback, useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)
  const toggleValue = useCallback(() => setValue(v => !v), [])
  return [value, toggleValue] as const
}
