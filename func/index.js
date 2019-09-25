const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  signatureVersion: 'v4',
});

exports.handler = async (event, context, callback) => {
  if (!event) {
    return;
  }

  if (verboseMode) {
    console.log("Request: " + JSON.stringify(event));
  }

  const queryStringParameters = event["queryStringParameters"];
  const verboseMode = queryStringParameters.verbose ? queryStringParameters.verbose : false;

  if (!queryStringParameters.bucket) {
    return callback(new Error(`missing required param: bucket`));
  }

  if (!queryStringParameters.path) {
    return callback(new Error(`missing required param: path`));
  }

  if (verboseMode) {
    console.log(`Creating URL for Bucket: ${queryStringParameters.bucket} & Path: ${queryStringParameters.path}`);
  }

  const url = s3.getSignedUrl('putObject', {
    Bucket: queryStringParameters.bucket,
    Key: queryStringParameters.path,
    Expires: 300,
  });

  if (verboseMode) {
    console.log(`s3 Presigned URL: ${url}`);
  }

  const responseBody = {
    s3PresignedUrl: url,
  };

  if (verboseMode) {
    console.log(`Final Response: ${JSON.stringify(responseBody, undefined, 2)}`);
  }

  callback(null, {
    statusCode: "200",
    body: JSON.stringify(responseBody),
    headers: {
      "Content-Type": "text/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    }
  });
};

exports.handler();
