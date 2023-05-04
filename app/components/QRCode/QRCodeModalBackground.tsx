import { View, Image } from 'react-native'

const background = require('../assets/gradient.png')

interface QRCodeModalBackgroundProps {
  style: any
}

function QRCodeModalBackground({ style }: QRCodeModalBackgroundProps) {
  return (
    <View
      style={[
        style,
        {
          flex: 1,
        },
      ]}
    >
      <Image
        source={background}
        style={[
          {
            borderRadius: 32,
            flex: 1,
            width: '100%',
            height: '100%',
          },
        ]}
      />
    </View>
  )
}

export default QRCodeModalBackground
