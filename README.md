# Node Password Manager
This is a self hosted node based password manager with client side AES encryption and de-cryption of passwords.

## installed packages
- nodemon
- express
- dotenv
- body-parser
- cors
- readline
- node-cmd
- js-base64
- jsonwebtoken
- aes-js
  - https://www.npmjs.com/package/aes-js
- JavaScript Hashing algorithms
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
  - [ ] Hide login if already logged in with logout option
  - [ ] When loged in pull users saved passwords list
  - [ ] show password field as hidden with a view button
  - [ ] Coppy password to clipboard button 
- [x] Authentication using JWT
  - [x] Server side JWT creation
  - [x] Client side saving JWT in local storage
  - [x] Server side verification of JWT from client
- [ ] Prevent site access without authentication
- [/] Self hosted json database
  - [ ] Save database info encrypted
  - [/] Save users login info in single file
  - [ ] Save each users data in their own file
- [ ] Admin Page
  - [ ] Register new user
    - [ ] Verify user does not already exist
    - [ ] Require valid email address
    - [ ] Verify passwords match
  - [x] Require valid JWT to register new user
  - [ ] Require user to have Administrator rights
  - [ ] Update user info
  - [ ] Reset Password
  - [ ] Delete user
  - [x] Page for manual encryption and decryption
    - [x] Use master password for key generation
    - [x] Require master password verification
    - [x] Processign field
    - [x] Encrypt / Decrypt Buttons
    - [x] Resuls field for encrypted or decrypted data
    - [x] Clear buttons for processing and results fields
    - [x] File upload method for processing
    - [x] Save results to text file
    - [x] Field for custom file name
- [ ] Log file method
  - [ ] Login page
  - [ ] Admin page
- [ ] CSS pertyfying the app

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