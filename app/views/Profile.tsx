import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import styled from 'styled-components'
import * as DocumentPicker from 'expo-document-picker'
import { readAsStringAsync } from 'expo-file-system'
import { LinearGradient } from 'expo-linear-gradient'
import WebView from 'react-native-webview'
import { useEffect, useRef, useState } from 'react'
import { uploadCV } from '../store/actions/cv.actions'
import { useCustomTheme } from '../utils/Theme'
import { useAppDispatch, useAppSelector } from '../hooks'

const Absolute = styled(View)`
  position: absolute;
  margin: 0 auto;
  bottom: 110px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

const Title = styled(Text)`
  font-family: Museo-700;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
`

const Modify = styled(Pressable)`
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  background-color: #ffffffe6;
`

const ModifyText = styled(Text)`
  font-family: Museo-700;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`

interface IDoc {
  uri: string
}

function Profile({ navigation }: any) {
  const { user, cvLoading } = useAppSelector(state => state.tickets)
  const { colors } = useCustomTheme()
  const dispatch = useAppDispatch()
  const [url, setUrl] = useState<string>('')

  const pickDocument = async () => {
    const result = (await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    })) as IDoc

    // convert to base64 pdf
    const base64 = await readAsStringAsync(result.uri, {
      encoding: 'base64',
    })

    // base64 pretext
    const base64Pretext = 'data:application/pdf;base64,'
    const base64Pdf = base64Pretext + base64

    dispatch(uploadCV(base64Pdf))
  }

  const ref = useRef(null)

  navigation.addListener('focus', () => {
    setUrl('')
    setTimeout(() => {
      setUrl(user.cv || '')
    }, 1)
  })

  useEffect(() => {
    setUrl(user.cv || '')
  }, [user.cv])
  const openCV = () => {
    navigation.navigate('CVTheque')
  }

  if (!user.firstname) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AntDesign name="exclamationcircle" size={24} color={colors.text} />
        <Title>Vous n'êtes pas connecté</Title>
        <Absolute>
          <Title>Ajouter votre billet ici !</Title>
          <AntDesign name="arrowdown" size={24} color={colors.text} />
        </Absolute>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          height: '100%',
          width: '80%',
          display: 'flex',
          alignItems: 'center',
          paddingTop: 16,
        }}
      >
        <Title>
          {user.firstname} {user.lastname}
        </Title>

        <Text>{user.email}</Text>

        <LinearGradient
          colors={[
            colors.gradient100,
            colors.gradient200,
            colors.gradient300,
            colors.primary100,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 16,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 4,
            gap: 4,
            marginVertical: 16,
          }}
        >
          <Modify onPress={!cvLoading ? pickDocument : null}>
            {cvLoading && (
              <ActivityIndicator size="small" color={colors.text} />
            )}
            {!cvLoading && url.length === 0 && (
              <>
                <ModifyText>Ajouter un CV</ModifyText>
                <AntDesign name="plus" size={20} color={colors.text} />
              </>
            )}
            {!cvLoading && url.length > 0 && (
              <>
                <ModifyText>Modifier le CV</ModifyText>
                <AntDesign name="edit" size={20} color={colors.text} />
              </>
            )}
          </Modify>
          <Modify onPress={openCV}>
            <ModifyText>CV Scannés</ModifyText>
            <AntDesign name="file1" size={20} color={colors.text} />
          </Modify>
        </LinearGradient>

        {url.length === 0 ? (
          <Text>Vous n'avez pas encore de CV</Text>
        ) : (
          <View
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flex: 1,
                width: 315,
                margin: 'auto',
                maxHeight: 441,
              }}
            >
              <WebView
                ref={ref}
                source={{
                  uri: url,
                }}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default Profile
