import { View, Text, Image } from 'react-native'
import styled from 'styled-components'

type Exhibitors = {
  name: string
  picture: string
  sectors: string[]
}

const Container = styled(View)`
  background: #ffffff;
  border-radius: 25px;
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 150px;
  margin: 5px;
  padding: 10px;
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

const Stand = styled(Text)`
  width: 20px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.primary}};  
  font-size: 16px;
  flex-wrap: wrap;
  color: white;
`

const Sector = styled(Text)`
  font-size: 12px;
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
        <Sector>
          {props?.sectors ? cleanSectors(props?.sectors?.join('')) : ''}
        </Sector>
      </Infos>
      <Stand>A1</Stand>
    </Container>
  )
}

export default Card
