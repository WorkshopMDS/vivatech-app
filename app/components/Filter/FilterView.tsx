import { useState } from 'react'
import { ActivityIndicator, Pressable, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import styled from 'styled-components'
import { useAppSelector } from '../../hooks'
import Card from '../Filter/FilterCard'

const Container = styled(View)`
  flex: 1;
`

function FilterView({ navigation }) {
  const [loading] = useState(false)
  const { interests } = useAppSelector(state => state.interests)

  const handleCardPress = (itemId: string) => {
    navigation.navigate('Exposants', { interestId: itemId })
  }

  return (
    <Container>
      {!!interests.length && (
        <FlashList
          data={[...interests]}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 5 }}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleCardPress(item.id)}>
              <Card interests={item.label} />
            </Pressable>
          )}
          estimatedItemSize={20}
          ListFooterComponent={loading ? <ActivityIndicator /> : null}
        />
      )}
    </Container>
  )
}

export default FilterView
