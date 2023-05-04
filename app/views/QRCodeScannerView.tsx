import { BarCodeScanner } from 'expo-barcode-scanner'
import { useEffect, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { Buffer } from 'buffer'
import styled from 'styled-components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Camera } from 'expo-camera'

const Title = styled(Text)`
  font-family: Museo-700;
  font-size: 24px;
  text-align: center;
  color: white;
  margin-bottom: 16px;
`

function QRCodeScannerView({ setData }: any) {
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

      const keys = ['id', 'validityPeriod', 'buyDate', 'user']
      const hasAllKeys = keys.every(key =>
        Object.prototype.hasOwnProperty.call(jsonData, key),
      )

      // check if the data is valid (has the right keys)
      if (!hasAllKeys) {
        throw new Error()
      }

      AsyncStorage.setItem('ticket', data)
      setData(data)
    } catch {
      setHasScanned(true)

      Alert.alert(
        'Erreur',
        "Le QR code scanné n'est pas valide",
        [
          {
            text: 'OK',
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
      <Title>Scanne ton billet physique</Title>

      <View
        style={{
          flex: 1,
          borderRadius: 16,
          overflow: 'hidden',
        }}
      >
        <Camera
          style={{
            flex: 0,
            width: '100%',
            aspectRatio: 3 / 4,
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

export default QRCodeScannerView
