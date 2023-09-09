#----------------------------
# INSTALACION DE DOCKER EN DEBIAN 11

--RAPIDO Y FACIL

curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

#-----------------------------
# docker compose Instalacion

sudo apt install -y curl wget
curl -s https://api.github.com/repos/docker/compose/releases/latest | grep browser_download_url  | grep docker-compose-linux-x86_64 | cut -d '"' -f 4 | wget -qi -
chmod +x docker-compose-linux-x86_64
sudo mv docker-compose-linux-x86_64 /usr/local/bin/docker-compose
docker-compose version
sudo usermod -aG docker $USER
newgrp docker

#-----------------------------------------
# crear un fichero docker-compose.yml 

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

#---------------------------------------------
# ejecutar docker-compose up -d


Email:    admin@example.com
Password: changeme
