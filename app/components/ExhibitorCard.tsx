import { View, Text, Image } from 'react-native'
import styled from 'styled-components'

type Exhibitors = {
  name: string
  interest: string[]
  sectors: string[]
  logo: string
}

const Container = styled(View)`
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 10px;
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
`
const Interest = styled(Text)`
  font-size: 16px;
  flex-wrap: wrap;
  width: 100%;
`

const Sectors = styled(Text)`
  font-size: 16px;
  flex-wrap: wrap;
  width: 100%;
`

function Card(props: Exhibitors) {
  return (
    <Container>
      <Logo source={{ uri: props?.logo }} />
      <Infos>
        <Title>{props?.name}</Title>
        <Interest>Interêts: {props?.interest?.join(' - ')}</Interest>
        <Sectors>
          Secteur d&apos;activités:{props?.sectors?.join(' - ')}
        </Sectors>
      </Infos>
    </Container>
  )
}

export default Card

/**
 *   <Interest>Interêts: {props?.interest?.join(' - ')}</Interest>
        <Sectors>Secteur d'activités:{props?.sectors?.join(' - ')}</Sectors>
 */
