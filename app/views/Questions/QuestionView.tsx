import { Image, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import styled from 'styled-components'
import RadioButton from '../../components/RadioButton'
import QRCodeQuestionView from './QRCodeQuestionView'

const styles = StyleSheet.create({
  h1: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
  },
  responses: {
    paddingTop: 20,
    margin: 0,
  },
  ctaText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

const CTA = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: ${({ theme }) => theme.roundness};
  background-color: #28a745;
  padding: 15px;
  margin-top: 10px;
`

function QuestionView() {
  const [option, setOption] = useState(null)
  const [data2, setData] = useState('')
  const data = [
    { key: 1, value: 'Apple' },
    { key: 2, value: 'Samsung' },
    { key: 3, value: 'Blackberry' },
  ]

  // const { journeyId } = route.params
  useEffect(() => {
    console.log(data2)
    console.log(option)
  }, [data2, option])

  return data2 ? (
    <View style={{ position: 'relative', padding: 10 }}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '100%',
          paddingBottom: 120,
        }}
      >
        <Image source={{ uri: 'https://picsum.photos/200/300' }} />
        <View>
          <Text style={styles.h1}>Qui est le plus beau ?</Text>
          <Text style={styles.description}>lorem ipsum</Text>
          <RadioButton
            data={data}
            onSelect={(value: any) => setOption(value)}
            style={styles.responses}
          />
        </View>
        <CTA>
          <AntDesign name="check" size={24} color="white" />
          <Text style={styles.ctaText}>Valider</Text>
        </CTA>
      </View>
    </View>
  ) : (
    <QRCodeQuestionView setData={setData} />
  )
}

export default QuestionView
