import { BarCodeScanner } from 'expo-barcode-scanner'
import { useEffect, useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { Buffer } from 'buffer'
import styled from 'styled-components'
import { Camera } from 'expo-camera'

const Title = styled(Text)`
  font-family: Museo-700;
  font-size: 24px;
  text-align: center;
  margin: 40px 0;
`

function QRCodeQuestionView({ setData }: any) {
  const [hasPermission, setHasPermission] = useState(false)
  const [hasScanned, setHasScanned] = useState(false)
  const [hasAskedPermission, setHasAskedPermission] = useState(false)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
      setHasAskedPermission(true)
    }

    getBarCodeScannerPermissions()
  }, [])

  const handleBarCodeScanned = ({ data }: any) => {
    const decodedData = Buffer.from(data, 'base64').toString('ascii')
    try {
      const jsonData = JSON.parse(decodedData)

      if (!jsonData.standId) {
        throw new Error()
      }

      setData(jsonData.standId)
    } catch {
      setHasScanned(true)

      Alert.alert(
        'Erreur',
        'Le QR code scanné ne fait pas partit de ce parcours ou ne correspond pas à un stand',
        [
          {
            text: 'Réessayer',
            onPress: () => {
              setHasScanned(false)
            },
          },
        ],
        { cancelable: false },
      )
    }
  }

  if (hasAskedPermission === false) {
    return <Title>Demande de permission</Title>
  }
  if (hasPermission === false) {
    return <Title>Accès à la caméra refusé</Title>
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Title>Scan le QR code du stand XXX</Title>

      <View
        style={{
          flex: 1,
          overflow: 'hidden',
          alignItems: 'center',
        }}
      >
        <Camera
          style={{
            borderRadius: 10,
            flex: 0,
            width: '95%',
            height: '80%',
          }}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={hasScanned ? undefined : handleBarCodeScanned}
        />
      </View>
    </View>
  )
}

export default QRCodeQuestionView
