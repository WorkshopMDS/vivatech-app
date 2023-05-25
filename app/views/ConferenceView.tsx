import { FlatList, View } from 'react-native'

import styled from 'styled-components'
import ConferenceCard from '../components/Conference/ConferenceCard'
import { useAppSelector } from '../hooks'

const Container = styled(View)`
  flex: 1;
  width: 100%;
`

function ConferenceList() {
  const { conferences } = useAppSelector(state => state.conferences)

  return (
    <Container>
      <FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
        data={conferences}
        renderItem={({ item, index }) => (
          <ConferenceCard conference={item} key={index} />
        )}
      />
    </Container>
  )
}

export default ConferenceList
