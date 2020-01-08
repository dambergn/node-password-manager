'use strict';
console.log("storage script loaded sucessfully")

let user = ""

function Storage(jwt, user, key) {
  if(jwt == undefined){
    // console.log("no jwt")
    jwt = null;
  }
  if(user == undefined){
    // console.log("no user")
    user = null;
  }
  if(key == undefined){
    // console.log("no key")
    key = null;
  }
  this.jwt = jwt;
  this.user = user;
  this.key = key;
}

function updateLocalStorage(update) {
  let oldStorage = '';

  if (localStorage.length >= 1) {
    // console.log("Pulling local storage")
    oldStorage = JSON.parse(localStorage.getItem('PWM'));
  } else {
    // console.log("No local storage found")
  }

  localStorage.clear();

  let newStorage = new Storage(oldStorage.jwt, oldStorage.user, oldStorage.key);

  if(update.jwt != undefined){
    newStorage.jwt = update.jwt
  }
  if(update.user != undefined){
    newStorage.user = update.user
  }
  if(update.key != undefined){
    newStorage.key = update.key
  }

  localStorage.setItem('PWM', JSON.stringify(newStorage));
}