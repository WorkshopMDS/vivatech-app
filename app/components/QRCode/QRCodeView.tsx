import { View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { encodeQRCode } from '../../utils/QRCode'
import { useCustomTheme } from '../../utils/Theme'

export default function QRCodeView() {
  const { colors } = useCustomTheme()
  const logo = require('../assets/small.png')
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <QRCode
        value={encodeQRCode()}
        size={300}
        logo={logo}
        logoBackgroundColor={colors.primary300}
        logoSize={50}
        logoBorderRadius={500}
        logoMargin={4}
        backgroundColor="transparent"
        color="white"
      />
    </View>
  )
}
