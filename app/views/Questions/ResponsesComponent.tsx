import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import styled from 'styled-components'

const List = styled(View)`
  display: flex;
  gap: 10px;
`

const Option = styled(Pressable)`
  text-align: center;
  border-radius: ${({ theme }) => theme.roundness};
  overflow: hidden;
`

const Default = styled(Text)`
  background-color: white;
  padding: 15px;
  font-size: 18px;
  border-width: 2px;
  border-color: ${(props: any) =>
    // eslint-disable-next-line no-nested-ternary
    props.isCorrect === null ? 'white' : props.isCorrect ? 'green' : 'red'};
`

const Selected = styled(Default)`
  background-color: ${({ theme }) => theme.colors.orange};
  color: white;
  font-weight: bold;
  border-color: ${(props: any) =>
    // eslint-disable-next-line no-nested-ternary
    props.isCorrect === null
      ? 'white'
      : props.isCorrect
      ? 'green'
      : ({ theme }) => theme.colors.orange};
`

function ReponsesComponent({ data, setSelected, isBlocked, ...rest }: any) {
  const [selectedOptions, setSelectedOptions] = useState<any>([])

  const selectHandler = (value: any) => {
    if (isBlocked) return
    let options = []
    if (selectedOptions.includes(value)) {
      options = selectedOptions.filter(v => v !== value)
    } else {
      options = [...selectedOptions, value]
    }
    setSelectedOptions(options)
    setSelected(options)
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <List {...rest}>
      {data.answers.map((item: any) => (
        <Option onPress={() => selectHandler(item.value)} key={item.value}>
          {selectedOptions.includes(item.value) ? (
            <Selected
              isCorrect={
                isBlocked && data.correctAnswers.includes(item.value) ? 1 : null
              }
            >
              {item.description}
            </Selected>
          ) : (
            <Default
              isCorrect={
                isBlocked ? data.correctAnswers.includes(item.value) : null
              }
            >
              {item.description}
            </Default>
          )}
        </Option>
      ))}
    </List>
  )
}

export default ReponsesComponent
