#!/bin/bash
# This installs the program as a systemd package

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

SERVICE_NAME="password-manager"
CPATH=$(pwd)

rm -rf /etc/systemd/system/$SERVICE_NAME.service

echo "
[Unit]
Description=$SERVICE_NAME
After=network.target

[Service]
User=root
Group=root
ExecStart=/usr/local/bin/$SERVICE_NAME.sh
WorkingDirectory=$CPATH
Restart=on-failure

[Install]
WantedBy=default.target

" >> /etc/systemd/system/$SERVICE_NAME.service


cp start.sh /usr/local/bin/$SERVICE_NAME.sh
chmod 744 /usr/local/bin/$SERVICE_NAME.sh
chmod 664 /etc/systemd/system/$SERVICE_NAME.service
systemctl daemon-reload
systemctl enable $SERVICE_NAME.service

systemctl start $SERVICE_NAME.service