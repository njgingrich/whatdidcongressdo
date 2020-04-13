import React, { Fragment, useState } from 'react'
import fetch from 'isomorphic-unfetch'
import { useQuery } from 'react-query';
import styled from 'styled-components';

import testVotesData from '../static/testing/house.json'
import testActionsData from '../static/testing/house_floor.json'
import { bucketActivities } from '../util/getActivitiesForDate';
import { formatResponse as formatVotes } from "../functions/getVotesForDate/getVotesForDate";
import { formatResponse as formatActions } from "../functions/getActionsForDate/getActionsForDate";
import Timeline from '../components/Timeline';
import ActiveLink from '../components/ActiveLink';

const baseUrl = process.env.NODE_ENV === 'production'
? 'https://whatdidcongressdo.today'
: 'http://localhost:34567'
const url = `${baseUrl}/getVotesForDate?date=${(new Date()).getTime()}&chamber=house`;

async function fetchHouseData() {
  try {
    // const res = await fetch(url, { headers: { accept: "Accept: application/json" } });
    // const json = await res.json();
    const votes = formatVotes(testVotesData);
    const actions = formatActions(testActionsData);
    console.log(bucketActivities(actions, votes));
    return bucketActivities(actions, votes);
  } catch {
    return [];
  }
}

export default function HousePage() {
  // const { data, isLoading, error } = useQuery('houseData', fetchHouseData);
  const votes = formatVotes(testVotesData);
  const actions = formatActions(testActionsData);
  const data = bucketActivities(actions, votes);
  console.log(data);

  return (
    <Container>
      <Title>The House</Title>
      <HouseNav>
        <ul>
          <li><ActiveLink href="/house">Timeline</ActiveLink></li>
          <li><ActiveLink href="#committees">Committees</ActiveLink></li>
        </ul>
      </HouseNav>
      <Page>
        <Timeline activities={data} />
      </Page>
    </Container>
  )
}

const Container = styled.main`
  max-width: 80%;
  margin: 0 auto 4rem auto;
  color: ${({ theme }) => theme.colors.black};

  @media screen and (min-width: 1500px) {
    max-width: 1200px;
  }
`

const Title = styled.h1`
  margin-top: 3rem;
  margin-bottom: 1rem;
  font-size: 48px;
  color: ${({ theme }) => theme.colors.white};
`

const Page = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 16px 4px ${({ theme }) => theme.colors.black};
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
    margin: 0 0.75rem;
  }

  a {
    font-weight: bold;
    font-size: 24px;
    text-decoration: none;
    padding: 0.25rem 0.5rem;
  }

  a:hover {
    background-color: ${({ theme }) => theme.colors.blue_700};
    color: ${({ theme }) => theme.colors.white};
  }
`