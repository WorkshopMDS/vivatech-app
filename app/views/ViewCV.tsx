import { View, Text, SafeAreaView } from 'react-native'
import styled from 'styled-components'
import PDFReader from 'rn-pdf-reader-js'
import { useCustomTheme } from '../utils/Theme'

const Title = styled(Text)`
  font-family: Museo-700;
  font-size: 42px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`

const Subtitle = styled(Text)`
  font-family: Museo-300;
  font-size: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`

const Container = styled(View)`
  height: 90%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
`

function ViewCV({ route }: any) {
  const { cv } = route.params
  const { colors } = useCustomTheme()
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: 16,
      }}
    >
      <Container>
        <Title>
          {cv.name} {cv.lastName}
        </Title>
        <Subtitle>{cv.email}</Subtitle>
        <PDFReader
          source={{
            uri: cv.cv,
          }}
          webviewStyle={{
            backgroundColor: colors.background,
          }}
          style={{ marginTop: 20 }}
        />
      </Container>
    </SafeAreaView>
  )
}

export default ViewCV
