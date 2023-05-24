import { useEffect } from 'react'
import { Image, SafeAreaView, Text } from 'react-native'
import styled from 'styled-components'
import { getInterests } from '../store/actions/interests.actions'
import { getExhibitors } from '../store/actions/exhibitors.actions'
import { useAppDispatch } from '../hooks'
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

  useEffect(() => {
    dispatch(getInterests())
    dispatch(getExhibitors())
    dispatch(getJourneys())
  }, [dispatch])

  return (
    <SafeAreaView>
      <Background source={images.bg} />
      <Title>Bienvenue sur l&lsquo;application de Vivatech !</Title>
    </SafeAreaView>
  )
}

export default Home
