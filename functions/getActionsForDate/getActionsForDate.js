/* eslint-disable */
const Api = require("propublica-congress-sdk");
const client = new Api.CongressAPI({ apiKey: process.env.PROPUBLICA_API_KEY });

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type"
};

function checkOrigin(origin) {
  if (!origin) return false;
  const [protocol, host, port] = origin.split(":");
  if (!host) return false;
  if (
    host === "//localhost" ||
    host === "//127.0.0.1" ||
    host === "//0.0.0.0" ||
    host === "//whatdidcongressdo.today"
  ) {
    return true;
  }
  return false;
}

exports.formatResponse = function(response) {
  const actions =
    (response &&
      response.results &&
      response.results[0] &&
      response.results[0].floor_actions) ||
    [];
  return actions.map(a => ({
    ...a,
    timestamp: new Date(a.timestamp.substring(0, 19))
  }));
};

exports.handler = async function(event, context) {
  if (request.method === "OPTIONS") {
    const origin =
      headers.origin && headers.origin[0] && headers.origin[0].value;
    const response = checkOrigin(origin)
      ? {
          status: "204",
          headers: {
            "access-control-allow-origin": [
              { key: "Access-Control-Allow-Origin", value: origin }
            ],
            // TODO: add any other headers that your app is using
            "access-control-allow-headers": [
              { key: "Access-Control-Allow-Headers", value: "Content-Type" }
            ],
            "access-control-allow-methods": [
              { key: "Access-Control-Allow-Methods", value: "GET, HEAD" }
            ],
            "access-control-allow-credentials": [
              { key: "Access-Control-Allow-Credentials", value: "true" }
            ],
            // TODO: tune your expiry
            "access-control-max-age": [
              { key: "Access-Control-Max-Age", value: "8640000" }
            ]
          }
        }
      : {
          status: "401"
        };
    return response;
  }

  const date = event.queryStringParameters.date
    ? new Date(Number(event.queryStringParameters.date))
    : new Date();
  const chamber = event.queryStringParameters.chamber;

  try {
    const response = await client.getFloorActionsForDate({
      chamber,
      date
    });

    return {
      statusCode: 200,
      body: JSON.stringify(formatResponse(response)),
      headers
    };
  } catch (e) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: e.message
      }),
      headers
    };
  }
};
