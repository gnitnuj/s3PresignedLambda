#!/usr/bin/env node

const argv = require('yargs').argv

const args = {
    queryStringParameters: {
        verbose: argv.verbose ? argv.verbose : false
    }
};

if (argv.param1) {
    args.queryStringParameters.param1 = argv.param1;
}

console.log(require('./index').handler(args, {}, function () { }));
