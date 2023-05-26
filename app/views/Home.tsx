import { useEffect, useRef } from 'react'
import { Image, Pressable, SafeAreaView, Text } from 'react-native'
import styled from 'styled-components'
import { ScrollView } from 'react-native-gesture-handler'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getInterests } from '../store/actions/interests.actions'
import { getExhibitors } from '../store/actions/exhibitors.actions'
import { getConferences } from '../store/actions/conference.actions'
import ConferenceCard from '../components/Conference/ConferenceCard'
import { IConference } from '../models/ConferenceType'
import { IExhibitor } from '../components/Exhibitors/ExhibitorsView'
import KYC, { IInterest } from './KYC'
import { getUserKYC } from '../store/actions/kyc.actions'
import { useCustomTheme } from '../utils/Theme'
import { getJourneys } from '../store/actions/journeys.actions'
import SmallCard from '../components/Exhibitors/ExhibitorSmallCard'
import { HorizontalScroller } from '../components/HorizontalScroller'

const Background = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
  width: 100%;
  height: 200px
  resize-mode: cover;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius:32px;
  margin-bottom: 12px;
`

const Title = styled(Text)`
  font-family: Museo-700;
  font-size: 24px;
  text-align: left;
  margin-top: 16px;
  margin-bottom: 16px;
  padding-left: 16px;
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

const Button = styled(Pressable)`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
  padding: 16px;
  margin: 8px;
`

const ButtonText = styled(Text)`
  color: white;
  text-align: center;
  font-size: 16px;
  font-family: Museo-700;
`

function Home({ navigation }: any) {
  const dispatch = useAppDispatch()
  const { colors } = useCustomTheme()
  const { conferences } = useAppSelector(state => state.conferences)
  const { exhibitors } = useAppSelector(state => state.exhibitors)
  const { userInterests, isFilled } = useAppSelector(state => state.kyc)

  // const [userInterests, setUserInterests] = useState<string[]>([])

  // useEffect(() => {
  //   console.log(userInterests)
  //   // const fetchUserInterests = async () => {
  //   //   const getUserInterests = await AsyncStorage.getItem('userInterests')
  //   //   setUserInterests(getUserInterests)
  //   // }

  //   // fetchUserInterests()
  // }, [userInterests])

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
    dispatch(getUserKYC())
    dispatch(getJourneys())
  }, [dispatch])

  const ref = useRef<any>(null)

  useEffect(() => {
    if (isFilled) {
      ref.current?.close()
      return
    }
    ref.current?.present()
  }, [isFilled])

  const goExposants = () => {
    navigation.navigate('Exhibitors')
  }

  return (
    <Container>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Background source={images.bg} />
        {filteredConferences.length > 0 && (
          <>
            <Title>Nos conférences pour vous</Title>
            {filteredConferences.slice(0, 2).map((conference: IConference) => (
              <ConferenceCard key={conference.id} conference={conference} />
            ))}
          </>
        )}
        {filteredConferences.length === 0 && (
          <>
            <Title>Les prochaines conférences</Title>
            {conferences.slice(0, 2).map((conference: IConference) => (
              <ConferenceCard key={conference.id} conference={conference} />
            ))}
          </>
        )}

        {filteredExhibitors.length > 0 && (
          <>
            <Title>Les exposants pouvant vous interesser</Title>
            <HorizontalScroller justifyContent="flex-start">
              {filteredExhibitors.slice(0, 5).map((exhibitor: IExhibitor) => (
                <SmallCard key={exhibitor.name} exhibitor={exhibitor} />
              ))}
            </HorizontalScroller>
          </>
        )}

        {filteredExhibitors.length === 0 && (
          <>
            <Title>Les exposants</Title>
            <HorizontalScroller justifyContent="flex-start">
              {exhibitors.slice(0, 5).map((exhibitor: IExhibitor) => (
                <SmallCard key={exhibitor.name} exhibitor={exhibitor} />
              ))}
            </HorizontalScroller>
          </>
        )}
        <Button onPress={() => goExposants()}>
          <ButtonText>Voir tous les exposants</ButtonText>
        </Button>
      </ScrollView>
      <BottomSheetModal
        snapPoints={['85%', '85%']}
        index={1}
        ref={ref}
        enablePanDownToClose={false}
        enableDismissOnClose={false}
        handleComponent={() => null}
      >
        <KYC colors={colors} />
      </BottomSheetModal>
    </Container>
  )
}

export default Home
