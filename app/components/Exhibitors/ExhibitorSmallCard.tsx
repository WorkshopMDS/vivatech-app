import { View, Text, Image } from 'react-native'
import styled from 'styled-components'
import { IExhibitor } from './ExhibitorsView'

const Container = styled(View)`
  background: ${({ theme }) => theme.colors.card}};
  border-radius: 16px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 4px 12px;
  gap: 10px;
  width: 150px;
  aspect-ratio: 1;
`
const Logo = styled(Image)`
  aspect-ratio: 1;
  height: 100%;
  flex: 1;
  resize-mode: contain;
  background: white;
  border-radius: 13px;
`

const Infos = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0 16px 16px

  gap: 5px;
`

const Title = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  flex-wrap: wrap;
  width: 100%;
  color: ${({ theme }) => theme.colors.primary1000}};
`

const Label = styled(View)`
background: ${({ theme }) => theme.colors.primary}};

  border-radius: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  heigh: 20px;
  overflow: hidden;
  flex: 1;
`

const Col = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  heigh: 20px;
  overflow: hidden;
  width: 50%;
`

const Stand = styled(Text)`
  font-size: 32px;
  color: white;
  font-family: Museo-700;
  text-align: center;
  padding: 0 10px;
`

const Hall = styled(Text)`
  font-size: 16px;
  color: white;
  font-family: Museo-100;
  text-align: center;
`

const Header = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  gap: 5px;
  justify-content: space-between;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary}};
  border-radius: 16px;
  
  padding:4px;
`

const Sectors = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
  flex: 1;
`

export const Pill = styled(View)`
  background: ${({ theme }) => theme.colors.orange}};
  border-radius: 16px;
  padding: 2px 8px;
  height: 16px;

`

export const PillText = styled(Text)`
  font-size: 12px;
  color: white;
  font-family: Museo-700;
  text-align: center;
`

function cleanSectors(sector: string) {
  return sector.replace(/[[\]']/g, '')
}

function SmallCard({ exhibitor }: { exhibitor: IExhibitor }) {
  const { name, picture, hall, stand, sectors } = exhibitor
  const mappedSectors = sectors
    .map(sector => cleanSectors(sector))
    .join(',')
    .split(',') as string[]

  return (
    <Container>
      <Header>
        <Label>
          <Logo source={{ uri: picture }} />

          <Col>
            <Hall>{hall}</Hall>

            <Stand>{stand}</Stand>
          </Col>
        </Label>
      </Header>
      <Infos>
        <Title>{name}</Title>
        <Sectors>
          <Pill>
            <PillText>{mappedSectors[0]}</PillText>
          </Pill>
        </Sectors>
      </Infos>
    </Container>
  )
}

export default SmallCard
