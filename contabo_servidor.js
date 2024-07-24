
CONTABO  SERVIDOR  4 CORE 4 GIGAS MEMORIA RAM 400 GIGAS DISCO DURO

apt update
apt upgrade

apt install sudo

sudo nano /etc/sudoers

añadir linea
joaquin  ALL=(ALL:ALL) ALL
CRTL+o grabar
crtl+x salir

reboot
reinicia el servidor para que coja cambios

crear usuario nuevo
sudo adduser joaquin
sudo usermod -aG sudo nombre_usuario    --> añadir joaquin al grupo root administrador
sudo passwd joaquin   --> cambiar clave

sudo deluser --remove-all-files juan  --> eliminar usuario de debian 12
