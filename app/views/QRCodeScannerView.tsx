import { BarCodeScanner } from 'expo-barcode-scanner'
import { useEffect, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { Buffer } from 'buffer'
import styled from 'styled-components'
import { Camera } from 'expo-camera'

import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../hooks'
import { validateTicket } from '../store/actions/tickets.actions'
import { addCV } from '../store/actions/cv.actions'
import CodeValidation from '../components/QRCode/CodeValidation'

const Title = styled(Text)`
  font-family: Museo-700;
  font-size: 24px;
  text-align: center;
  color: white;
  margin-bottom: 16px;
`

function QRCodeScannerView({ setScanCV, cv, toggle }: any) {
  const [hasPermission, setHasPermission] = useState(false)
  const [hasScanned, setHasScanned] = useState(false)
  const [hasAskedPermission, setHasAskedPermission] = useState(false)
  const dispatch = useAppDispatch()
  const { codeSent } = useAppSelector(state => state.tickets)
  const navigation = useNavigation()

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
      if (cv) {
        const buff = JSON.parse(Buffer.from(data, 'base64').toString())

        await dispatch(
          addCV({
            name: buff.user.firstname,
            lastName: buff.user.lastname,
            email: buff.user.email,
            cv: buff.user.cv,
            phone: '00 00 00 00 00',
          }),
        ).then(savecCV => {
          toggle()
          navigation.navigate('CV', {
            screen: 'ViewCV',
            params: {
              cv: savecCV,
            },
          })
        })
        setScanCV(false)
      } else {
        dispatch(validateTicket(data)).then(() => setHasScanned(false))
      }
    } catch (error) {
      console.log(error)
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

  if (codeSent) {
    return (
      <View>
        <Title>Nous avons envoyé un code à ton adresse mail</Title>
        <CodeValidation {...{ setHasScanned }} />
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {setScanCV ? (
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
