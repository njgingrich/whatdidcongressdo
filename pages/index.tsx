import React, { Fragment } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Link from 'next/link';

const Title = styled.h1`
  grid-column: 2 / 3;
  grid-row: 1 / 2;

  margin: 0;
  font-size: 64px;
  font-family: 'Public Sans Bold';
  text-transform: capitalize;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`

const Container = styled.main`
  display: grid;
  grid-template-rows: 50vh 12rem 1fr;
  grid-template-columns: 1fr auto 1fr;
  margin: 2rem;
  height: calc(100vh - 60px);
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 1;

  @media screen and (min-width: 1200px) {
    grid-template-rows: 12rem 12rem 1fr;
    grid-template-columns: 5fr auto 2fr;
  }
`

const Content = styled.section`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  max-width: 42rem;
  justify-self: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue_700}BB;

  @media screen and (min-width: 1200px) {
    justify-self: flex-end;
  }

  p {
    margin: 0 0 2rem 0;
    font-size: 20px;
    font-weight: bold;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  
  a {
    font-size: 24px;
    font-weight: bold;
    margin-right: 2rem;
    text-decoration: underline;

    color: ${({ theme }) => theme.colors.white};

    &:active {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`

const Home = () => (
  <Fragment>
    <Head>
      <title>What Did Congress Do Today? - Home</title>
    </Head>
    <Container>
      <Title>What did Congress do today?</Title>
      <Content>
        <p>
          Keep tabs on your elected officials! Get a close look at what happens
          every day in both the Senate and the House of Representatives.
        </p>
        <ButtonContainer>
          <Link href="/house"><a>House ></a></Link>
          <Link href="/senate"><a>Senate ></a></Link>
        </ButtonContainer>
      </Content>
    </Container>
  </Fragment>
)

export default Home
