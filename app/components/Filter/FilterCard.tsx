import { View, Text } from 'react-native'
import styled from 'styled-components'

type ExhibitorsFilter = {
  interests: string
}

const Container = styled(View)`
  background: #ffffff;
  border-radius: 24px;
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 80px;
  margin: 5px;
  width: 100%;
  padding: 5px;
  gap: 10px;
  flex: 1;
`

const Interest = styled(Text)`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  flex-wrap: wrap;
  width: 100%;
  color: ${({ theme }) => theme.colors.primary}};
`

function Card(props?: ExhibitorsFilter) {
  return (
    <Container>
      <Interest>{props?.interests}</Interest>
    </Container>
  )
}

export default Card
