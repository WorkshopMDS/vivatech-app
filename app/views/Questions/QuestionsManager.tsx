import { useState } from 'react'
import QRCodeQuestionView from './QRCodeQuestionView'
import { useAppSelector } from '../../hooks'
import QuestionView from './QuestionView'
import { addJourneyService } from '../../store/services/users.service'

function QuestionsManager({ navigation, route }: any) {
  const { journeyId } = route.params
  const { journeys } = useAppSelector(state => state.journeys)
  const journey = journeys.find(item => item.id === journeyId)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isOnStand, setIsOnStand] = useState(false)
  const [score, setScore] = useState(0)
  // console.log(
  //  Buffer.from(
  //    JSON.stringify({ standId: journey?.questions[currentQuestion].stand })
  //  ).toString('base64')
  // )

  const handleAnswer = (questionScore: number) => {
    setScore(questionScore + score)
    setIsOnStand(false)

    if (currentQuestion === journey.questions.length - 1) {
      navigation.pop(2)
      navigation.navigate('JourneyResult', { journeyId, score })
      addJourneyService({ journey: journey.id, score })
    }

    setCurrentQuestion(currentQuestion + 1)
  }

  return (
    currentQuestion <= journey.questions.length - 1 &&
    (isOnStand ? (
      <QuestionView
        question={journey.questions[currentQuestion]}
        setScore={handleAnswer}
      />
    ) : (
      <QRCodeQuestionView
        standId={journey.questions[currentQuestion].stand}
        setIsOnStand={setIsOnStand}
      />
    ))
  )
}

export default QuestionsManager
