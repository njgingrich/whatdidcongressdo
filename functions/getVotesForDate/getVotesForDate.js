/* eslint-disable */
const Api = require("propublica-congress-sdk");
const client = new Api.CongressAPI({ apiKey: process.env.PROPUBLICA_API_KEY });

exports.handler = async function(event, context) {
  const date = event.queryStringParameters.date
    ? new Date(Number(event.queryStringParameters.date))
    : new Date();
  const chamber = event.queryStringParameters.chamber;

  try {
    const response = await client.getVotesForDate({
      chamber,
      date
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.results)
    };
  } catch (e) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: e.message
      })
    };
  }
};
