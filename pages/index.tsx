import React, { Fragment } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

const Title = styled.h1`
  margin: 0;
  font-size: 50px;
  font-family: 'Public Sans Bold';
  color: ${({ theme }) => theme.colors.white};
`

const Background = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  height: calc(100vh - 60px);
  width: 100%;
  z-index: 0;
  background-image: url('/static/images/sotu_full.jpg');
  background-size: cover;
  filter: blur(2px);
`

const Container = styled.main`
  height: calc(100vh - 60px);
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 1;
`

const Home = () => (
  <Fragment>
    <Head>
      <title>Home</title>
    </Head>
    <Container>
      <Title>What did Congress do today?</Title>
    </Container>
    <Background />
  </Fragment>
)

export default Home
