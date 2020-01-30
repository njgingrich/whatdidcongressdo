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

function handleCORS(event) {
  const {
    headers: { origin }
  } = event;

  console.log("origin:", origin);

  const response = checkOrigin(origin)
    ? {
        statusCode: 204,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Headers": "Content-Type,accept",
          "Access-Control-Allow-Methods": "GET, HEAD",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Max-Age": "8640000"
        },
        body: ""
      }
    : {
        statusCode: 401,
        body: ""
      };
  return response;
}

const responseHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type"
};

module.exports = {
  makeRequest: async (event, context, func) => {
    if (event.httpMethod === "OPTIONS") return handleCORS(event);

    const toReturn = await func(event, context);
    console.log("to return:", { headers: responseHeaders, ...toReturn });
    return () => ({ headers: responseHeaders, ...toReturn });
  }
};
