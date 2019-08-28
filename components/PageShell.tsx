import React from 'react'
import styled from 'styled-components'

const Shell = styled.div`
  min-height: 100vh;
  padding-top: 60px;

  background-color: ${({ theme }) => theme.colors.blue_800};
`

export default function PageShell({ children }) {
  return <Shell>{children}</Shell>
}
