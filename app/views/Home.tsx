import { View, Image } from 'react-native'
import styled from 'styled-components'

const Container = styled(View)`
  flex: 1;
`
const Background = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
const Logo = styled(Image)`
  width: 100%;
  height: 100%;
  resize-mode: contain;
`

const images = {
  bg: require('../../assets/gradient.png'),
  logo: require('../../assets/logo.png'),
}

function Home() {
  return (
    <Container>
      <Background source={images.bg} />
      <Logo source={images.logo} />
    </Container>
  )
}

export default Home
