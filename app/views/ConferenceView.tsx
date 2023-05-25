import { FlatList, View, Text, Pressable, TextInput } from 'react-native'
import { useState } from 'react'
import styled from 'styled-components'
import { AntDesign } from '@expo/vector-icons'
import ConferenceCard from '../components/Conference/ConferenceCard'
import { useAppSelector, useToggle } from '../hooks'
import { IConference } from '../models/ConferenceType'

const Container = styled(View)`
  flex: 1;
`

const FilterConferences = styled(Pressable)`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
  padding-top: 10px;
`
const FilterContent = styled(View)<{ isFilterOpen: boolean }>`
  height: ${({ isFilterOpen }) => (isFilterOpen ? 'auto' : '0')};
  transition: height 7s;
  overflow: hidden;
`

function ConferenceList() {
  const { conferences } = useAppSelector(state => state.conferences)

  const [searchedValue, onSearchedValueChange] = useState('')

  const filteredData = searchedValue
    ? conferences.filter((item: IConference) =>
        item.speaker?.name?.startsWith(searchedValue),
      )
    : conferences

  const [isFilterOpen, toggleFilter] = useToggle(false)

  return (
    <Container>
      <FilterConferences onPress={toggleFilter}>
        <AntDesign name="filter" size={30} color="white" />
      </FilterConferences>
      <FilterContent isFilterOpen={isFilterOpen}>
        <TextInput onChangeText={onSearchedValueChange} value={searchedValue} />
        <Text>Sort</Text>
      </FilterContent>
      <FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
        data={filteredData}
        renderItem={({ item }) => <ConferenceCard conference={item} />}
      />
    </Container>
  )
}

export default ConferenceList
