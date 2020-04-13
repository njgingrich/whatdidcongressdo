import { useRouter } from 'next/router'
import Link from 'next/link'
import styled, { StyledFunction } from 'styled-components'
import React, { Children } from 'react'

import { HoverLink } from '../styles/util'

interface ActiveLinkProps {
  readonly isActive: boolean;
}

const SActiveLink = styled(HoverLink)<ActiveLinkProps>`
  text-decoration: none;
  background-color: ${({ isActive, theme }) => isActive ? theme.colors.gray_40 : 'initial'};
  color: ${({ isActive, theme }) => isActive ? theme.colors.blue_700 : theme.colors.white};

  :visited {
    color: ${({ isActive, theme }) => isActive ? theme.colors.blue_700 : theme.colors.white};
  }
`

export default function ActiveLink({ children, href, ...props }) {
  const { pathname } = useRouter()

  return (
    <SActiveLink isActive={pathname === href} href={href} {...props}>
      {children}
    </SActiveLink>
  )
}
