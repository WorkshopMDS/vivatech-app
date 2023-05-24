import styled from 'styled-components'
import { View, Text, Pressable } from 'react-native'
import Moment from 'moment'
import { Conference } from '../../models/ConferenceType'
import { useToggle } from '../../hooks'

const Card = styled(Pressable)`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 24px;
  padding: 20px;
  margin: 12px;
  margin-bottom: 0;
`
const ConfTitle = styled(Text)`
  font-family: Museo-700;
  font-size: 20px;
  text-align: center;
  margin-top: 3px;
  color: ${({ theme }) => theme.colors.text};
`
const Schedule = styled(View)`
  margin-top: 10px;
  margin-bottom: 10px;
  align-items: center;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
  justify-content: space-around;
`
const Time = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
`
const SpeakerName = styled(Text)`
  font-family: Museo-700;
  font-size: 14px;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.text};
`
const Details = styled(View)<{ isOpen: boolean }>`
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  transition: height 7s;
  overflow: hidden;
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

interface ConferenceCardProps {
  conference: Conference
}

function ConferenceCard({ conference }: ConferenceCardProps) {
  const [isConfOpen, toggleConf] = useToggle(false)

  return (
    <Card onPress={toggleConf}>
      <ConfTitle>{conference.title}</ConfTitle>
      <SpeakerName>
        {conference.speaker.name ? conference.speaker.name : 'Non définit'}
      </SpeakerName>
      <Schedule>
        <Time>
          {conference.startAt
            ? `${Moment(conference.startAt).format('d MMM hh:mm')} - ${Moment(
                conference.endAt,
              ).format('hh:mm')}`
            : 'Non défini'}
        </Time>
      </Schedule>
      <Details isOpen={isConfOpen}>
        <Stage>Stage {conference.stage}</Stage>
        <Description>
          {conference.description
            ? conference.description
            : 'Description a revoir'}
        </Description>
      </Details>
    </Card>
  )
}

export default ConferenceCard
