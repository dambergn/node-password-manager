'use strict';
// CLI Password manager client.

const readline = require('readline');
const fetch = require('node-fetch');
const Base64 = require('js-base64').Base64;
const https = require("https");
const httpsAgent = new https.Agent({
  // keepAlive: true,
  rejectUnauthorized: false
})

let url = 'https://localhost:8080';
// let url = 'https://10.4.88.17:8080';

let jwt = null

function login(userName, password) {
  let loginInfo = {
    username: userName,
    password: password
  }
  let loginInfoStringified = JSON.stringify(loginInfo);
  let loginInfoEncoded = Base64.encode(loginInfoStringified);
  fetch(`${url}/api/login`, {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    body: loginInfoEncoded,
    agent: httpsAgent
  })
    .then(res => res.json())
    .then(json => {
      console.log("token:", json.jwToken)
      if(json.JwToken === 'Not Authenticated'){
        console.log('Incorrect User Name or Password')
      } else {
        jwt = json.jwToken
        console.log("Login Successfull")
      }
    });
}

// Admin console commands
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

if(jwt === null){
  console.log('Please log in')
  rl.question("Username: ", (userName) => {
    rl.question("Password: ", (password) => {
      login(userName, password)
      // rl.close();
    })
  })
}

rl.on('line', (input) => {
  if (input.split(' ')[0] === 'man') {
    // CLI.manual();
    console.log('manual')
  } else if (input.split(' ')[0] === 'md5') {
    console.log("md5:", CLI.md5(input.substr(input.indexOf(' ') + 1)))
  } else if (input.split(' ')[0] === 'sh1') {
    console.log("sha1:", CLI.sh1(input.substr(input.indexOf(' ') + 1)));
  } else if (input.split(' ')[0] === 'sha256') {
    console.log("sha256:", CLI.sha256(input.substr(input.indexOf(' ') + 1)));
  } else if (input.split(' ')[0] === 'sha512') {
    console.log("sha512:", CLI.sha512(input.substr(input.indexOf(' ') + 1)));
  } else if (input.split(' ')[0] === 'pbkdf2') {
    CLI.pbkdf2(input.substr(input.indexOf(' ') + 1));
  } else if (input.split(' ')[0] === 'exit') {
    // console.log("Users:", users);
    rl.close();
  } else {
    console.log(input, 'is not a valid input')
  };
});

rl.on("close", () => {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});