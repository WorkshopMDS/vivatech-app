import { Pressable, Text, View } from 'react-native'
import styled from 'styled-components'

const List = styled(View)`
  display: flex;
  gap: 10px;
`

const Option = styled(Pressable)`
  text-align: center;
  border-radius: 160px;
  overflow: hidden;
`

const Default = styled(Text)<{
  isCorrect?: boolean
  isBlocked?: boolean
  isSelected?: boolean
}>`
  background-color: ${({ theme, isCorrect, isSelected, isBlocked }) => {
    if (isBlocked) {
      if (isSelected) {
        return theme.colors.primary
      }
      return theme.colors.card
    }
    if (isCorrect) {
      return 'green'
    }
    return '#d3d3d34d'
  }};
  color: ${({ theme, isBlocked, isCorrect, isSelected }) => {
    if (!isBlocked && isCorrect) {
      return 'white'
    }

    if (isBlocked && isSelected) {
      return 'white'
    }
    return theme.colors.text
  }};
  text-align: center;
  padding: 15px;
  font-size: 18px;
`

function ResponsesComponent({
  data,
  selected,
  setSelected,
  isBlocked,
  ...rest
}: any) {
  const selectHandler = (value: any) => {
    if (!isBlocked) return
    let options = []
    if (selected.includes(value)) {
      options = selected.filter(v => v !== value)
    } else {
      options = [...selected, value]
    }
    setSelected(options)
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <List {...rest}>
      {data.answers.map((item: any) => (
        <Option onPress={() => selectHandler(item.value)} key={item.value}>
          <Default
            isCorrect={data.correctAnswers.includes(item.value)}
            isBlocked={isBlocked}
            isSelected={selected.includes(item.value)}
          >
            {item.description}
          </Default>
        </Option>
      ))}
    </List>
  )
}

export default ResponsesComponent
