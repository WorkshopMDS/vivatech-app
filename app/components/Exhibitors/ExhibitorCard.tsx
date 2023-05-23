import { View, Text, Image } from 'react-native'
import styled from 'styled-components'

type Exhibitors = {
  name: string
  picture: string
  sectors: string[]
}

const Container = styled(View)`
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border}};
  border-radius: 25px;
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 150px;
  margin: 5px;
  padding: 5px;
  gap: 10px;
  flex: 1;
`
const Logo = styled(Image)`
  width: 120px;
  height: 120px;
  resize-mode: contain;
`

const Infos = styled(View)`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  gap: 5px;
`

const Title = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  flex-wrap: wrap;
  width: 100%;
  color: ${({ theme }) => theme.colors.primary}};
`

function cleanSectors(sector: string) {
  return sector.replace(/[[\]']/g, '')
}

function Card(props?: Exhibitors) {
  return (
    <Container>
      <Logo source={{ uri: props?.picture }} />
      <Infos>
        <Title>{props?.name}</Title>
        <Text>
          {props?.sectors ? cleanSectors(props?.sectors?.join('')) : ''}
        </Text>
      </Infos>
    </Container>
  )
}

export default Card
