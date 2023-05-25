import { useEffect } from 'react'
import { Image, SafeAreaView, Text } from 'react-native'
import styled from 'styled-components'
import { useAppDispatch } from '../hooks'
import { getInterests } from '../store/actions/interests.actions'
import { getExhibitors } from '../store/actions/exhibitors.actions'
import { getConferences } from '../store/actions/conference.actions'
import { getJourneys } from '../store/actions/journeys.actions'

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
  color: ${({ theme }) => theme.colors.text};
`

const images = {
  bg: require('../../assets/vivatech.jpg'),
  logo: require('../../assets/logo.png'),
}

function Home() {
  const dispatch = useAppDispatch()

  // const [userInterests, setUserInterests] = useState(null) // Add useState hook

  // useEffect(() => {
  //   const fetchUserInterests = async () => {
  //     const getUserInterests = await AsyncStorage.getItem('userInterests')
  //     setUserInterests(getUserInterests)
  //   }

  //   fetchUserInterests()
  // }, [])

  useEffect(() => {
    dispatch(getInterests())
    dispatch(getExhibitors())
    dispatch(getConferences())
    dispatch(getJourneys())
  }, [dispatch])

  return (
    <SafeAreaView>
      <Background source={images.bg} />
      <Title>Bienvenue sur l&lsquo;application de Vivatech !</Title>
      <Text>interestsId : {} </Text>
    </SafeAreaView>
  )
}

export default Home
