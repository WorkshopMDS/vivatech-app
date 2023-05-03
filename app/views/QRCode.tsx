import { Text } from 'react-native'
import styled from 'styled-components'
import { SafeAreaView } from 'react-native-safe-area-context'

const Title = styled(Text)`
  font-family: Museo-500;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary100};
  text-align: center;
`

function QRCode() {
  return (
    <SafeAreaView>
      <Title>QRCode</Title>
    </SafeAreaView>
  )
}

export default QRCode
