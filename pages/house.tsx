import React, { Fragment, useState } from 'react'
import fetch from 'isomorphic-unfetch'
import { useQuery } from 'react-query';

import Vote from '../components/Vote';

import testData from '../static/testing/house.json'
import { Container, VotePane } from '../styles/util.js';

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
    <Fragment>
      <h1>House</h1>
      <Container>
        <VotePane>
          <h3>Votes</h3>
          <h3>Floor Actions</h3>
          <div>
            {(data || []).map(vote => <Vote {...vote} />)}
          </div>
          <div />
        </VotePane>
      </Container>
    </Fragment>
  )
}
