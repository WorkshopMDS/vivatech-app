import { BarCodeScanner } from 'expo-barcode-scanner'
import { useEffect, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { Buffer } from 'buffer'
import styled from 'styled-components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Camera } from 'expo-camera'
import axios from 'axios'

const Title = styled(Text)`
  font-family: Museo-700;
  font-size: 24px;
  text-align: center;
  color: white;
  margin-bottom: 16px;
`

function QRCodeScannerView({ setData, cv }: any) {
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

  const handleBarCodeScanned = async ({ data }: any) => {
    setHasScanned(true)
    try {
      if (!cv) {
        const fetchTicket = await axios
          .get(`https://viva-api.fly.dev/ticket/validation/${data}`)
          .then(res => res.data)

        // decode base64
        const buff = Buffer.from(fetchTicket.data.user, 'base64').toString()
        const user = JSON.parse(buff)

        AsyncStorage.setItem('ticket', data)
        AsyncStorage.setItem('user', JSON.stringify(user))

        setData({
          ticket: data,
          cv: user.cv,
          user,
        })
        setHasScanned(false)
      } else {
        const buff = JSON.parse(Buffer.from(data, 'base64').toString())

        if (buff.cv) {
          AsyncStorage.getItem('cvs').then(cvs => {
            if (cvs) {
              const cvsArray = JSON.parse(cvs)
              cvsArray.push(buff.cv)
              AsyncStorage.setItem('cvs', JSON.stringify(cvsArray))
            } else {
              AsyncStorage.setItem('cvs', JSON.stringify([buff.cv]))
            }
          })
          Alert.alert('Succès', 'Le CV a bien été ajouté à ta CVThèque')
        }
      }
    } catch (error) {
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
      {cv ? (
        <Title>
          Scanne le QR code du CV pour l&lsquo;ajouter à ta CVThèque
        </Title>
      ) : (
        <Title>Scanne ton billet physique</Title>
      )}

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
