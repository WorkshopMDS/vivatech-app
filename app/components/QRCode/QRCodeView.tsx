import { Pressable, View, Text } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { encodeQRCode } from '../../utils/QRCode'
import { useCustomTheme } from '../../utils/Theme'
import QRCodeScannerView from '../../views/QRCodeScannerView'
import { useAppSelector } from '../../hooks'

const CVScann = styled(Pressable)`
  border-radius: 16px;
  padding: 10px;
  margin-top: 20px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export default function QRCodeView() {
  const { colors } = useCustomTheme()
  const logo = require('../../../assets/small.png')
  const [data, setData] = useState<any>(undefined)
  const [scanCV, setScanCV] = useState(false)
  const store = useAppSelector(state => state.tickets)

  useEffect(() => {
    if (store.ticket && store.user) {
      setData({
        ticket: store.ticket,
        user: store.user,
      })
    }
  }, [store])

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      {data && !scanCV && (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {data && (
            <View
              style={{
                margin: 20,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 24,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {data.user.firstname} {data.user.lastname}
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  textAlign: 'center',
                }}
              >
                {data.user.email}
              </Text>
            </View>
          )}
          <QRCode
            value={encodeQRCode(data)}
            size={250}
            logo={logo}
            logoBackgroundColor={colors.primary300}
            logoSize={50}
            logoBorderRadius={500}
            logoMargin={4}
            backgroundColor="transparent"
            color="white"
          />
          <CVScann onPress={() => setScanCV(true)}>
            <Text
              style={{
                color: colors.primary300,
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Scanner un CV
            </Text>
          </CVScann>
        </View>
      )}
      {scanCV && <QRCodeScannerView setScanCV={setScanCV} cv />}
      {!data && !scanCV && <QRCodeScannerView />}
    </View>
  )
}
