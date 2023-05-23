import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components'
import Card from '../Filter/FilterCard'

type Interests = {
  id: string
  label: string
}

const Container = styled(View)`
  flex: 1;
`

function FilterView() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Interests[]>([])

  useEffect(() => {
    fetch('https://viva-api.fly.dev/interests', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTM2MTBjOWFiZjlmZWJjZWRjMGI3YyIsImVtYWlsIjoiaGFubmFfbW9uYWhhbjUyQGdtYWlsLmNvbSIsInJvbGUiOjE5MzAsImlhdCI6MTY4MzE4NTkzMiwiZXhwIjoxNjgzMTg3NzMyfQ.qifcB9lluehX36bR4lbuZZHqKlwZwI6IOw3iXIyKImQ',
      },
    })
      .then(response => response.json())
      .then(json => setData(json.data))
      .finally(() => setLoading(false))
  }, [])

  const handleCardPress = (itemId: string) => {
    navigation.navigate('ExhibitorsView', { id: itemId })
  }

  return (
    <Container>
      <FlashList
        data={[...data]}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 5 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCardPress(item.id)}>
            <Card interests={item.label} />
          </TouchableOpacity>
        )}
        estimatedItemSize={20}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </Container>
  )
}

export default FilterView
