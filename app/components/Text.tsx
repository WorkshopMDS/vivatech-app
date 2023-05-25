import { Text as ReactText } from 'react-native'
import styled from 'styled-components'

export const Text = styled(ReactText)`
  color: ${({ theme }) => theme.colors.text};
`
