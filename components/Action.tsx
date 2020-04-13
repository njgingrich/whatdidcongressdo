import React from 'react'
import styled from 'styled-components'
import { formatTimestamp } from '../util/time';

const ActionContainer = styled.section`
  display: grid;
  grid-template-columns: 96px auto;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray_200};
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px 0 ${({ theme }) => theme.colors.black}55;
`

const Timestamp = styled.span`
  font-weight: bold;
`

const ActionText = styled.span``

export default function Action({ description, timestamp }) {
  return (
    <ActionContainer>
      <Timestamp>{formatTimestamp(timestamp)}</Timestamp>
      <ActionText>{description}</ActionText>
    </ActionContainer>
  )
}
