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
  echo "databse" >> .gitignore
fi

if [ -f "database/0users.json" ]; then
  echo "<<< initial database already exists >>>"
else
  echo "<<< Generating database files >>>"
  mkdir database
  touch database/0users.json
  DBCONTENTS='[
    {
        "username": "admin",
        "email": "admin@localhost.lan",
        "password": "f92291efe33cca20d32f75ec7d243c674ab30b8ce08d6f497b0414e1b28f5ad5ec2a23b34f9f1b14897d7ed573d9c08f1a84ca3a3e67adc862d29ffdfc728e4d",
        "permissions": "admin"
    },
    {
        "username": "user",
        "email": "user@gmail.com",
        "password": "f92291efe33cca20d32f75ec7d243c674ab30b8ce08d6f497b0414e1b28f5ad5ec2a23b34f9f1b14897d7ed573d9c08f1a84ca3a3e67adc862d29ffdfc728e4d",
        "permissions": "user"
    }
  ]'
  echo "$DBCONTENTS" >> database/0users.json
  touch database/admin.json
  ADMINCONTENTS='{
    "notes": [
        "29c254a6cb32393fcefe5de6cd69af17dccc3b8cf246e2e08baacf44bc4ff41d40c792745a40ae5d1bfbbc112b6208e000dda7e59783289eb598fd4b510395da831ac9b1e827cd496c9d5fa2113af36807ffa38a15bbcb99",
        "29c254a6cb32393fcefe5de6cd69af17dccc388cf246e2e08baacf44bc4ff41d40c795735e56ae5001bda91b346246f641daabfec3d561e7e198a90e0b10c599fc4acbabea61cf5d629d43f40912ea",
        "29ea1ae78677396b8ddd57b0926bf25a848b64c1aa29e0fa89de8543a01bf84c5a8b89685613e04105b9aa0c66340aff",
        "29ea1ae78677396b8ddd57b0926bf55a848b64c1aa29e0fa89c4825eb61ba51f0e809568114e",
        "29ea1ae78677396b8dfd57b0926bf4588a8528c0b138a7e291a88345a75eb10a5a91836f4711f3",
        "29ea1ae78677396b8ddd57b0926bf75a848b64c1aa29e0fa89c4885df355fe4b1fc79b"
    ],
    "passwords": [
        "29ea07ef9f77396b8fb155bd843ba01bcd8769c1b36eeee2def98858bd5afc5a58dfc63e475ce31644f9bf1f35745fed13caecbc97d57ddfa081b9194f428e95be5edfa8fb30925e62da0dfd",
        "29ea07ef9f77396b8df159aa9c24a716c7de62cbac29eca3c4e7cf06f14ee25a088b87715611b4161da8aa0c772504a011cfbdf5c0983f89e382ab1e484ed5c2be58dff5ab329a0e67d81bb94a7ca73856ffe48402abf8dc674a08f760",
        "29ea07ef9f77396b8de359aa9324b31986ca65c3fc60e0b5d8ef9f44b256f41d40c792735e01ac184aabae0d357047f0058cf4a485c52cdaf5dbeb18484580c7bb58dfa7ad31ce0a358b17e2127ca63407a6e68743e4",
        "29ea07ef9f77396b8df255a58d24af5a848b7fddbb3eaca1c6efcf10f14ff852179cc4301143ef471baca00c222512a0579aafe084912fdcf8ddbd1f1c4587c6ef5c8af0fc37cc0c618b1ee5497aa66c43e3",
        "29ea07ef9f77396b8de75db78369ed5addda6fdcb02dafa589b0cf5eb648e51d56c7967d4040f95b1abfed4464361bbb519dffe4859375d9f48aea1e1f4e8097eb0fdaf7fa669a0c608e16b34e3aea"
    ]
  }'
  echo "$ADMINCONTENTS" >> database/admin.json
  touch database/user.json
  USERCONTENTS='{"notes":[],"passwords":[]}'
  echo "$USERCONTENTS" >> database/user.json
fi

# Check if node is installed
echo "<<< Checking software dependencies >>>"
if ! [ -x "$(command -v node)" ]; then
  echo 'Error: node is not installed.' >&2
  
  echo 'Pulling updates'
  sudo apt-get update

  echo 'Installing CURL'
  sudo apt-get install curl

  echo 'Downloading packages'
  curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -

  echo 'Installing Node and NPM'
  sudo apt-get install -y nodejs

  echo 'Installing common npm packages'
  sudo npm install -g nodemon live-server -y

  echo 'Node installation complete'
fi

# Installing node_modules
echo "<<< Installing NPM packages >>>"
npm install