import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text as ReactText,
  TouchableHighlight,
  View,
} from 'react-native'
import styled from 'styled-components'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useAppSelector } from '../../hooks'
import { Text } from '../../components/Text'

const styles = StyleSheet.create({
  h1: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 25,
    marginTop: 10,
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#808080',
  },
  ctaText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 25,
  },
})

const TopImage = styled(Image)`
  border-bottom-right-radius: 150px;
  width: 100%;
  height: 200px;
  resize-mode: cover;
`

const Block = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #ffffff;
  width: 49%;
  padding: 10px;
  border-radius: ${({ theme }) => theme.roundness};
  align-items: center;
`

const Button = styled(Pressable)`
  position: absolute;
`

const CTA = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: ${({ theme }) => theme.roundness};
  background-color: ${({ theme }) => theme.colors.orange};
  padding: 15px;
`

function JourneyItemView({ route, navigation }: any): any {
  const { journeyId } = route.params
  const { journeys } = useAppSelector(state => state.journeys)
  const journey = journeys.find(item => item.id === journeyId)
  const stands = journey?.questions.map(question => question.stand)
  const uniqueStands = [...new Set(stands)]

  if (!journey) {
    navigation.goBack()
  }

  return (
    journey && (
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ position: 'relative' }}>
          <TopImage source={{ uri: journey.image }} />
          <Button
            onPress={() => navigation.goBack()}
            style={{
              top: 10,
              left: 10,
            }}
          >
            <View
              style={{
                borderRadius: 50,
                padding: 10,
              }}
            >
              <Ionicons name="arrow-back" size={30} color="white" />
            </View>
          </Button>
        </View>
        <View style={{ padding: 15 }}>
          <Text style={styles.h1}>{journey.title}</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <Block>
              <Ionicons name="time" size={24} color="black" />
              <View>
                <ReactText>Durée</ReactText>
                <ReactText style={{ fontWeight: 'bold' }}>
                  {journey.duration} min
                </ReactText>
              </View>
            </Block>
            <Block>
              <MaterialIcons name="place" size={24} color="black" />
              <View>
                <ReactText>Stands</ReactText>
                <ReactText style={{ fontWeight: 'bold' }}>
                  {uniqueStands.length}
                </ReactText>
              </View>
            </Block>
          </View>
          <TouchableHighlight
            onPress={() =>
              navigation.navigate('TutorialQuestionView', { journeyId })
            }
            style={{ marginBottom: 40 }}
          >
            <CTA>
              <Ionicons name="play" size={24} color="white" />
              <Text style={styles.ctaText}>Lancer ce parcours</Text>
            </CTA>
          </TouchableHighlight>
          <Text style={styles.h2}>Description</Text>
          <Text style={styles.description}>{journey.description}</Text>
        </View>
      </ScrollView>
    )
  )
}

export default JourneyItemView
