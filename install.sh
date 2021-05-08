#!/bin/bash
# This installs the program as a systemd package

SERVICE_NAME="password-manager"
PATH=$(pwd)

echo `
[Unit]
Description=$SERVICE_NAME
After=network.target

[Service]
User=root
Group=root
ExecStart=/usr/local/bin/$SERVICE_NAME.sh
WorkingDirectory=$PATH
Restart=on-failure

[Install]
WantedBy=default.target

` >> /etc/systemd/system/$SERVICE_NAME.service


sudo mv start.sh /usr/local/bin/$SERVICE_NAME.sh
sudo chmod 744 /usr/local/bin/$SERVICE_NAME.sh
sudo chmod 664 /etc/systemd/system/$SERVICE_NAME.service
sudo systemctl daemon-reload
sudo systemctl enable $SERVICE_NAME.service

sudo systemctl start $SERVICE_NAME.service