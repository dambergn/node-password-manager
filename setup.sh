#!/bin/bash

# Setting user permissions
echo "<<< Setting npm user home directory >>>"
sudo chown -R $USER:$(id -gn $USER) $HOME/

# Create and setup .env file
if [ -f ".env" ]; then
  echo "<<< .env file already exists >>>"
else 
  echo "<<< Creating .env file >>>"
  touch .env
  echo "PORT=3000" >> .env
  echo "PORTS=8080" >> .env
  echo "KEY='./ssl/ssl-key.key'" >> .env
  echo "CERT='./ssl/ssl-crt.crt'" >> .env
fi

if [ -f "ssl/ssl-crt.crt" ]; then
  echo "<<< SSL certs already exist >>>"
else
  echo "<<< No SSL Certs exist, generating Cert >>>"
  mkdir ssl
  sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ssl/ssl-key.key -out ssl/ssl-crt.crt
  sudo chown -R $USER:$(id -gn $USER) ./ssl
  echo KEY="'./ssl/ssl-key.key'" >> .env
  echo CERT="'./ssl/ssl-crt.crt'" >> .env
  echo "<<<SSL cert created"
fi

if [ -f ".gitignore" ]; then
  echo "<<< .gitignore already exists >>>"
else
  echo "<<< Generating .gitignore file >>>"
  touch .gitignore
  echo "node_modules" >> .gitignore
  echo ".env" >> .gitignore
  echo "ssl" >> .gitignore
fi

# if [ -f "database/0users.json" ]; then
#   echo "<<< initial database already exists >>>"
# else
#   echo "<<< Generating database files >>>"
#   touch database/0users.json
#   echo "node_modules" >> database/0users.json
#   echo ".env" >> database/0users.json
#   echo "ssl" database/0users.json
# fi

# Check if node is installed
echo "<<< Checking software dependencies >>>"
if ! [ -x "$(command -v node)" ]; then
  echo 'Error: node is not installed.' >&2
  
  echo 'Pulling updates'
  sudo apt-get update

  echo 'Installing CURL'
  sudo apt-get install curl

  echo 'Downloading packages'
  curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

  echo 'Installing Node and NPM'
  sudo apt-get install -y nodejs

  echo 'Installing common npm packages'
  sudo npm install -g nodemon live-server -y

  echo 'Node installation complete'
fi

# Installing node_modules
echo "<<< Installing NPM packages >>>"
npm install