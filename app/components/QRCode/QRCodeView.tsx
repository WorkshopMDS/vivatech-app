import { Pressable, View, Text } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AntDesign } from '@expo/vector-icons'
import { encodeQRCode } from '../../utils/QRCode'
import { useCustomTheme } from '../../utils/Theme'
import QRCodeScannerView from '../../views/QRCodeScannerView'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { logout } from '../../store/actions/tickets.actions'

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

const Absolute = styled(Pressable)`
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background-color: white;
  padding: 8px;
  border-radius: 16px;
`

const Col = styled(View)`
  flex-direction: column;
`

export default function QRCodeView({ toggle }: { toggle: () => void }) {
  const { colors } = useCustomTheme()
  const logo = require('../../../assets/small.png')
  const [data, setData] = useState<any>(undefined)
  const [scanCV, setScanCV] = useState(false)
  const store = useAppSelector(state => state.tickets)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setData({
      ticket: store.ticket,
      user: store.user,
    })
  }, [store])

  const handleLogout = () => {
    toggle()
    dispatch(logout())
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      {data && data.ticket && data.user.email && !scanCV && (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {data.ticket && data.user.email && (
            <View
              style={{
                margin: 20,
                paddingHorizontal: 16,
                width: '100%',
                display: 'flex',
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Absolute onPress={handleLogout}>
                <AntDesign name="logout" size={24} color={colors.orange} />
              </Absolute>
              <Col>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 24,
                    fontWeight: 'bold',
                  }}
                >
                  {data.user.firstname} {data.user.lastname}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                  }}
                >
                  {data.user.email}
                </Text>
              </Col>
            </View>
          )}
          <QRCode
            value={encodeQRCode(data)}
            size={280}
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
      {data && data.ticket && data.user.email && scanCV && (
        <QRCodeScannerView setScanCV={setScanCV} cv toggle={toggle} />
      )}
      {data && (!data.ticket || !data.user.email) && !scanCV && (
        <QRCodeScannerView toggle={toggle} />
      )}
    </View>
  )
}
