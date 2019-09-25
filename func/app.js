#!/usr/bin/env node

const argv = require('yargs').argv

const args = {
    queryStringParameters: {
        verbose: argv.verbose ? argv.verbose : false
    }
};

console.log(require('./index').handler(args, {}, function () { }));
