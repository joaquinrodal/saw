
# Cuando creamos un contenedor docker 
y entramos en modo root

service mariadb start    --> arrancamos el servidor mariadb
netstat -tanp  --> comprobamos que está levantado el puerto 3306

Como VSCODE , lo tengo instalado en el contenedor , lo inicio en el puerto 8080
pero tengo que poner una PASSWORD = 'adriana03' , como variable de entorno de linux
en debian es el siguiente comando :

export PASSWORD="adriana03" 
/usr/bin/code-server --bind-addr 0.0.0.0:8080 --user-data-dir /var/lib/code-server --auth password 

con esto ya está iniciado el VSCODE

#-------------------------------------------
# vscode online-->
wget https://github.com/cdr/code-server/releases/download/v4.3.0/code-server-4.3.0-linux-amd64.tar.gz
wget https://github.com/cdr/code-server/releases/download/v4.18.0/code-server-4.18.0-linux-amd64.tar.gz
#--------------------------------------
# version 20 VISUAL STUDIO CODE 
# ---------->DESCARGAR 
wget https://github.com/cdr/code-server/releases/download/v4.20.0/code-server-4.20.0-linux-amd64.tar.gz
# ---------->DESCOMPRIMIR
tar -xzvf code-server-4.20.0-linux-amd64.tar.gz
# ----------> COPIAR
sudo cp -r code-server-4.20.0-linux-amd64 /usr/lib/code-server
#------------> ENLAZAR -->
sudo ln -s /usr/lib/code-server/bin/code-server /usr/bin/code-server
sudo mkdir /var/lib/code-server 
#-------->
# si vas a instalar una version nueva tienes que crear carpetas nuevas...
# en /usr/lib  borramos carpeta code-server 
rm -r code-server
# en /var/lib  borramos carpeta code-server
# y creamos una nueva 
mkdir code-server


#---------------------------------------
tar -xzvf code-server-4.3.0-linux-amd64.tar.gz
sudo cp -r code-server-4.3.0-linux-amd64 /usr/lib/code-server

sudo ln -s /usr/lib/code-server/bin/code-server /usr/bin/code-server
sudo mkdir /var/lib/code-server
sudo nano /lib/systemd/system/code-server.service
#-----------------------------------------------
# editar fichero code-server.service 
[Unit]
Description=code-server
After=nginx.service
[Service]
Type=simple
Environment=PASSWORD=adriana03
ExecStart=/usr/bin/code-server --bind-addr 0.0.0.0:8080 --user-data-dir /var/lib/code-server --auth password
 Restart=always
[Install]
WantedBy=multi-user.target
#-------------------------------------
sudo systemctl start code-server
sudo systemctl status code-server
sudo systemctl enable code-server
