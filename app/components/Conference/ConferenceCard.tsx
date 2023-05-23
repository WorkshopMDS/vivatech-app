import styled from 'styled-components'
import { View, Text, Pressable } from 'react-native'
import { Conference } from '../../models/ConferenceType'
import useToggle from '../../utils/useToggle'

const Card = styled(Pressable)`
  background-color: ${({ theme }) => theme.colors.cardbg};
  border-radius: 10px;
  padding: 18px;
  margin: 15px;
  margin-bottom: 0;
`
const ConfTitle = styled(Text)`
  font-family: Museo-700;
  font-size: 24px;
  text-align: center;
  margin-top: 3px;
  color: ${({ theme }) => theme.colors.text};
`

const SpeakerName = styled(Text)`
  font-family: Museo-700;
  font-size: 18px;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.text};
`
const Stage = styled(Text)`
  font-family: Museo-500;
  font-size: 15px;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.text};
`
const Description = styled(Text)`
  font-family: Museo-300;
  font-size: 15px;
  margin-top: 8px;
  text-align: justify;
  color: ${({ theme }) => theme.colors.text};
`
const Details = styled(View)<{ isOpen: boolean }>`
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  transition: height 7s;
  overflow: hidden;
`

interface ConferenceCardProps {
  conference: Conference
}

function ConferenceCard({ conference }: ConferenceCardProps) {
  const [isConfOpen, toggleConf] = useToggle(false)

  return (
    <Card onPress={toggleConf}>
      <ConfTitle>{conference.title}</ConfTitle>
      <SpeakerName>{conference.speaker.name}</SpeakerName>
      <Details isOpen={isConfOpen}>
        <Stage>Stage {conference.stage}</Stage>
        <Description>{conference.description}</Description>
      </Details>
    </Card>
  )
}

export default ConferenceCard
