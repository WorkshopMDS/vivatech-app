import { View, Text, Image } from 'react-native'
import styled from 'styled-components'
import { IExhibitor } from './ExhibitorsView'

const Container = styled(View)`
  background: ${({ theme }) => theme.colors.card}};
  border-radius: 16px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 8px 12px;
  gap: 8px;
  flex: 1;
`
const Logo = styled(Image)`
  aspect-ratio: 1;
  height: 100%;
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
  flex: 1;
  gap: 5px;
`

const Title = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  flex-wrap: wrap;
  margin: 8px 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.primary1000}};
`

const Label = styled(View)`
background: ${({ theme }) => theme.colors.primary}};
  flex:1;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 0 10px;
`

const Stand = styled(Text)`
  font-size: 48px;
  color: white;
  font-family: Museo-700;
  text-align: center;
`

const Hall = styled(Text)`
  font-size: 48px;
  color: white;
  font-family: Museo-100;
  text-align: center;
`

const Header = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  gap: 5px;
  justify-content: space-between;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary}};
  border-radius: 16px;
  height: 48px;
  padding:2px;
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

function Card({ exhibitor }: { exhibitor: IExhibitor }) {
  const { name, picture, hall, stand, sectors } = exhibitor
  const mappedSectors = sectors
    .map(sector => cleanSectors(sector))
    .join(',')
    .split(',') as string[]

  return (
    <Container>
      <Header>
        <Logo source={{ uri: picture }} />

        <Label>
          <Hall>{hall}</Hall>

          <Stand>{stand}</Stand>
        </Label>
      </Header>
      <Infos>
        <Title>{name}</Title>
        <Sectors>
          {mappedSectors.map((sector, index) => (
            <Pill key={index}>
              <PillText>{sector}</PillText>
            </Pill>
          ))}
        </Sectors>
      </Infos>
    </Container>
  )
}

export default Card
