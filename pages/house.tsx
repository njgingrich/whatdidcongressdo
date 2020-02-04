import React, { Fragment, useState } from 'react'
import fetch from 'isomorphic-unfetch'
import { useQuery } from 'react-query';
import styled from 'styled-components';

import Vote from '../components/Vote';

import testData from '../static/testing/house.json'

const baseUrl = process.env.NODE_ENV === 'production'
? 'https://whatdidcongressdo.today'
: 'http://localhost:34567'
const url = `${baseUrl}/getVotesForDate?date=${(new Date()).getTime()}&chamber=house`;

async function fetchHouseVotes() {
  try {
    // const res = await fetch(url, { headers: { accept: "Accept: application/json" } });
    // const json = await res.json();
    return testData.results.votes;
  } catch {
    return [];
  }
}

export default function HousePage() {
  const { data, isLoading, error } = useQuery('houseVotes', fetchHouseVotes);

  return (
    <Container>
      <Title>The House</Title>
      <HouseNav>
        <ul>
          <li><a href="#timeline">Timeline</a></li>
          <li><a href="#committees">Committees</a></li>
        </ul>
      </HouseNav>
      <Page>
        {(data || []).map(vote => <Vote {...vote} />)}
      </Page>
    </Container>
  )
}

const Container = styled.main`
  max-width: 976px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.black};
`

const Title = styled.h1`
  margin-top: 3rem;
  margin-bottom: 1rem;
  font-size: 48px;
  color: ${({ theme }) => theme.colors.white};
`

const Page = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 2rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.white};
`

const HouseNav = styled.nav`
  ul {
    display: flex;
    padding-left: 0;
    margin: 0.75rem 0;
    list-style-type: none;
  }

  li:not(:last-child)::after {
    content: "/";
    font-weight: bold;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.white};
    position: relative;
    margin: 0 0.5rem;
  }

  a {
    font-weight: bold;
    font-size: 24px;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.white};
    margin: 0 0.25rem;
    padding: 0.25rem 0.5rem;
  }

  a:visited {
    color: ${({ theme }) => theme.colors.white};
  }

  a:hover {
    background-color: ${({ theme }) => theme.colors.blue_700};
  }
`