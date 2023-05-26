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
  const [previousStand, setPreviousStand] = useState<null | number>(null)

  const handleAnswer = (questionScore: number) => {
    setScore(score + questionScore)
    setIsOnStand(false)
    setPreviousStand(journey.questions[currentQuestion].stand)

    if (currentQuestion >= journey.questions.length - 1) {
      navigation.pop(2)
      navigation.navigate('JourneyResult', {
        journeyId,
        score: score + questionScore,
      })
      addJourneyService({ journey: journey.id, score })
    }

    setCurrentQuestion(currentQuestion + 1)
  }

  return (
    currentQuestion <= journey.questions.length - 1 &&
    (isOnStand || previousStand === journey.questions[currentQuestion].stand ? (
      <QuestionView
        question={journey.questions[currentQuestion]}
        setScore={handleAnswer}
        totalQuestionsNb={journey.questions.length}
        questionNb={currentQuestion + 1}
      />
    ) : (
      <QRCodeQuestionView
        standId={journey.questions[currentQuestion].stand}
        setIsOnStand={setIsOnStand}
        totalQuestionsNb={journey.questions.length}
        questionNb={currentQuestion + 1}
      />
    ))
  )
}

export default QuestionsManager
