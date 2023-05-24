import { useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import styled from 'styled-components'
import Card from './ExhibitorCard'
import { useAppSelector } from '../../hooks'

const Container = styled(View)`
  flex: 1;
`

export type IInterest = {
  label: string
  id: string
}

export type IExhibitor = {
  name: string
  interests: IInterest[]
  picture: string
  sectors: string[]
  hall: string
  stand: string
}

function Exhibitors({ route }: any) {
  const { interestId } = route.params
  const [loading] = useState(false)

  const { exhibitors } = useAppSelector(state => state.exhibitors)

  const filteredData = exhibitors.filter((item: IExhibitor) =>
    item.interests?.some(interest => interest.id === interestId),
  )

  return (
    <Container>
      <FlashList
        data={[
          ...filteredData.sort((a: IExhibitor, b: IExhibitor) =>
            a.hall.localeCompare(b.hall),
          ),
        ]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 5 }}
        renderItem={({ item }) => <Card exhibitor={item} />}
        estimatedItemSize={20}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </Container>
  )
}

export default Exhibitors
