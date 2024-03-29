# Node Password Manager
This is a self hosted node based password manager with client side AES encryption and de-cryption of passwords.

## Setup
Run setup.sh to install node packages and generate a SSL cert.  
run install.sh to install as a service.  
run start.sh to start server.  

on first run default user and pass is  
User: admin
Pass: Password!1
Please go to the admin pannel and change password to use.  

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
- [x] API to send and store encrypted data on server
- [ ] Login menu
  - [x] Hide login if already logged in with logout option
- [ ] Password page
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
- [x] Self hosted json database.
  - [x] Save database info encrypted.
  - [x] Save users login info in single file.
  - [x] Save each users data in their own file.
- [ ] Admin Page.
  - [x] Register new user.
    - [x] Verify user does not already exist.
    - [x] Require valid email address.
    - [x] Verify passwords match.
    - [x] Create new JSON file for user data.
  - [x] Require valid JWT to register new user.
  - [x] Require user to have Administrator rights.
  - [x] Update user info.
    - [ ] If username is updated, re name old json file.
  - [x] Reset Password.
    - [ ] Custom prompt boxes to hide password input.
  - [x] Delete user.
   - [x] Delete users password file.
- [ ] User account managment page
- [ ] Password Difficulty Checker
- [ ] Bad password checker(checks against list of known used and hacked passwords)
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
- [ ] Encrypted file storage
  - [ ] File upload method
  - [ ] File download method
  - [ ] encrypt files for storage
  - [ ] decrypt files after download
- [ ] Log file method
  - [ ] Login page
  - [ ] Admin page
  - [ ] errors
- [ ] CSS pertyfying the app

### Store types
- [ ] Folders/Organizational Groups
- [ ] Encrypted Notes
  - [ ] New note button
  - [ ] Name
    - [ ] Unique name, no two notes with same name
  - [ ] Note
    - [ ] Expand button to exit or write note
    - [ ] Save button
    - [ ] Delete button
  - [ ] Organization
- [ ] Passwords
  - [ ] Name
  - [ ] Notes
  - [ ] Organization
  - [ ] URL
  - [ ] Username
  - [ ] Site Password
- [ ] Address Book
  - [ ] Name
  - [ ] Notes
  - [ ] Organization
  - [ ] Address information (to much to add right now)
- [ ] Credit/Debeit cards
  - [ ] Name
  - [ ] Organization
  - [ ] Notes
  - [ ] Name On Card
  - [ ] Type
  - [ ] Number
  - [ ] Security Code
  - [ ] Issued Date
  - [ ] Experation Date
- [ ] Bank Accounts
  - [ ] Name
  - [ ] Organization
  - [ ] Notes
  - [ ] Bank Name
  - [ ] Account Type
  - [ ] Routing Number
  - [ ] Account Number
  - [ ] IBAN Number
  - [ ] PIN
  - [ ] Branch Address
  - [ ] Branch Phone
- [ ] Crypto Accounts
  - [ ] Name
  - [ ] Organization
  - [ ] Notes
  - [ ] Wallet Address
  - [ ] URL for online wallet
  - [ ] Private Key
  - [ ] Pass Phrase
  - [ ] Keystore File
#### Options
- [ ] Email Accounts
  - [ ] Name
  - [ ] Organization
  - [ ] Notes
  - [ ] Username
  - [ ] Password
  - [ ] Server
  - [ ] Port
  - [ ] Type
  - [ ] SMTP Server
  - [ ] SMTP Port
- [ ] Software Licences
  - [ ] Name
  - [ ] Organization
  - [ ] Notes
  - [ ] Licence Key
  - [ ] Licensee
  - [ ] Version
  - [ ] Publisher
  - [ ] Support Email
  - [ ] Website
  - [ ] Price
  - [ ] Purchase Date
  - [ ] Order Number
  - [ ] Number of Licences
  - [ ] Order Total
- [ ] Drivers Licence
  - [ ] Name
  - [ ] Organization
  - [ ] Notes
  - [ ] Number
  - [ ] Experation Date
  - [ ] License Class
  - [ ] Card Holder Name
  - [ ] Address
  - [ ] City-Town
  - [ ] State
  - [ ] ZIP-Postal Code
  - [ ] Country
  - [ ] Date of Birth
  - [ ] Sex
  - [ ] Height
- [ ] Passport
  - [ ] Name
  - [ ] Organization
  - [ ] Notes
  - [ ] Type
  - [ ] Holders Name
  - [ ] Country
  - [ ] Number
  - [ ] Sex
  - [ ] Nationality
  - [ ] Issuing Authority
  - [ ] Date of Birth
  - [ ] Issued Date
  - [ ] Experation Date
- [ ] Social Security
  - [ ] Name
  - [ ] Organization
  - [ ] Notes
  - [ ] Card Holders Name
  - [ ] SSN
- [ ] Insurance
  - [ ] Name
  - [ ] Organization
  - [ ] Notes
  - [ ] Company
  - [ ] Policy Type
  - [ ] Policy Number
  - [ ] Experation Date
  - [ ] Agent Name
  - [ ] Agent Phone
  - [ ] URL
- [ ] Memberships
  - [ ] Name
  - [ ] Organization
  - [ ] Notes
  - [ ] Organization
  - [ ] Membership Number
  - [ ] Member Name
  - [ ] Start Date
  - [ ] Experation Date
  - [ ] Website
  - [ ] Telephone
  - [ ] Password
- [ ] Wi-fi passwords
  - [ ] Name
  - [ ] Organization
  - [ ] Notes
  - [ ] SSID
  - [ ] Password
  - [ ] Connection Type
  - [ ] Connection Mode
  - [ ] Authentication
  - [ ] Encryption
  - [ ] use 802.1X
  - [ ] FIPS Mode
  - [ ] Key Type
  - [ ] Protected
  - [ ] Key Index
- [ ] Instant Messager
  - [ ] Name
  - [ ] Organization
  - [ ] Notes
  - [ ] Type
  - [ ] Username
  - [ ] Password
  - [ ] Server
  - [ ] Port
- [ ] Database
  - [ ] Name
  - [ ] Organization
  - [ ] Notes 
  - [ ] Type
  - [ ] Hostname
  - [ ] Port
  - [ ] Database
  - [ ] Username
  - [ ] Password
  - [ ] SID
  - [ ] Alias
- [ ] Server
  - [ ] Name
  - [ ] Organization
  - [ ] Notes
  - [ ] Hostname
  - [ ] Username
  - [ ] Password
- [ ] SSH Keys
  - [ ] Name
  - [ ] Organization
  - [ ] Notes
  - [ ] Bit Strength
  - [ ] Format
  - [ ] Passphrase
  - [ ] Private Key
  - [ ] Public Key
  - [ ] Hostname
  - [ ] Date

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