import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components'
import { FlatList } from 'react-native'
import Card from '../components/ExhibitorCard'

const Container = styled(SafeAreaView)`
  flex: 1;
`

const List = styled(FlatList)`
  flex: 1;
  flex-direction: column;
  margin-bottom: 80px;
`

function Exhibitors() {
  return (
    <Container>
      <List
        data={[
          {
            key: 'ManpowerGroup',
            name: 'ManpowerGroup',
            interest: ['Finance'],
            sectors: ['HR', 'Training', 'Education'],
            logo: 'https://storageprdv2inwink.blob.core.windows.net/abf9dc9e-3c12-4999-b77b-9e1614c9760d/42334d49-d01d-454d-ad73-bb4212c843e71',
          },
          {
            key: '50inTech',
            name: '50inTech',
            interest: ['HR', 'Training', 'Education'],
            sectors: ['Future of Work'],
            logo: 'https://storageprdv2inwink.blob.core.windows.net/abf9dc9e-3c12-4999-b77b-9e1614c9760d/0c100408-bf85-4afc-89e3-3bd26fdef2d21',
          },
          {
            key: 'Binance',
            name: 'Binance',
            interest: ['Blockchain, NFT, Crypto &amp; Web3'],
            sectors: ['Information technologies'],
            logo: 'https://storageprdv2inwink.blob.core.windows.net/abf9dc9e-3c12-4999-b77b-9e1614c9760d/856f9a70-c65b-447e-b073-7a37c224da101',
          },
          {
            key: 'LA POSTE GROUPE',
            name: 'LA POSTE GROUPE',
            interest: ['Personal Services'],
            sectors: ['Personal Services'],
            logo: 'https://storageprdv2inwink.blob.core.windows.net/abf9dc9e-3c12-4999-b77b-9e1614c9760d/866dbb24-7b0d-4a83-baa8-a2d3ec1f434f1',
          },
          {
            key: 'Test2',
            name: 'Test2',
            interest: ['Crypto', 'Finance', 'Blockchain'],
            logo: 'https://storageprdv2inwink.blob.core.windows.net/abf9dc9e-3c12-4999-b77b-9e1614c9760d/42334d49-d01d-454d-ad73-bb4212c843e71',
          },
          {
            key: 'Test3',
            name: 'Test3',
            interest: ['Crypto', 'Finance', 'Blockchain'],
            logo: 'https://storageprdv2inwink.blob.core.windows.net/abf9dc9e-3c12-4999-b77b-9e1614c9760d/42334d49-d01d-454d-ad73-bb4212c843e71',
          },
        ]}
        renderItem={({ item }) => (
          <Card
            name={item.name}
            interest={item.interest}
            sectors={item.sectors}
            logo={item.logo}
          />
        )}
      />
    </Container>
  )
}

export default Exhibitors
