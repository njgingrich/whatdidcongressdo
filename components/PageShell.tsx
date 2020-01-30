import React from 'react'
import styled from 'styled-components'

const Shell = styled.div`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding-top: 60px;
`

export default function PageShell({ children }) {
  return <Shell>{children}</Shell>
}
