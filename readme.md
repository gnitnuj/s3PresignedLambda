## Getting Started

These instructions will get your copy of the project up and running on your local machine for development and deployment purposes. See deployment for notes on how to deploy the project on a live system, and some additional good-to-knows.

### Prerequisites

1. assuming you have osx, brew, python/pip & aws lambda access then...
    ```
    pip install awscli --upgrade --user
    ```
    ^ make sure you can log in after install

    ```
    brew install node
    ```
    ^ v8+ because this lambda function depends on it

## Testing Locally

**Examples**:
```
node func/app.js --param1=param1 --verbose
```

## Deployment

run the deploy script `deploy-function-code.sh`

## Deployment Good-to-Knows

- the func folder zipped, then uploaded/deployed
- the node_modules folder as well, as there is no way to install dependencies, so everything must be packaged together and uploaded
- aws does automatic versioning, so logging and errors are tied to deploys in CloudWatch

## Additional Information

### Endpoint
- Example URL: `https://random-uuid-goes-here.execute-api.us-east-1.amazonaws.com/default/lambda-name-goes-here`
- Test Using URL: `https://random-uuid-goes-here.execute-api.us-east-1.amazonaws.com/default/lambda-name-goes-here/?param1=param1&param2=-param2`

### Expected Query Params
1. _Required Param_: `param1` - blah blah blah
1. _Optional Param_: `param2` - blah blah blah

### Expected Response Payload
1. Some random JSON blah blah blah
