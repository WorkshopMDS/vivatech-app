import { Pressable, View, Text } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styled from 'styled-components'
import { encodeQRCode } from '../../utils/QRCode'
import { useCustomTheme } from '../../utils/Theme'
import QRCodeScannerView from '../../views/QRCodeScannerView'

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

  useEffect(() => {
    AsyncStorage.getItem('ticket').then(ticket => {
      AsyncStorage.getItem('user').then(user => {
        if (ticket && user) {
          setData({
            cv: JSON.parse(user).cv,
            ticket,
          })
        }
      })
    })
  }, [])

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
            value={encodeQRCode({
              ticket: data.ticket,
              cv: data.cv,
            })}
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
      {scanCV && <QRCodeScannerView setData={setData} cv />}
      {!data && !scanCV && <QRCodeScannerView setData={setData} />}
    </View>
  )
}
