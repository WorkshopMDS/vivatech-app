import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import styled from 'styled-components'
import { AntDesign } from '@expo/vector-icons'
import { useAppSelector } from '../../hooks'

const Card = styled(View)`
  flex-direction: row;
  align-items: center;
  border-radius: ${({ theme }) => theme.roundness};
  overflow: hidden;
  margin: 5px;
  background-color: #ffffff;
`

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
  },
})

async function JourneysListView({ navigation }: any) {
  const { journeys } = useAppSelector(state => state.journeys)
  console.log(journeys)

  return (
    <FlatList
      data={journeys}
      style={{ padding: 10 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            navigation.navigate('JourneyItem', { journeyId: item.id })
          }
          key={item.id}
        >
          <Card>
            <View
              style={{
                flex: 2,
                overflow: 'hidden',
              }}
            >
              <Image
                source={{ uri: 'https://picsum.photos/1920/1080' }}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'cover',
                }}
              />
            </View>
            <View
              style={{
                flex: 4,
                padding: 5,
              }}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}
            >
              <AntDesign name="caretright" size={24} color="black" />
            </View>
          </Card>
        </Pressable>
      )}
    />
  )
}

export default JourneysListView
