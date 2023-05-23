import { FlatList, View } from 'react-native'
import { Conference } from '../models/ConferenceType'

import ConferenceCard from '../components/Conference/ConferenceCard'

const data: Conference[] = [
  {
    title: 'Random shitty name number one',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum tempor facilisis. Nunc nec scelerisque enim, sit amet vulputate tortor. Ut et enim urna. Morbi at ligula tortor. Etiam vehicula venenatis justo. Cras condimentum mi tellus, vitae malesuada erat aliquam eu. Sed non finibus nisi. Cras non vestibulum lacus. Donec non diam finibus lectus iaculis facilisis. Phasellus eget dui non magna egestas condimentum a id nisl.`,
    speaker: {
      name: 'Pierre Legrand',
    },
    endAt: new Date('1995-12-17T03:24:00'),
    startAt: new Date('1995-12-17T03:24:00'),
    isPublished: true,
    stage: 1,
  },
  {
    title: 'Random shitty name number Two',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum tempor facilisis. Nunc nec scelerisque enim, sit amet vulputate tortor. Ut et enim urna. Morbi at ligula tortor. Etiam vehicula venenatis justo. Cras condimentum mi tellus, vitae malesuada erat aliquam eu. Sed non finibus nisi. Cras non vestibulum lacus. Donec non diam finibus lectus iaculis facilisis. Phasellus eget dui non magna egestas condimentum a id nisl.`,
    speaker: {
      name: 'Pierre Legrand',
    },
    endAt: new Date('1995-12-17T03:24:00'),
    startAt: new Date('1995-12-17T03:24:00'),
    isPublished: true,
    stage: 1,
  },
  {
    title: 'Random shitty name number Trrhee',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum tempor facilisis. Nunc nec scelerisque enim, sit amet vulputate tortor. Ut et enim urna. Morbi at ligula tortor. Etiam vehicula venenatis justo. Cras condimentum mi tellus, vitae malesuada erat aliquam eu. Sed non finibus nisi. Cras non vestibulum lacus. Donec non diam finibus lectus iaculis facilisis. Phasellus eget dui non magna egestas condimentum a id nisl.`,
    speaker: {
      name: 'Pierre Emanuel',
    },
    endAt: new Date('1995-12-17T03:24:00'),
    startAt: new Date('1995-12-17T03:24:00'),
    isPublished: true,
    stage: 2,
  },
  {
    title: 'Random shitty name number four',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum tempor facilisis. Nunc nec scelerisque enim, sit amet vulputate tortor. Ut et enim urna. Morbi at ligula tortor. Etiam vehicula venenatis justo. Cras condimentum mi tellus, vitae malesuada erat aliquam eu. Sed non finibus nisi. Cras non vestibulum lacus. Donec non diam finibus lectus iaculis facilisis. Phasellus eget dui non magna egestas condimentum a id nisl.`,
    speaker: {
      name: 'Pierre Legrand',
    },
    endAt: new Date('1995-12-17T03:24:00'),
    startAt: new Date('1995-12-17T03:24:00'),
    isPublished: false,
    stage: 1,
  },
]

function ConferenceList() {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <ConferenceCard conference={item} />}
        keyExtractor={item => item.title}
      />
    </View>
  )
}

export default ConferenceList
