import * as React from 'react'
import styled from 'styled-components'
import { FlatList } from 'react-native'

const HorizontalScrollerComponent = styled(FlatList)<{
  data: any
  renderItem: (item: any) => React.ReactNode
  justifyContent?: string
}>`
  flex-direction: row;
  overflow: scroll;
  flex-grow: 0;
`

interface IProps {
  children: React.ReactNode
  justifyContent: string
}

export function HorizontalScroller({ children, justifyContent }: IProps) {
  return (
    <HorizontalScrollerComponent
      data={children}
      horizontal
      renderItem={({ item }) => item}
      showsHorizontalScrollIndicator={false}
      justifyContent={justifyContent}
    />
  )
}
