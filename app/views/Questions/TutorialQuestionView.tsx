import { Image, Pressable, StyleSheet, View } from 'react-native'
import { useEffect } from 'react'
import styled from 'styled-components'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useCustomTheme } from '../../utils/Theme'
import { Text } from '../../components/Text'

const styles = StyleSheet.create({
  img: {
    width: 200,
    objectFit: 'contain',
    height: 200,
  },
  h1: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 15,
    textAlign: 'center',
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  responses: {
    paddingTop: 20,
    margin: 0,
  },
  ctaText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

const ImageContainer = styled(View)`
  padding: 20px;
  background-color: white;
  border-radius: 60px;
`
const CTA = styled(Pressable)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.orange};
  padding: 8px 24px;
  margin-top: 25px;
`

const illustration = require('../../../assets/tutorial_question.png')

function TutorialQuestionView({ navigation, route }: any) {
  const { journeyId } = route.params
  const { colors } = useCustomTheme()

  useEffect(() => {
    const interval = setInterval(() => {
      navigation.pop(1)
      navigation.navigate('QuestionsManager', { journeyId })
    }, 1000 * 20)

    return () => clearInterval(interval) // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [navigation, journeyId])

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <LinearGradient
        colors={[
          colors.gradient100,
          colors.gradient200,
          colors.gradient300,
          colors.primary,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          marginTop: 50,
          marginBottom: 24,
          backgroundColor: colors.primary,
          borderRadius: 64,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <ImageContainer>
          <Image source={illustration} style={styles.img} />
        </ImageContainer>
      </LinearGradient>
      <View style={{ width: '85%' }}>
        <Text style={styles.h1}>Vous allez démarrer un parcours !</Text>
        <Text style={styles.description}>
          À travers l'ensemble de ce parcours, vous découvrirez de nouvelles
          entreprises ou conférences.
        </Text>
        <Text style={styles.h2}>Comment ça fonctionne ?</Text>
        <Text style={styles.description}>
          Dirigez-vous vers le stand indiqué, une fois sur le stand ou la scène
          demandée, scannez le QR Code et observez le stand de l'entreprise pour
          répondre à la question. Si vous répondez correctement, vous gagnerez
          des points.
        </Text>
      </View>
      <CTA
        onPress={() => {
          navigation.pop(1)
          navigation.navigate('QuestionsManager', { journeyId })
        }}
      >
        <Ionicons name="play" size={24} color="white" />
        <Text style={styles.ctaText}>C'est parti !</Text>
      </CTA>
    </View>
  )
}

export default TutorialQuestionView
