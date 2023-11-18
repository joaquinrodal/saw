#-----------------------------------------------
instancia aws ec2   2 GIGAS RAM 2 CPU
quesos--> 54.167.44.230 

# cambiamos permisos al certificado
chmod 400 quesos.cer 
ssh -i quesos.cer admin@54.167.44.230

admin --> usuario administrador 

#-------------------------------------------
# vscode online-->
wget https://github.com/cdr/code-server/releases/download/v4.3.0/code-server-4.3.0-linux-amd64.tar.gz
wget https://github.com/cdr/code-server/releases/download/v4.18.0/code-server-4.18.0-linux-amd64.tar.gz
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

# docker instalacion -->

#----------------------------------
# otra forma de instalar docker 
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# lista los contenedores ..
docker ps -a 

# DOCKER COMPOSE 
sudo apt install -y curl wget
curl -s https://api.github.com/repos/docker/compose/releases/latest | grep browser_download_url  | grep docker-compose-linux-x86_64 | cut -d '"' -f 4 | wget -qi -
chmod +x docker-compose-linux-x86_64
sudo mv docker-compose-linux-x86_64 /usr/local/bin/docker-compose

docker-compose version
sudo usermod -aG docker $USER
newgrp docker

# crear un fichero docker-compose.yml
nano docker-compose.yml
version: '3'
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt

#------------------------------
# ejecutar 

docker-compose up -d

usuario de nginx proxy manager 
Email:    admin@example.com
Password: changeme


#--------------------------------------------------
# MARIADB 

# Crear base de datos con utf8 sencible.
CREATE DATABASE asesoria CHARACTER SET utf8 COLLATE utf8_general_ci;



sudo apt install -y mariadb-server 
systemctl status mariadb

sudo mysql 
alter user root@localhost identified by 'adriana03';

# --> PARA ACCEDER    mysql -u root -p 

crear usuario --> con privilegios.

grant all privileges on *.* to joaquin identified by 'adriana03' with grant option;
flush privileges;

sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf
buscamos 
bind-address            = 127.0.0.1
# bind-address            = 127.0.0.1

restablecemos el servidor mariadb 

sudo systemctl restart mariadb


#--------------------------------------------
# descargar cloudbeaver

sudo docker pull dbeaver/cloudbeaver:latest 
sudo docker run --name cloudbeaver --rm -ti -p 8090:8978 --add-host=host.docker.internal:54.167.44.230 -v /var/cloudbeaver/workspace:/opt/cloudbeaver/workspace dbeaver/cloudbeaver:dev

#-----------------------------------------
# instalar miniconda


conda create -n nombre_entorno python=3.11

comprimir un entorno para moverlo a otro sitio..

zip -r nombre_comprimido.zip directorio_a_comprimir
unzip srcpython20190610.zip


# mariadb 
# python
# para instalar el modulo en pip mariadb hay que instalar estos modulos gcc 
# hay que instalar un modulo de gcc
sudo apt install build-essential
sudo apt-get install manpages-dev

sudo apt install libmariadb3 libmariadb-dev

# version de mariadb 10.9.1
mariadb instalar 10.9.1
https://computingforgeeks.com/how-to-install-mariadb-on-debian/
sudo apt install libmariadb3 libmariadb-dev 

pip install mariadb 


@ gcc

nano hello.c
// hello.c
#include 

int main() {
    printf("Hello, world!\n");
    return 0;
}
gcc hello.c -o hello
./hello

root@idroot.us:~# ./hello 
Hello, world!


# aplicaciones office 2016
https://files.rg-adguard.net/category


chrome://flags/#enable-desktop-pwas-borderless
