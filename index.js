#!/usr/bin/nodemon
'use strict';

const fs = require('fs');
var nodemon = require('nodemon');
try {
  if (!fs.existsSync('.env')) {
    console.log('***************************************************');
    console.log('***Please run ./setup.sh or configure .env file!***');
    console.log('***************************************************');
    nodemon.emit('quit');
  }
} catch (err) { console.error(err) }
require('dotenv').config();
const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const readline = require('readline');
const cmd = require('node-cmd');

const md5 = require('./modules/md5.js');
const sh1 = require('./modules/sh1.js');
const sha256 = require('./modules/sha256.js');
const sha512 = require('./modules/sha512.js');

const PORT = process.env.PORT || 3000;
const PORTS = process.env.PORTS || 8080;
const options = {
  key: fs.readFileSync(process.env.KEY),
  cert: fs.readFileSync(process.env.CERT),
};

// Clears any lingering usage of these ports
// cmd.run('fuser -k 3000/tcp');
// cmd.run('fuser -k 8080/tcp');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.enable('trust proxy');



//Web Front End
app.use(function (req, res, next) {
  if (req.secure) {
    // request was via https, so do no special handling
    next();
  } else {
    // request was via http, so redirect to https
    res.redirect('https://' + req.headers.host.split(':')[0] + ':' + PORTS + req.url);
  }
});
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

function serverIncriment() {
  let nodePackage = JSON.parse(fs.readFileSync('package.json'));
  let formatting = nodePackage.version.split('.');
  formatting[2]++;

  return nodePackage.version
}

app.listen(PORT, () => {
  console.log('HTTP Listening on port:', PORT, 'use CTRL+C to close.')
  // console.log('Server started:', new Date());
  // console.log('Currently running on Version', serverIncriment())
});

const server = https.createServer(options, app).listen(PORTS, function () {
  console.log('HTTPS Listening on port:', PORTS, 'use CTRL+C to close.')
  console.log('Server started:', new Date());
  console.log('Currently running on Version', serverIncriment())
});

// Admin console commands
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  if (input.split(' ')[0] === 'md5') {
    console.log('md5:', md5.hex(input.substr(input.indexOf(' ') + 1)));
  } else if (input.split(' ')[0] === 'sh1') {
    console.log('sh1:', sh1.hex(input.substr(input.indexOf(' ') + 1)));
  } else if (input.split(' ')[0] === 'sha256') {
    console.log('sha256:', sha256.hex(input.substr(input.indexOf(' ') + 1)));
  } else if (input.split(' ')[0] === 'sha512') {
    console.log('sha512:', sha512.hex(input.substr(input.indexOf(' ') + 1)));
  } else {
    console.log(input, 'is not a valid input')
  };
});