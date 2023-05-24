import { BarCodeScanner } from 'expo-barcode-scanner'
import { useEffect, useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { Buffer } from 'buffer'
import styled from 'styled-components'
import { Camera } from 'expo-camera'

const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 5px;
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
      <View style={{ margin: 40 }}>
        <Title>Rendez-vous sur le stand 10</Title>
        <Text style={{ fontSize: 14, textAlign: 'center' }}>
          et scan le QR code présent pour répondre à la question
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}
      >
        <Camera
          style={{
            borderRadius: 10,
            overflow: 'hidden',
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
