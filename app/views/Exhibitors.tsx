import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import styled from 'styled-components'
import Card from '../components/ExhibitorCard'

const Container = styled(SafeAreaView)`
  flex: 1;
`

type Exhibitors = {
  name: string
  interests: string[]
  picture: string
}

function Exhibitors() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Exhibitors[]>([])

  useEffect(() => {
    fetch('https://viva-api.fly.dev/exhibitors', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTM2MTBjOWFiZjlmZWJjZWRjMGI3YyIsImVtYWlsIjoiaGFubmFfbW9uYWhhbjUyQGdtYWlsLmNvbSIsInJvbGUiOjE5MzAsImlhdCI6MTY4MzE4NTkzMiwiZXhwIjoxNjgzMTg3NzMyfQ.qifcB9lluehX36bR4lbuZZHqKlwZwI6IOw3iXIyKImQ',
      },
    })
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Container>
      <FlashList
        data={[...data]}
        renderItem={({ item }) => (
          <Card
            name={item.name}
            interests={item.interests}
            picture={item.picture}
          />
        )}
        estimatedItemSize={20}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </Container>
  )
}

export default Exhibitors
