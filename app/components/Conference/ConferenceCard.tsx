import styled from 'styled-components'
import { View, Text } from 'react-native'
import Moment from 'moment'
import { AntDesign } from '@expo/vector-icons'
import { IConference } from '../../models/ConferenceType'
import 'moment/locale/fr'
import { IInterest } from '../Exhibitors/ExhibitorsView'
import { Pill, PillText } from '../Exhibitors/ExhibitorCard'

Moment.locale('fr')

const Card = styled(View)`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  padding: 16px;
  margin: 12px;
  margin-bottom: 0;
`
const ConfTitle = styled(Text)`
  font-family: Museo-700;
  font-size: 20px;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
`
const Schedule = styled(View)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`
const Time = styled(Text)`
  font-size: 16px;
  padding: 0px 8px;
  color: white;
`
const SpeakerName = styled(Text)`
  font-family: Museo-700;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`
const Details = styled(View)`
  height: auto;
  transition: height 7s;
  overflow: hidden;
`
const Stage = styled(Time)`
  font-family: Museo-700;
  font-size: 16px;
`

const StageContainer = styled(View)`
  width: 30%;
  background-color: ${({ theme }) => theme.colors.orange};
  border-radius: 8px;
  padding: 8px;
  justify-content: space-around;
  align-items: center;
`
const Description = styled(Text)`
  font-family: Museo-300;
  font-size: 15px;
  margin-top: 8px;
  text-align: justify;
  color: ${({ theme }) => theme.colors.text};
`

const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
interface ConferenceCardProps {
  conference: IConference
}

const capitalizeEveryString = (str: string) =>
  str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

function ConferenceCard({ conference }: ConferenceCardProps) {
  return (
    <Card>
      <Row>
        <Schedule>
          {conference.startAt && conference.endAt && (
            <>
              <Time>
                {capitalizeEveryString(
                  Moment(conference.startAt).format('DD MMM YYYY'),
                )}
              </Time>
              <Time>|</Time>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Time>{Moment(conference.startAt).format('HH:mm')}</Time>
                <AntDesign name="arrowright" size={16} color="white" />
                <Time>{Moment(conference.endAt).format('HH:mm')}</Time>
              </View>
            </>
          )}
          <StageContainer>
            <Stage>Stage {conference.stage}</Stage>
          </StageContainer>
        </Schedule>
      </Row>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 16,
        }}
      >
        <AntDesign name="user" size={16} color="black" />
        <SpeakerName>
          {conference.speaker
            ? conference.speaker
                .map(speaker => `${speaker.firstname} ${speaker.lastname}`)
                .join(', ')
            : 'Non renseigné'}
        </SpeakerName>
      </View>
      <ConfTitle>{conference.title}</ConfTitle>

      <Details>
        <Description>
          {conference.description
            ? conference.description
            : 'Description a revoir'}
        </Description>
      </Details>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 16,
          gap: 8,
        }}
      >
        {conference.interests.map((interest: IInterest) => (
          <Pill>
            <PillText key={interest.id}>{interest.label}</PillText>
          </Pill>
        ))}
      </View>
    </Card>
  )
}

export default ConferenceCard
