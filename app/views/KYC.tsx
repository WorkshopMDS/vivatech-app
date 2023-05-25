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
import { getInterests } from '../store/actions/interests.actions'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useCustomTheme } from '../utils/Theme'
import { addUserKYC } from '../store/actions/kyc.actions'

export type IInterest = {
  label: string
  id: string
}

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
    .map((item: IInterest) => {
      return {
        id: item.id,
        label: item.label,
        isActive: false,
      }
    })
    .sort((a: IInterest, b: IInterest) => {
      return a.label.localeCompare(b.label)
    })

  function addInterest(item: string) {
    if (listInterest.length < 5 && !listInterest.includes(item)) {
      const interestIndex = sortedInterests.findIndex(
        (interest: IInterest) => interest.label === item,
      )
      if (interestIndex !== -1) {
        sortedInterests[interestIndex].isActive = true
        setListInterest([...listInterest, item])
      }
    } else if (listInterest.includes(item)) {
      setListInterest([...listInterest.filter((i: string) => i !== item)])
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

  function sendUserInterests() {
    if (listInterest.length === 0)
      Alert.alert("Vous devez choisir au moins un centre d'intérêt")
    else {
      const interestsId = listInterest.map((item: string) => {
        const interestIndex = sortedInterests.findIndex(
          (interest: IInterest) => interest.label === item,
        )
        return sortedInterests[interestIndex].id as string
      })
      dispatch(addUserKYC(interestsId))
    }
  }

  return (
    <SafeAreaView>
      <Title>Choississez jusqu&lsquo;à 5 centres d&lsquo;interêts</Title>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {sortedInterests.map((item: IInterest) => (
          <Pressable key={item.id} onPress={() => addInterest(item.label)}>
            <Label isActive={listInterest.includes(item.label)}>
              {item.label}
            </Label>
          </Pressable>
        ))}
      </ScrollView>
      <Button onPress={() => sendUserInterests()} title="Valider" />
    </SafeAreaView>
  )
}

export default KYC
