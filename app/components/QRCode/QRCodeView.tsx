import { View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { encodeQRCode } from '../../utils/QRCode'
import { useCustomTheme } from '../../utils/Theme'
import QRCodeScannerView from '../../views/QRCodeScannerView'

export default function QRCodeView() {
  const { colors } = useCustomTheme()
  const logo = require('../../../assets/small.png')
  const [data, setData] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('ticket').then(ticket => {
      if (ticket) {
        setData(ticket)
      }
    })
  })

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      {data.length ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

            marginTop: -20,
          }}
        >
          <QRCode
            value={encodeQRCode(data)}
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
      ) : (
        <QRCodeScannerView setData={setData} />
      )}
    </View>
  )
}
