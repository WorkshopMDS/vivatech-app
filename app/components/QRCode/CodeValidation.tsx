import { useState, useRef } from 'react'
import {
  View,
  ActivityIndicator,
  Alert,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native'

import _ from 'lodash'
import styled from 'styled-components'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { validateCode } from '../../store/actions/tickets.actions'

const Input = styled(BottomSheetTextInput)`
  background-color: white;
  width: 40px;
  height: 60px;
  margin: 5px;
  border-radius: 8px;
  text-align: center;
  font-size: 24px;
  font-family: Museo-700;
`

function CodeValidation({ setHasScanned }: any) {
  const [inputs, setInputs] = useState(['', '', '', '', '', ''])
  const dispatch = useAppDispatch()
  const inputsRefs = [
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
  ]
  const [inputLoading, setInputLoading] = useState(false)
  const { ticket } = useAppSelector(state => state.tickets)

  const handleCodeValidation = async (input: string[]) => {
    setInputLoading(true)
    const code = input.join('')
    try {
      await dispatch(validateCode(ticket, code))
      setHasScanned(false)
    } catch (error) {
      setInputs(['', '', '', '', '', ''])
      Alert.alert('Erreur', "Le code inséré n'est pas valide")
    }
    setInputLoading(false)
  }

  const updateInputs = (index: number, value: string) => {
    const newInputs = [...inputs]
    newInputs[index] = value
    setInputs(newInputs)
    if (index === 5 && value !== '') {
      handleCodeValidation(newInputs)
    }
  }

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (event.nativeEvent.key !== 'Backspace') {
      if (index < inputs.length - 1 && inputsRefs[index + 1].current) {
        inputsRefs[index + 1].current!.focus()
      }
    } else if (index > 0 && inputsRefs[index - 1].current) {
      inputsRefs[index - 1].current!.focus()
      updateInputs(index - 1, '')
    } else {
      updateInputs(index, '')
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      {inputLoading && <ActivityIndicator size="large" color="white" />}
      {!inputLoading &&
        _.times(6, index => (
          <Input
            key={index}
            value={inputs[index]}
            onFocus={() => updateInputs(index, '')}
            keyboardType="number-pad"
            maxLength={1}
            ref={inputsRefs[index]}
            autoFocus={index === 0}
            onChange={e => updateInputs(index, e.nativeEvent.text)}
            onKeyPress={e => handleKeyPress(e, index)}
          />
        ))}
    </View>
  )
}

export default CodeValidation
