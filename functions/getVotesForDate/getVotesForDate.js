/* eslint-disable */
const util = require("../util");
const Api = require("propublica-congress-sdk");
const client = new Api.CongressAPI({ apiKey: process.env.PROPUBLICA_API_KEY });

exports.handler = async function(event, context) {
  if (event.httpMethod === "OPTIONS") return util.handleCORS(event);

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
      body: JSON.stringify(response.results),
      headers: util.headers
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      }),
      headers: util.headers
    };
  }
};

exports.handler = async function(event, context) {
  return util.makeRequest(event, context, async () => {
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
    } catch (err) {
      return {
        statusCode: err.statusCode || 500,
        body: JSON.stringify({
          error: err.message
        })
      };
    }
  });
};
