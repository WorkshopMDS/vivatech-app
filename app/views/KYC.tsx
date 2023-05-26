import styled from 'styled-components'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { getInterests } from '../store/actions/interests.actions'
import { useAppDispatch, useAppSelector } from '../hooks'
import { addUserKYC } from '../store/actions/kyc.actions'

export type IInterest = {
  label: string
  id: string
}

function KYC({ colors }: any) {
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

  const Label = styled(Text)`
    text-align: center;
    font-size: 16px;

    padding: 5px;
    padding-bottom: 0px;

    color: white;
  `

  const LabelContainer = styled(Pressable)<{ isActive: boolean }>`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 4px;
    margin-bottom: 0px;
    height: 30px;

    border-radius: 8px;
    background-color: ${({ isActive }) =>
      isActive ? colors.primary : colors.orange};
  `

  const Title = styled(Text)`
    font-size: 20px;
    font-weight: bold;
    margin: 10px;
    align-self: center;
    color: ${() => colors.text};
  `

  const Valider = styled(Pressable)`
    margin: 10px;
    align-self: center;
    color: ${() => colors.text};
    background-color: ${() => colors.primary};
    padding: 10px;
    border-radius: 8px;
    width: 100px;
    align-items: center;
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
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
        paddingBottom: 64,
        paddingHorizontal: 4,
      }}
    >
      <Title>Choississez jusqu&lsquo;à 5 centres d&lsquo;interêts</Title>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {sortedInterests.map((item: IInterest) => (
          <LabelContainer
            key={item.id}
            onPress={() => addInterest(item.label)}
            isActive={listInterest.includes(item.label)}
          >
            <Label>{item.label}</Label>
          </LabelContainer>
        ))}
      </ScrollView>
      <Valider onPress={() => sendUserInterests()}>
        <Text style={{ color: 'white', fontSize: 24 }}>Valider</Text>
      </Valider>
    </View>
  )
}

export default KYC
