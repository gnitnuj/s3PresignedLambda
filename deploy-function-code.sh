#!/bin/bash

rm -f func.zip

pushd func
yarn install
zip -r ../func.zip *
popd

aws lambda update-function-configuration \
    --function-name "funtion-name" \
    --region "us-east-1"

aws lambda update-function-code \
    --function-name "funtion-name" \
    --zip-file "fileb://./func.zip" \
    --region "us-east-1"