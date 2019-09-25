#!/bin/bash

rm -f func.zip

pushd func
yarn install
zip -r ../func.zip *
popd

aws lambda update-function-configuration \
    --function-name "s3PresignedUrl" \
    --region "us-east-1"

aws lambda update-function-code \
    --function-name "s3PresignedUrl" \
    --zip-file "fileb://./func.zip" \
    --region "us-east-1"