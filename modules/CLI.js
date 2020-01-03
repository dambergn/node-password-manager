'use strict';
/* This file contains all of the command line options and the manual for those commands.*/

const md5 = require('./md5.js');
const sh1 = require('./sh1.js');
const sha256 = require('./sha256.js');
const sha512 = require('./sha512.js');
const keyStretch = require('./pbkdf2.js');

exports.manual = function () {
  console.log('***Manual Page***');
  console.log('**Avilable Commands**');
  console.log('md5 <to be hased>');
  console.log('sh1 <to be hased>');
  console.log('sha256 <to be hased>');
  console.log('sha512 <to be hased>');
};

exports.md5 = function (toBeHashed) {
  // console.log('md5:', md5.hex(toBeHashed));
  return md5.hex(toBeHashed)
};

exports.sh1 = function (toBeHashed) {
  // console.log('sh1:', sh1.hex(toBeHashed));
  return sh1.hex(toBeHashed)
};

exports.sha256 = function (toBeHashed) {
  // console.log('sha256:', sha256.hex(toBeHashed));
  return sha256.hex(toBeHashed)
};

exports.sha512 = function (toBeHashed) {
  // console.log('sha512:', sha512.hex(toBeHashed));
  return sha512.hex(toBeHashed)
};

exports.pbkdf2 = function (password){
  let salt = 1
  let iterations = 1000
  let len = 32
  let hashType = sha512.hex(password)
  console.log(keyStretch.pbkdf2(password, salt, iterations, len, hashType));
};