'use strict';
// console.log('links loaded sucessfully')

const url = 'https://' + window.location.href.split('/')[2]
// console.log('URL:', url)
// let localStore = JSON.parse(localStorage.getItem('PWM'))
document.write(`<a href="${url}" style="padding-left: 1em; padding-right: 1em;"/>Login</a>`)
document.write(`<a href="${url}/manual.html" style="padding-left: 1em; padding-right: 1em;">Manual</a>`)
document.write(`<a href="${url}/notes.html" style="padding-left: 1em; padding-right: 1em;">Notes</a>`)
document.write(`<a href="${url}/passwords.html" style="padding-left: 1em; padding-right: 1em;">Passwords</a>`)
document.write(`<a href="${url}/admin/" style="padding-left: 1em; padding-right: 1em;">Admin</a>`)