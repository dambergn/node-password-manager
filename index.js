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
const Base64 = require('js-base64').Base64;
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const readline = require('readline');
const cmd = require('node-cmd');

const CLI = require('./modules/CLI.js');

const PORT = process.env.PORT || 3000;
const PORTS = process.env.PORTS || 8080;
const options = {
  key: fs.readFileSync(process.env.KEY),
  cert: fs.readFileSync(process.env.CERT),
};
const tokenExperation = '1d';

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

app.post('/api/test', (req, res) => {
  console.log('test api hit')
  console.log('REQUEST', req.body)
  res.send(200)
});

app.post('/api/login', (req, res) => {
  console.log('login api hit')
  let loginInfoBase64 = Object.keys(req.body)[0];
  let loginInfoDecoded = Base64.decode(loginInfoBase64);
  let loginInfo = JSON.parse(loginInfoDecoded);
  let userName = loginInfo.username;
  let password = CLI.sha512(loginInfo.password);
  let authentication = checkUsers(userName, password);
  if (authentication != 'not authenticated') {
    console.log("User is authenticated");
    jwt.sign(authentication, options.key, { expiresIn: tokenExperation }, (err, token) => {
      if (err) {
        console.log("error:", err)
      }
      // console.log('RESPONSE:', res.json({jwToken: token}))
      res.json({jwToken: token})
    });
  } else {
    console.log("Incorrect username or password");
    res.json({ jwToken: 'Not Authenticated' });
  }
});

app.post('/admin/api/register', verifyTokenAdmin, (req, res) => {
  let registerInfo = req.body;
  console.log("Body:", req.body);
  registerInfo.password = CLI.sha512(registerInfo.password);
  users.push(registerInfo);
  fs.writeFileSync('database/0users.json', JSON.stringify(users));
  // cmd.run(`echo "[]" >> database/${registerInfo.username}.json`)
  fs.writeFileSync(`database/${registerInfo.username}.json`, JSON.stringify({"notes":[],"passwords":[]}))
  res.sendStatus(200);
});

app.post('/admin/api/users', verifyTokenAdmin, (req, res) => {
  console.log("requesting users list")
  let usersNoPW = []
  for(let i = 0; i < users.length; i++){
    let user = {
      username: users[i].username,
      email: users[i].email,
      permissions: users[i].permissions
    }
    usersNoPW.push(user);
  }
  res.json(usersNoPW);
})

app.post('/admin/api/users/update', verifyTokenAdmin, (req, res) => {
  let updateInfo = req.body;
  console.log("uppdating user", updateInfo)
  if(updateInfo.username !== users[updateInfo.inDex].username){
    console.log("changing filename from", updateInfo.username, "to", users[updateInfo.inDex].username);
    cmd.run(`mv database/${users[updateInfo.inDex].username}.json database/${updateInfo.username}.json`)
  }
  users[updateInfo.inDex].username = updateInfo.username
  users[updateInfo.inDex].email = updateInfo.email
  users[updateInfo.inDex].permissions = updateInfo.permissions
  fs.writeFileSync('database/0users.json', JSON.stringify(users));
  console.log("userdb: ", users[updateInfo.inDex].username, " updated")
  res.json({'status' : 'success'})
})

// Updates a users password
app.post('/admin/api/users/passup', verifyTokenAdmin, (req, res) => {
  let updatePassword = req.body;
  let newPass = Base64.decode(updatePassword.password);
  let hashed = CLI.sha512(newPass);
  console.log("uppdating user:", Base64.decode(updatePassword.password))
  users[updatePassword.inDex].password = hashed
  fs.writeFileSync('database/0users.json', JSON.stringify(users));
  console.log("Password for: ", users[updatePassword.inDex].username, " updated")
  res.json({'status' : 'success'})
})

app.post('/admin/api/users/delete', verifyTokenAdmin, (req, res) => {
  let deleting = req.body;
  console.log("deleteing user", users[deleting.inDex])
  cmd.run(`rm -rf database/${users[deleting.inDex].username}.json`)
  users.splice(deleting.inDex, 1)
  fs.writeFileSync('database/0users.json', JSON.stringify(users));
  res.json({'status' : 'success'})
})

app.post('/api/users', verifyToken, (req, res) => {
  console.log("requesting users password list")
  let usersList = JSON.parse(fs.readFileSync(`database/${req.body.username}.json`))
  res.json(JSON.stringify(usersList));
})

// Add new Secure Note
app.post('/api/users/add/note', verifyToken, (req, res) => {
  console.log("Adding new entry")
  let toUpdate = JSON.parse(fs.readFileSync(`database/${req.body.username}.json`))
  // console.log("p1:", toUpdate)
  toUpdate.notes.push(JSON.parse(req.body.entry))
  // console.log("p2:", toUpdate)
  fs.writeFileSync(`database/${req.body.username}.json`, JSON.stringify(toUpdate));
  res.json({'status' : 'success'})
})

// Add new username and password entry
app.post('/api/users/add/password', verifyToken, (req, res) => {
  console.log("Adding new entry")
  let toUpdate = JSON.parse(fs.readFileSync(`database/${req.body.username}.json`))
  // console.log("p1:", toUpdate)
  toUpdate.passwords.push(JSON.parse(req.body.entry))
  // console.log("p2:", toUpdate)
  fs.writeFileSync(`database/${req.body.username}.json`, JSON.stringify(toUpdate));
  res.json({'status' : 'success'})
})

// Remove username and password entry
app.post('/api/users/remove/password', verifyToken, (req, res) => {
  console.log("Updating entry from:", req.body.username)
  let toUpdate = JSON.parse(fs.readFileSync(`database/${req.body.username}.json`))
  console.log("updating entry", toUpdate.passwords[req.body.inDex])
  toUpdate.passwords.splice(req.body.inDex, 1)
  fs.writeFileSync(`database/${req.body.username}.json`, JSON.stringify(toUpdate));
  res.json({'status' : 'success'})
})

// Update username and password entry
app.post('/api/users/update/password', verifyToken, (req, res) => {
  console.log("Updating entry from:", req.body.username)
  let toUpdate = JSON.parse(fs.readFileSync(`database/${req.body.username}.json`))
  console.log("updating entry", toUpdate.passwords[req.body.inDex])
  toUpdate.passwords[req.body.inDex] = req.body.update;
  fs.writeFileSync(`database/${req.body.username}.json`, JSON.stringify(toUpdate));
  res.json({'status' : 'success'})
})

app.get('/admin', verifyTokenAdmin, (req, res) => {
  console.log("admin page hit")
  res.sendFile('admin/index.html', { root: './public' });
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
    console.log("md5:", CLI.md5(input.substr(input.indexOf(' ') + 1)))
  } else if (input.split(' ')[0] === 'sh1') {
    console.log("sha1:", CLI.sh1(input.substr(input.indexOf(' ') + 1)));
  } else if (input.split(' ')[0] === 'sha256') {
    console.log("sha256:", CLI.sha256(input.substr(input.indexOf(' ') + 1)));
  } else if (input.split(' ')[0] === 'sha512') {
    console.log("sha512:", CLI.sha512(input.substr(input.indexOf(' ') + 1)));
  } else if (input.split(' ')[0] === 'pbkdf2') {
    CLI.pbkdf2(input.substr(input.indexOf(' ') + 1));
  } else if (input.split(' ')[0] === 'users') {
    console.log("Users:", users);
  } else {
    console.log(input, 'is not a valid input')
  };
});

function checkUsers(userName, password) {
  let userNameFound = false;
  let passwordMatches = false;
  for (let i = 0; i < users.length; i++) {
    if (userName === users[i].username) {
      userNameFound = true;
      if (password === users[i].password) {
        passwordMatches = true;
        return users[i];
      }
    }
  }
  if (userNameFound != true || passwordMatches != true) {
    return 'not authenticated';
  }
};

// Verify Token
function verifyToken(req, res, next) {
  console.log("Verifying Token")
  // Get auth header value
  let bearerHeader = req.headers['authorization'];
  // Check if bearer is undefied
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    let bearer = bearerHeader.split(' ');
    // Get toekn from array
    let bearerToken = bearer[1];
    // set the token
    req.token = JSON.parse(bearerToken)
    // Next middleware
    jwt.verify(req.token, options.key, (err, authData) => {
      if (err) {
        console.log('token error:', err)
        res.sendStatus(403);
      } else {
        // console.log("data:", authData.permissions)
        next();
      }
    })
  } else {
    // Forbidden
    console.log('Not Authorized')
    res.sendStatus(403);
  }
};

// Verify Token Admin
function verifyTokenAdmin(req, res, next) {
  console.log("Verifying Token")
  // Get auth header value
  let bearerHeader = req.headers['authorization'];
  // Check if bearer is undefied
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    let bearer = bearerHeader.split(' ');
    // Get toekn from array
    let bearerToken = bearer[1];
    // set the token
    req.token = JSON.parse(bearerToken) 
    // Next middleware
    jwt.verify(req.token, options.key, (err, authData) => {
      if (err) {
        console.log('token error:', err)
        res.sendStatus(403);
      } else {
        if (authData.permissions === "admin") {
          next();
        } else {
          console.log('Not Authorized')
          res.sendStatus(403);
        }
      }
    })
  } else {
    // Forbidden
    console.log('Not Authorized')
    res.sendStatus(403);
  }
};