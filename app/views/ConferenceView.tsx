import { View } from 'react-native'

import styled from 'styled-components'
import { FlashList } from '@shopify/flash-list'
import ConferenceCard from '../components/Conference/ConferenceCard'
import { useAppSelector } from '../hooks'
import { IConference } from '../models/ConferenceType'

const Container = styled(View)`
  flex: 1;
  width: 100%;
`

function ConferenceList() {
  const { conferences } = useAppSelector(state => state.conferences)

  return (
    <Container>
      <FlashList
        contentContainerStyle={{ paddingBottom: 100 }}
        data={conferences as IConference[]}
        renderItem={({ item }) => <ConferenceCard conference={item} />}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={100}
      />
    </Container>
  )
}

export default ConferenceList
