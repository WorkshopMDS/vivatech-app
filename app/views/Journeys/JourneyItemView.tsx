import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import styled from 'styled-components'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useAppSelector } from '../../hooks'
import { Text } from '../../components/Text'
import { useCustomTheme } from '../../utils/Theme'

const TopImage = styled(Image)`
  border-bottom-right-radius: 64px;
  width: 100%;
  height: 200px;
  resize-mode: cover;
`

const Block = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.card};
  width: 49%;
  padding: 10px;
  border-radius: 16px;
  align-items: center;
`

const Button = styled(Pressable)`
  position: absolute;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.orange};
`

const CTA = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.orange};
  padding: 15px;
`

const BlockText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`

function JourneyItemView({ route, navigation }: any): any {
  const { journeyId } = route.params
  const { journeys } = useAppSelector(state => state.journeys)
  const journey = journeys.find(item => item.id === journeyId)
  const stands = journey?.questions.map(question => question.stand)
  const uniqueStands = [...new Set(stands)]

  const { colors } = useCustomTheme()

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
      color: colors.text,
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

  if (!journey) {
    navigation.goBack()
  }

  return (
    journey && (
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
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
              <Ionicons name="time" size={24} color={colors.text} />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                }}
              >
                <BlockText>Durée :</BlockText>
                <BlockText style={{ fontWeight: 'bold' }}>
                  {journey.duration} min
                </BlockText>
              </View>
            </Block>
            <Block>
              <MaterialIcons name="place" size={24} color={colors.text} />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <BlockText>
                  Stand{uniqueStands.length > 1 ? 's' : ''} à visiter :{' '}
                </BlockText>
                <BlockText style={{ fontWeight: 'bold' }}>
                  {uniqueStands.length}
                </BlockText>
              </View>
            </Block>
          </View>
          <Pressable
            onPress={() =>
              navigation.navigate('TutorialQuestionView', { journeyId })
            }
            style={{ marginBottom: 40 }}
          >
            <CTA>
              <Ionicons name="play" size={24} color="white" />
              <Text style={styles.ctaText}>Lancer ce parcours</Text>
            </CTA>
          </Pressable>
          <Text style={styles.h2}>Description</Text>
          <Text style={styles.description}>{journey.description}</Text>
        </View>
      </ScrollView>
    )
  )
}

export default JourneyItemView
