import { Image, Pressable, StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { AntDesign, Foundation } from '@expo/vector-icons'
import styled from 'styled-components'
import ResponsesComponent from './ResponsesComponent'
import { Text } from '../../components/Text'
import { useCustomTheme } from '../../utils/Theme'

const emptyImage = require('../../../assets/adaptive-icon.png')

const CTA = styled(Pressable)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 16px;
  padding: 15px;
  border-color: ${({ theme }) => theme.colors.card};
  border-width: 2px;
  background-color: ${({ theme }) => theme.colors.card};
  margin-top: 10px;
`

const Continue = styled(CTA)`
  background-color: ${(props: any) => (props.isSuccess ? 'green' : 'red')};
  border-color: ${(props: any) => (props.isSuccess ? 'green' : 'red')};
`

const Validate = styled(CTA)`
  border-color: ${({ theme, isActive }: any) =>
    isActive ? '#28a745' : theme.colors.card};
`

const Tips = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  background-color: #d3d3d34d;
  padding: 10px;
  margin-top: 10px;
`

function QuestionView({ question, setScore }: any) {
  const [selected, setSelected] = useState([])
  const [localScore, setLocalScore] = useState<number>(-1)
  const isSelected = selected.length > 0

  const { colors } = useCustomTheme()

  const styles = StyleSheet.create({
    image: {
      height: 100,
      width: '100%',
      objectFit: 'contain',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 50,
      marginTop: 50,
    },
    h1: {
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: 15,
      marginTop: 10,
      textAlign: 'center',
    },
    description: {
      fontSize: 16,
      lineHeight: 25,
      textAlign: 'center',
    },
    responses: {
      paddingTop: 20,
      margin: 0,
    },
    ctaText: {
      color: colors.text,
      fontWeight: 'bold',
      fontSize: 16,
    },
    validateText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
  })

  const onValidate = () => {
    const hasGoodAnswer =
      question.correctAnswers.sort().join() === selected.sort().join()
    if (isSelected) {
      if (hasGoodAnswer) {
        setLocalScore(10)
      } else {
        setLocalScore(0)
      }
    }
  }

  const nextQuestion = () => {
    setScore(localScore)
    setLocalScore(-1)
  }

  return (
    <View style={{ position: 'relative', padding: 10 }}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '100%',
          paddingBottom: 120,
        }}
      >
        <View>
          <Image
            style={styles.image}
            source={question.image ? { uri: question.image } : emptyImage}
          />
          <Text style={styles.h1}>{question.question}</Text>
          {question.description && (
            <Tips>
              <Foundation name="info" size={24} color="#f15700" />
              <Text style={styles.description}>{question.description}</Text>
            </Tips>
          )}
          <ResponsesComponent
            data={question}
            setSelected={setSelected}
            style={styles.responses}
            isBlocked={localScore === -1}
          />
        </View>
        {localScore === -1 ? (
          <Validate isActive={isSelected} onPress={onValidate}>
            <AntDesign
              name={isSelected ? 'check' : 'lock'}
              size={24}
              color={colors.text}
            />
            <Text style={styles.ctaText}>
              {isSelected
                ? `Valider ${selected.length > 1 ? 'mes' : 'ma'} réponse${
                    selected.length > 1 ? 's' : ''
                  }`
                : 'Choisir au moins une réponse pour valider'}
            </Text>
          </Validate>
        ) : (
          <Continue onPress={nextQuestion} isSuccess={localScore > 0}>
            <Text style={styles.validateText}>
              {localScore > 0
                ? 'Bravo, passez à la questions suivante !'
                : 'Dommage, vous ferez mieux la prochaine fois'}
            </Text>
            <AntDesign name="arrowright" size={24} color="white" />
          </Continue>
        )}
      </View>
    </View>
  )
}

export default QuestionView
