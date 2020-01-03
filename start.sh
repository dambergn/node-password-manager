#!/bin/bash

fuser -k 3000/tcp
fuser -k 8080/tcp

sleep 1

nodemon --ignore public/ --ignore database/ index.js