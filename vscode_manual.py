
#------------------------------------
# todo esto esta sacado de esta pagina web
https://tech-es.netlify.app/articles/es534240/index.html



mkdir ~/code-server
cd ~/code-server

wget https://github.com/cdr/code-server/releases/download/v3.8.0/code-server-3.8.0-linux-amd64.tar.gz
tar -xzvf code-server-3.8.0-linux-amd64.tar.gz

sudo cp -r code-server-3.8.0-linux-amd64 /usr/lib/code-server

sudo ln -s /usr/lib/code-server/bin/code-server /usr/bin/code-server
sudo mkdir /var/lib/code-server

sudo nano /lib/systemd/system/code-server.service
[Unit]
Description=code-server
After=nginx.service
[Service]
Type=simple
Environment=PASSWORD=<your_password>
ExecStart=/usr/bin/code-server --bind-addr 127.0.0.1:8080 --user-data-dir /var/lib/code-server --auth password
Restart=always
[Install]
WantedBy=multi-user.target

sudo systemctl start code-server
sudo systemctl status code-server
sudo systemctl enable code-server
