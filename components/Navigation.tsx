import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { HoverLink } from '../styles/util';

const TopNav = styled.nav`
  width: 100%;
  height: 60px;
  position: fixed;
  z-index: 10;
  top: 0;
  background-color: ${({ theme }) => theme.colors.blue_800};

  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    padding-left: 0;
    margin: 0;
    height: 60px;
    list-style-type: none;
  }
`

const NavItem = styled.li`
  margin: ${({ theme }) => theme.space[1]}px;
`

const NavLink = styled(HoverLink)`
  padding: ${({ theme }) => `${theme.space[0]}px ${theme.space[1]}px`};
  text-decoration: none;
  font-family: 'Public Sans Bold';
  font-size: ${({ theme }) => theme.fontSizes.large}px;
`

const RightAlignedLi = styled(NavItem)`
  margin-left: auto;
`

export default function Navigation() {
  return (
    <TopNav>
      <ul>
        <NavItem>
          <Link href='/'>
            <NavLink>Home</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link href='/house'>
            <NavLink>House</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link href='/senate'>
            <NavLink>Senate</NavLink>
          </Link>
        </NavItem>
        <RightAlignedLi>
          <Link href='/about'>
            <NavLink>About</NavLink>
          </Link>
        </RightAlignedLi>
      </ul>
    </TopNav>
  )
}
