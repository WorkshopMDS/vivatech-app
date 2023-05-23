import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import styled from 'styled-components'
import Card from './ExhibitorCard'

const Container = styled(View)`
  flex: 1;
`

type Exhibitors = {
  name: string
  interests: string[]
  picture: string
}

function Exhibitors(interestId: string) {
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
      .then(response => response.json())
      .then(json => {
        // Filter the data based on interestId
        const filteredData = json.data.filter((exhibitor: Exhibitors) =>
          exhibitor.interests.includes(interestId),
        )
        setData(filteredData)
      })
      .finally(() => setLoading(false))
  }, [interestId])

  return (
    <Container>
      <FlashList
        data={[...data]}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 5 }}
        renderItem={({ item }) => (
          <Card name={item.name} picture={item.picture} />
        )}
        estimatedItemSize={20}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </Container>
  )
}

export default Exhibitors
