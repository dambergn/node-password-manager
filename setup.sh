#!/bin/bash

# Setting user permissions
echo "Setting npm user home directory"
sudo chown -R $USER:$(id -gn $USER) $HOME/

# Create and setup .env file
echo "Before continuing make sure you have these items handy."
echo "TV Database API key."

if [ -f ".env" ]; then
  echo ".env file already exists"
else 
  echo "Creating .env file"
  touch .env
  echo "PORT=3000" >> .env
fi


# Check if node is installed
echo "Checking software dependencies"
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
echo "Installing NPM packages"
npm install