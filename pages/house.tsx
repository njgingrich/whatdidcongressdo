import React, { Fragment, useState } from 'react'
import fetch from 'isomorphic-unfetch'
import { useQuery } from 'react-query';

const baseUrl = process.env.NODE_ENV === 'production'
? 'https://whatdidcongressdo.today'
: 'http://localhost:34567'
const url = `${baseUrl}/getVotesForDate?date=${(new Date()).getTime()}&chamber=house`;

async function fetchHouseVotes() {
  try {
    const res = await fetch(url, { headers: { accept: "Accept: application/json" } });
    const json = await res.json();
    return json.votes;
  } catch {
    return [];
  }
}

export default function HousePage() {
  const { data, isLoading, error } = useQuery('houseVotes', fetchHouseVotes);

  return (
    <Fragment>
      <h1>House</h1>
      {(data || []).map(vote => vote.toString())}
    </Fragment>
  )
}
