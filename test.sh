#!/bin/bash

echo "testing passing through js"
echo ""
echo "enter a password:"
read password
result (node public/assets/js/sha512.js ${password})