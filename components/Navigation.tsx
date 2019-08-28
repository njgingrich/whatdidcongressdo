import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const TopNav = styled.nav`
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;

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

  a, a:active, a:visited {
    display: block;
    padding: ${({ theme }) => `${theme.space[0]}px ${theme.space[1]}px`};

    text-decoration: none;
    font-family: 'Public Sans Bold';
    font-size: ${({ theme }) => theme.fontSizes.large}px;
    color: ${({ theme }) => theme.colors.white};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};

    a {
      color: ${({ theme }) => theme.colors.blue_700};
    }
  }
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
            <a>Home</a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href='/house'>
            <a>House</a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href='/senate'>
            <a>Senate</a>
          </Link>
        </NavItem>
        <RightAlignedLi>
          <Link href='/about'>
            <a>About</a>
          </Link>
        </RightAlignedLi>
      </ul>
    </TopNav>
  )
}
