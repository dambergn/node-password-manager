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
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const readline = require('readline');
const cmd = require('node-cmd');

const CLI = require('./modules/CLI.js');
// const md5 = require('./modules/md5.js');
// const sh1 = require('./modules/sh1.js');
// const sha256 = require('./modules/sha256.js');
// const sha512 = require('./modules/sha512.js');

const PORT = process.env.PORT || 3000;
const PORTS = process.env.PORTS || 8080;
const options = {
  key: fs.readFileSync(process.env.KEY),
  cert: fs.readFileSync(process.env.CERT),
};

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.enable('trust proxy');

let users = JSON.parse(fs.readFileSync('database/0users.json'));

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

app.post('/api/login', (req, res) => {
  let loginInfo = JSON.parse(Object.keys(req.body)[0]);
  let userName = loginInfo.username;
  let password = CLI.sha512(loginInfo.password);
  console.log('username:', userName, '| Password:', password);
  let authentication = checkUsers(userName, password);
  if (authentication == true){
    console.log("User is authenticated");
    res.status(200);
  } else {
    console.log("Incorrect username or password");
    res.status(403);
  }
})

app.post('/admin/api/register', (req, res) => {
  let registerInfo = JSON.parse(Object.keys(req.body)[0]);
  console.log(registerInfo);
  users.users.push(registerInfo)
})

function serverIncriment() {
  let nodePackage = JSON.parse(fs.readFileSync('package.json'));
  let formatting = nodePackage.version.split('.');
  formatting[2]++;

  return nodePackage.version
}

app.listen(PORT, () => {
  console.log('HTTP Listening on port:', PORT, 'use CTRL+C to close.')
});

const server = https.createServer(options, app).listen(PORTS, function () {
  console.log('HTTPS Listening on port:', PORTS, 'use CTRL+C to close.')
  console.log('Server started:', new Date());
  console.log('Currently running on Version', serverIncriment());
  console.log('Type man to see a list of available CLI commands.');
});

// Admin console commands
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  if (input.split(' ')[0] === 'man') {
    CLI.manual();
  } else if (input.split(' ')[0] === 'md5') {
    CLI.md5(input.substr(input.indexOf(' ') + 1))
  } else if (input.split(' ')[0] === 'sh1') {
    CLI.sh1(input.substr(input.indexOf(' ') + 1));
  } else if (input.split(' ')[0] === 'sha256') {
    CLI.sha256(input.substr(input.indexOf(' ') + 1));
  } else if (input.split(' ')[0] === 'sha512') {
    CLI.sha512(input.substr(input.indexOf(' ') + 1));
  } else if (input.split(' ')[0] === 'users') {
    console.log("Users:", users);
  } else {
    console.log(input, 'is not a valid input')
  };
});

function checkUsers(userName, password) {
  for(let i = 0; i < users.users.length; i++){
    let checkingUser = users.users[i].username;
    let checkingPass = users.users[i].password;
    if (userName === checkingUser){
      if (password === checkingPass){
        return true
      } else {
        console.log("Inncorrect password");
        return false
      }
    } else {
      console.log("Unknown User");
      return false
    }
  }
}