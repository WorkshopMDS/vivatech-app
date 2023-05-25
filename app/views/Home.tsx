import { useEffect, useState } from 'react'
import { Image, SafeAreaView, Text } from 'react-native'
import styled from 'styled-components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native-gesture-handler'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getInterests } from '../store/actions/interests.actions'
import { getExhibitors } from '../store/actions/exhibitors.actions'
import { getConferences } from '../store/actions/conference.actions'
import { getJourneys } from '../store/actions/journeys.actions'
import ConferenceCard from '../components/Conference/ConferenceCard'
import { IConference } from '../models/ConferenceType'
import { IExhibitor } from '../components/Exhibitors/ExhibitorsView'
import Card from '../components/Exhibitors/ExhibitorCard'
import { IInterest } from './KYC'

const Background = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  height: 300px;
  resize-mode: contain;
`

const Title = styled(Text)`
  font-family: Museo-700;
  font-size: 24px;
  text-align: center;
  margin-top: 16px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text};
`

const images = {
  bg: require('../../assets/vivatech.jpg'),
  logo: require('../../assets/logo.png'),
}

const Container = styled(SafeAreaView)`
  flex: 1;
  width: 100%;
`

function Home() {
  const dispatch = useAppDispatch()
  const { conferences } = useAppSelector(state => state.conferences)
  const { exhibitors } = useAppSelector(state => state.exhibitors)

  const [userInterests, setUserInterests] = useState<string[]>([])

  useEffect(() => {
    const fetchUserInterests = async () => {
      const getUserInterests = await AsyncStorage.getItem('userInterests')
      setUserInterests(getUserInterests)
    }

    fetchUserInterests()
  }, [])

  const filteredConferences = conferences.filter((conference: IConference) => {
    const conferenceInterests = conference?.interests?.map(
      (interest: IInterest) => interest.id,
    )
    return conferenceInterests?.some((interest: string) =>
      userInterests.includes(interest),
    )
  })

  const filteredExhibitors = exhibitors.filter((exhibitor: IExhibitor) => {
    const exhibitorInterests = exhibitor?.interests?.map(
      (interest: IInterest) => interest.id,
    )
    return exhibitorInterests?.some((interest: string) =>
      userInterests.includes(interest),
    )
  })

  useEffect(() => {
    dispatch(getInterests())
    dispatch(getExhibitors())
    dispatch(getConferences())
    dispatch(getJourneys())
  }, [dispatch])

  return (
    <Container>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Background source={images.bg} />
        <Title>Nos conférences pour vous</Title>
        {filteredConferences.slice(0, 2).map((conference: IConference) => (
          <ConferenceCard key={conference.id} conference={conference} />
        ))}
        <Title>Les exposants pouvant vous interesser</Title>
        {filteredExhibitors.slice(0, 5).map((exhibitor: IExhibitor) => (
          <Card key={exhibitor.name} exhibitor={exhibitor} />
        ))}
        {/* <FlashList
        contentContainerStyle={{ paddingBottom: 100 }}
        data={conferences.slice(0, 2) as IConference[]}
        renderItem={({ item }) => <ConferenceCard conference={item} />}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={100}
      /> */}
      </ScrollView>
    </Container>
  )
}

export default Home
