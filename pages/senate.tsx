import React, { Fragment } from 'react'
import fetch from 'isomorphic-unfetch'

export default function SenatePage({ votes }) {
  return (
    <Fragment>
      <h1>Senate</h1>
      {votes.map(vote => vote.toString())}
    </Fragment>
  )
}
SenatePage.getInitialProps = async () => {
  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://whatdidcongressdo.today'
    : 'http://localhost:34567'
  try {
    const url = `${baseUrl}/getVotesForDate?date=${(new Date()).getTime()}&chamber=senate`;
    console.log('url:', url);
    const res = await fetch(url, { headers: { accept: "Accept: application/json" } });
    const json = await res.json();
    // const json = JSON.parse('{"chamber":"Senate","start_date":"2020-01-25","end_date":"2020-01-25","num_results":0,"votes":[]}');
  
    return {
      votes: json.votes,
    };
  } catch (e) {
    console.log(e);
    return { votes: [] };
  }
}
