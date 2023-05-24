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
  background-color: #ffffff;
  padding: 15px;
  font-size: 18px;
`

const Selected = styled(Default)`
  background-color: ${({ theme }) => theme.colors.orange};
  color: #ffffff;
  font-weight: bold;
`

function RadioButton({ data, onSelect, ...rest }: any) {
  const [userOption, setUserOption] = useState(null)

  const selectHandler = (value: any) => {
    onSelect(value)
    setUserOption(value)
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <List {...rest}>
      {data.map((item: any) => (
        <Option onPress={() => selectHandler(item.value)} key={item.key}>
          {item.value === userOption ? (
            <Selected>{item.value}</Selected>
          ) : (
            <Default>{item.value}</Default>
          )}
        </Option>
      ))}
    </List>
  )
}

export default RadioButton
