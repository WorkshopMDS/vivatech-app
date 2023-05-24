import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import styled from 'styled-components'
import { AntDesign } from '@expo/vector-icons'
import { useAppSelector } from '../hooks'
import { useCustomTheme } from '../utils/Theme'

export const Card = styled(View)`
  background-color: ${({ theme }) => theme.colors.card};
  padding: 16px;
  margin: 10px;
  border-radius: 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Title = styled(Text)`
  font-family: Museo-700;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
`

const Subtitle = styled(Text)`
  font-family: Museo-300;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`

const Col = styled(View)`
  flex-direction: column;
`
const Absolute = styled(View)`
  position: absolute;
  margin: 0 auto;
  bottom: 110px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

const Button = styled(Pressable)`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 16px;
  border-radius: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

function CVTheque({ navigation }: any) {
  const { cvs } = useAppSelector(selector => selector.cv)
  const { colors } = useCustomTheme()

  if (!cvs.length) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AntDesign name="addfile" size={64} color={colors.text} />
        <Absolute>
          <Title>Scanner différents CV ici !</Title>
          <AntDesign name="arrowdown" size={24} color={colors.text} />
        </Absolute>
      </SafeAreaView>
    )
  }

  return (
    <ScrollView
      contentInset={{
        bottom: 64,
      }}
      showsVerticalScrollIndicator={false}
    >
      {cvs.map((cv: any, index: number) => {
        return (
          <Card key={index}>
            <Col>
              <Title>
                {cv.name} {cv.lastName}
              </Title>
              <Subtitle>{cv.email}</Subtitle>
            </Col>
            <Button onPress={() => navigation.navigate('ViewCV', { cv })}>
              <AntDesign name="file1" size={24} color="white" />
            </Button>
          </Card>
        )
      })}
    </ScrollView>
  )
}

export default CVTheque
