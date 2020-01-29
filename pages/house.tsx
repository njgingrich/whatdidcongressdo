import React, { Fragment } from 'react'
import fetch from 'isomorphic-unfetch'

export default function HousePage({ votes }) {
  return (
    <Fragment>
      <h1>House</h1>
      {votes.map(vote => vote.toString())}
    </Fragment>
  )
}
HousePage.getInitialProps = async () => {
  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://whatdidcongressdo.today'
    : 'http://localhost:34567'

  try {
    const url = `${baseUrl}/getVotesForDate?date=${(new Date()).getTime()}&chamber=house`;
    const res = await fetch(url, { headers: { accept: "Accept: application/json" } });
    const json = await res.json();
    return {
      votes: json.votes,
    };
  } catch (e) {
    return { votes: [] };
  }
}
