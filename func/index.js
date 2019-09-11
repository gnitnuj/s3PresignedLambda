const fetch = require("node-fetch");
const go = require("goify-promise");

exports.handler = async (event, context, callback) => {
  if (!event) {
    return;
  }

  const queryStringParameters = event["queryStringParameters"];
  const verboseMode = queryStringParameters.verbose ? queryStringParameters.verbose : false;

  if (!queryStringParameters.param1) {
    return callback(new Error(`missing required param`));
  }

  const url = `some-example-endpoint-to-hit`;
  let err, response;
  [err, response] = await go(
    fetch(url, {
      method: "GET",
      headers: {}
    })
  );
  if (err) {
    console.info(`url: ${url}`);
    return callback(new Error(`error fetching json from ${url}: ${err}`));
  }

  let json;
  [err, json] = await go(response.json());
  if (err) {
    console.info(`json: ${JSON.stringify(json)}`);
    return callback(new Error(`error parsing json from fetch promise: ${err}`));
  }

  if (verboseMode) {
    console.log(`Final Response: ${JSON.stringify(json, undefined, 2)}`);
  }

  callback(null, {
    statusCode: "200",
    body: JSON.stringify(json),
    headers: {
      "Content-Type": "text/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    }
  });
};

exports.handler();
