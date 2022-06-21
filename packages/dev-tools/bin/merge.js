#!/usr/bin/env node
// noinspection ES6ConvertVarToLetConst,JSUnresolvedFunction

var fs = require('fs')
var path = require('path')
var yargs = require('yargs')

var options = yargs
    .usage('Usage: -l <plocal> -r <premote> -o <output>')
    .option('l', { alias: 'packagelocal', describe: 'package.json to merge to', type: 'string', demandOption: true })
    .option('r', { alias: 'packageremote', describe: 'package.json to merge from', type: 'string', demandOption: true })
    .option('o', { alias: 'output', describe: 'output file', type: 'string', demandOption: false, default: 'package.json' })
    .argv

var localPackageJson = require(path.join(process.cwd(), options.l))
var remotePackageJson = require(path.join(process.cwd(), options.r))

Object.assign(localPackageJson.dependencies,  remotePackageJson.dependencies)
Object.assign(localPackageJson.devDependencies,  remotePackageJson.devDependencies)

var output = options.o || 'package.json'

fs.writeFileSync(output, JSON.stringify(localPackageJson, null, 2))
