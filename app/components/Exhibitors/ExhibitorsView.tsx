import { useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import styled from 'styled-components'
import Card from './ExhibitorCard'
import { useAppSelector } from '../../hooks'

const Container = styled(View)`
  flex: 1;
`

type Exhibitors = {
  name: string
  interests: { label: string; id: string }[]
  picture: string
  sectors: string[]
}

function Exhibitors({ route }) {
  const { interestId } = route.params
  const [loading] = useState(false)

  const { exhibitors } = useAppSelector(state => state.exhibitors)

  const filteredData = exhibitors.filter(item =>
    item.interests?.some(interest => interest.id === interestId),
  )

  return (
    <Container>
      <FlashList
        data={[...filteredData]}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 5 }}
        renderItem={({ item }) => (
          <Card
            name={item.name}
            picture={item.picture}
            sectors={item.sectors}
          />
        )}
        estimatedItemSize={20}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </Container>
  )
}

export default Exhibitors
