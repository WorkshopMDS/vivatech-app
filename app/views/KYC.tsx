import styled from 'styled-components'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getInterests } from '../store/actions/interests.actions'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useCustomTheme } from '../utils/Theme'

function KYC() {
  const { colors } = useCustomTheme()
  const dispatch = useAppDispatch()
  const loading = false

  const [listInterest, setListInterest] = useState<string[]>([])

  useEffect(() => {
    dispatch(getInterests())
  }, [dispatch])

  const { interests } = useAppSelector(state => state.interests)

  const sortedInterests = interests
    .map(item => {
      return {
        id: item.id,
        label: item.label,
        isActive: false,
      }
    })
    .sort((a, b) => {
      return a.label.localeCompare(b.label)
    })

  function addInterest(item) {
    if (listInterest.length < 5 && !listInterest.includes(item)) {
      const interestIndex = sortedInterests.findIndex(
        interest => interest.label === item,
      )
      if (interestIndex !== -1) {
        sortedInterests[interestIndex].isActive = true
        setListInterest([...listInterest, item])
      }
    } else if (listInterest.includes(item)) {
      setListInterest([...listInterest.filter(i => i !== item)])
    } else {
      Alert.alert(
        "Vous pouvez choisir seulement 5 centres d'interêts",
        listInterest.join(', '),
      )
    }
  }

  if (loading) {
    return <ActivityIndicator />
  }

  const Label = styled(Text)<{ isActive: boolean }>`
    text-align: center;
    font-size: 16px;
    height: 30px;
    flex: 0;
    padding: 5px;
    padding-bottom: 0px;
    margin: 3px;
    background: ${({ isActive }) =>
      isActive ? colors.primary : colors.orange}};
    color: white;
    border-radius: 10px;
  `

  const Title = styled(Text)`
    font-size: 20px;
    font-weight: bold;
    margin: 10px;
    align-self: center;
    color: ${({ theme }) => theme.colors.text};
  `

  const styles = StyleSheet.create({
    contentContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
  })

  function updateUserInterests() {
    if (listInterest.length === 0)
      Alert.alert("Vous devez choisir au moins un centre d'intérêt")
    else {
      AsyncStorage.setItem('userKyc', JSON.stringify(listInterest))
    }
  }

  return (
    <SafeAreaView>
      <Title>Choississez jusqu&lsquo;à 5 centres d&lsquo;interêts</Title>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {sortedInterests.map(item => (
          <Pressable key={item.id} onPress={() => addInterest(item.label)}>
            <Label isActive={listInterest.includes(item.label)}>
              {item.label}
            </Label>
          </Pressable>
        ))}
      </ScrollView>
      <Button onPress={() => updateUserInterests()} title="Valider" />
    </SafeAreaView>
  )
}

export default KYC
