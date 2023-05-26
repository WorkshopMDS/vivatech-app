import { FlatList, Image, Pressable, Text, View } from 'react-native'
import styled from 'styled-components'
import { AntDesign } from '@expo/vector-icons'
import { useAppSelector } from '../../hooks'
import { Pill, PillText } from '../../components/Exhibitors/ExhibitorCard'
import { IInterest } from '../../components/Exhibitors/ExhibitorsView'

const Card = styled(View)`
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  margin: 4px;

  background-color: ${({ theme }) => theme.colors.card};
`

const Picture = styled(Image)`
  height: 100px;
  aspect-ratio: 1;
  resize-mode: cover;
  border-radius: 8px;
`

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 16px;
  padding-right: 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  flex: 1;
`

const Description = styled(Text)`
  font-size: 16px;
  padding: 16px;
  color: ${({ theme }) => theme.colors.text};
`

const Title = styled(Text)`
  font-size: 18px;
  font-family: Museo-700;
  color: white;
  text-align: center;
  padding: 16px;
`

const Interests = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 16px;
  padding-top: 0;
  width: 100%;
`

function JourneysListView({ navigation }: any) {
  const { journeys } = useAppSelector(state => state.journeys)
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={journeys}
      style={{ padding: 10 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            navigation.navigate('JourneyItem', { journeyId: item.id })
          }
          key={item.id}
        >
          <Card>
            <Row>
              <Picture source={{ uri: item.image }} />
              <Title>{item.title}</Title>
              <AntDesign name="right" size={24} color="white" />
            </Row>

            <Description>
              {`${item.description.substring(0, 150)}...`}
            </Description>
            <Interests>
              {item.interests.map((interest: IInterest) => (
                <Pill key={interest.id}>
                  <PillText>{interest.label}</PillText>
                </Pill>
              ))}
            </Interests>
          </Card>
        </Pressable>
      )}
    />
  )
}

export default JourneysListView
