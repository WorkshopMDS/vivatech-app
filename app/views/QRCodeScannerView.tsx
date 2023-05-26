import { BarCodeScanner } from 'expo-barcode-scanner'
import { useEffect, useState } from 'react'
import { View, Text, Alert, Pressable } from 'react-native'
import { Buffer } from 'buffer'
import styled from 'styled-components'
import { Camera } from 'expo-camera'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAppDispatch, useAppSelector } from '../hooks'
import { logout, validateTicket } from '../store/actions/tickets.actions'
import { addCV } from '../store/actions/cv.actions'
import CodeValidation from '../components/QRCode/CodeValidation'

const Title = styled(Text)`
  font-family: Museo-700;
  font-size: 24px;
  text-align: center;
  color: white;
  margin-bottom: 16px;
`

const Logout = styled(Pressable)`
  background-color: white;
  padding: 16px;
  border-radius: 16px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`

const LogoutText = styled(Text)`
  font-family: Museo-700;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`

function QRCodeScannerView({ setScanCV, cv, toggle, navigation }: any) {
  const [hasPermission, setHasPermission] = useState(false)
  const [hasScanned, setHasScanned] = useState(false)
  const [hasAskedPermission, setHasAskedPermission] = useState(false)
  const dispatch = useAppDispatch()
  const { codeSent } = useAppSelector(state => state.tickets)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
      setHasAskedPermission(true)
    }

    getBarCodeScannerPermissions()
  }, [])

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleBarCodeScanned = async ({ data }: any) => {
    setHasScanned(true)
    try {
      if (cv) {
        const buff = JSON.parse(Buffer.from(data, 'base64').toString())
        const cvs = (await AsyncStorage.getItem('cv')) || '[]'

        const parsedCVs = JSON.parse(cvs)
        const foundCV = parsedCVs.find((c: any) => c.email === buff.user.email)

        if (foundCV) {
          toggle()
          navigation.navigate('Networking', {
            screen: 'ViewCV',
            params: {
              cv: foundCV,
            },
          })
          setScanCV(false)
          return
        }

        await dispatch(
          addCV({
            firstname: buff.user.firstname,
            lastname: buff.user.lastname,
            email: buff.user.email,
            cv: buff.user.cv,
            phone: '00 00 00 00 00',
          }),
        ).then(savecCV => {
          toggle()
          navigation.navigate('Home', {
            screen: 'ViewCVHome',
            params: {
              cv: savecCV,
            },
          })
        })
        setScanCV(false)
      } else if (data.length < 15) {
        dispatch(validateTicket(data)).then(() => setHasScanned(false))
      } else {
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
        <Logout onPress={handleLogout}>
          <LogoutText>Changer de billet</LogoutText>
        </Logout>
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
