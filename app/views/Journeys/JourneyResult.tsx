import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import styled from 'styled-components'
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useAppSelector } from '../../hooks'
import { Text } from '../../components/Text'
import { useCustomTheme } from '../../utils/Theme'

const styles = StyleSheet.create({
  h1: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 25,
    marginTop: 10,
    textAlign: 'center',
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#808080',
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginTop: 8,
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
  border-bottom-right-radius: 64px;
  height: 200px;
  resize-mode: cover;
`

const Button = styled(Pressable)`
  position: absolute;
`

const CTA = styled(Pressable)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.orange};
  padding: 15px;
  margin-top: 20px;
`

function JourneyResult({ route, navigation }: any): any {
  const { journeyId, score } = route.params
  const { colors } = useCustomTheme()

  const { journeys } = useAppSelector(state => state.journeys)
  const { user } = useAppSelector(state => state.tickets)
  const journey = journeys.find(item => item.id === journeyId)
  const totalScore = journey.questions.length

  if (!journey) {
    navigation.goBack()
  }

  return (
    journey && (
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ position: 'relative' }}>
          <TopImage source={{ uri: journey.image }} />
          <Button
            onPress={() => navigation.navigate('JourneysList')}
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
        <View
          style={{
            padding: 15,
          }}
        >
          <Text style={{ textAlign: 'center', marginTop: 16 }}>
            Félicitation, vous avez terminé le parcours
          </Text>
          <Text style={styles.h1}>{journey.title}</Text>
          <LinearGradient
            colors={[
              colors.gradient100,
              colors.gradient200,
              colors.gradient300,
              colors.primary100,
              colors.primary,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              marginTop: 20,
              marginBottom: 20,
              backgroundColor: colors.primary,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 15,
              borderRadius: 16,
            }}
          >
            {score > totalScore / 2 ? (
              <MaterialIcons name="insert-emoticon" size={40} color="white" />
            ) : (
              <MaterialCommunityIcons
                name="emoticon-cry-outline"
                size={40}
                color="white"
              />
            )}
            <Text style={styles.score}>
              Votre score {score} sur {totalScore}
            </Text>
          </LinearGradient>
          {!user.firstname && (
            <Text style={{ textAlign: 'center', marginTop: 16, fontSize: 12 }}>
              Vous n'êtes pas connecté, votre score ne sera pas enregistré
            </Text>
          )}
          <CTA onPress={() => navigation.goBack()}>
            <Text style={styles.ctaText}>Quitter</Text>
          </CTA>
        </View>
      </ScrollView>
    )
  )
}

export default JourneyResult
