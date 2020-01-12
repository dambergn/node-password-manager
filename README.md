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
  - [x] Hide login if already logged in with logout option
  - [x] When loged in pull users saved passwords list
  - [x] show password field as hidden with a view button
  - [ ] Coppy password to clipboard button.
- [x] Authentication using JWT.
  - [x] Server side JWT creation.
  - [x] Client side saving JWT in local storage.
  - [x] Server side verification of JWT from client.
- [ ] Add 2FA.
- [ ] Prevent site access without authentication.
  - [ ] Redirect un-authenticated users back to the home page.
  - [x] Common local storage creation and update.
- [/] Self hosted json database.
  - [ ] Save database info encrypted.
  - [x] Save users login info in single file.
  - [x] Save each users data in their own file.
- [ ] Admin Page.
  - [x] Register new user.
    - [x] Verify user does not already exist.
    - [x] Require valid email address.
    - [x] Verify passwords match.
    - [ ] Create new JSON file for user data.
  - [x] Require valid JWT to register new user.
  - [x] Require user to have Administrator rights.
  - [x] Update user info.
    - [ ] If username is updated, remove old json file and create new one.
  - [x] Reset Password.
    - [ ] Custom prompt boxes to hide password input.
  - [x] Delete user.
   - [ ] Delete users password file.
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
- [x] Users stored passwords page
 - [x] Populate list of sites, usernames, passwords.
 - [x] New Entry field to add sites and passwords.
 - [x] Incorporate password generator with custom options.
 - [x] Show/Hide password button.
 - [x] Generate new password for existing entry.
 - [x] Update entry information button.
 - [x] Delete entry information button.
- [ ] Log file method
  - [ ] Login page
  - [ ] Admin page
  - [ ] errors
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
12. Once authenticated client side takes master password and hashes it in SHA256.
13. Client uses current devices UUID to make a SHA256 hash.
14. The hashed UUID is then converted into an AES key to encrypt the hashed master password.
15. The encrypted hash master password is then saved in local storage.
16. When user requests to decrypt a password (all happens client side)
  - 1. System hashes system UUID and converts it to make AES key.
  - 2. System pulls encrypted master password from local storage and uses UUID key to decrypt.
  - 3. System uses decrypted master password hash to make users AES decryption key.
  - 4. System uses users key to decrypt their password.