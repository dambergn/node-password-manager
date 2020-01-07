'use strict';
console.log('links loaded sucessfully')

const url = 'https://' + window.location.href.split('/')[2]
console.log('URL:', url)
document.write(`<a href=${url}/index.html>Login</a><br>`)
document.write(`<a href=${url}/passwords.html>Passwords</a><br>`)
document.write(`<a href=${url}/manual.html>Manual</a><br>`)
document.write(`<a href=${url}/admin/>Admin</a><br>`)