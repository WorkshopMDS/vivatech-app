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

function JourneysListView({ navigation }: any) {
  const data = [
    {
      id: 0,
      picture: 'https://picsum.photos/200/300',
      title: 'Title 1',
      description: 'Description 1',
    },
  ]

  return (
    <FlatList
      data={data}
      style={{ padding: 10 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            navigation.navigate('JourneyItem', { journeyId: item.id })
          }
        >
          <Card key={item.id}>
            <View
              style={{
                flex: 2,
                overflow: 'hidden',
              }}
            >
              <Image
                source={{ uri: item.picture }}
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
