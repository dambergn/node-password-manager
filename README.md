# Node Password Manager
This is a self hosted node based password manager with client side encryption and de-cryption of passwords.

## installed packages
- nodemon
- express
- dotenv
- body-parser
- cors
- readline
- node-cmd
- aes-js
  - https://www.npmjs.com/package/aes-js
- JavaScript Hashing algorythems
 - https://asecuritysite.com/encryption/js04
 - MD5
 - SH1
 - SHA-256
 - SAH-512

## Features
- [x] SSL enabled HTTPS
- [x] Redirect from HTTP to HTTPS
- [x] Client side javascript MD5 hashing
- [x] Client side AES256 bit encryption and de-cryption
- [ ] API to send and store encrypted data on server
- [ ] Login menu
- [ ] Authentication using JWT
- [ ] Prevent site access without authentication
- [ ] Admin page for registering new users
- [ ] Self hosted json database
- [ ] 

## Authentication
1. Connection with server is established via https and SSL cert.
2. User enters their username and password on the client side.
3. Username and password and encoded via Base64.
- look into better solution than Base64.
4. Encoded credentials are sent to server via web API.
5. Server decrypts credentials.
6. Server hashes provided password.
7. Server compares stored username and hashed password in its database.
8. If credentials are verified server sends client a JWT for Authorization.
9. Client recives JWT and saves it in local storage.
10. After client recives a valid JWT it will request page information from server.
11. If server recives a valid JWT in its request, it will provide requested content.