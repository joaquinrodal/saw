#--------------------------------------------------
# MARIADB 

# Crear base de datos con utf8 sencible.
CREATE DATABASE asesoria CHARACTER SET utf8 COLLATE utf8_general_ci;

en el contenedor docker -- donde está instalado mariadb
#------------------------------------------
para ponerlo en marcha:
service mariadb start
luego comprueba con
netstat -tanp 
-- para ver si está en ejecucion.
#-------------------------------------------
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

# ------------------------------------
# comandos en python para hacer copias de seguridad
import os
comando = f'mysqldump --user="{username}" --password="{password}" {database} > {dia}-{mes}-{año}-{hora}-{minuto}-copia_awp_db.sql'
    
os.system(comando)

# comando de copia
mysqldump --user="joaquin" --password="adriana03" nombre_base_datos > copia_seguridad.sql 
mysqldump --user="joaquin" --password="adriana03" nombre_base_datos --tables tabla1 tabla2   > copia_seguridad.sql 
# copia toda la base de datos del servidor 
mysqldump --user="joaquin" --password="adriana03" -A > copia_total.sql
mysqldump -u joaquin -padriana03 -A > copia_total.sql 


# restaurar copia
tendria que entrar en mysql 
mysqldump -u joaquin -padriana03

una vez dentro , creamos la base de datos 
create database api4;
use api4;
source /home/joaquin/api3/copia_api4,sql;

con esto restauramos con las tablas y registros 
de la copia de seguridad.

# Para restaurar una copia tiene que estar creado la base de datos
mysqldump -u joaquin -padriana03
create database api4;

luego si se puede hacer la copia en la base de datos , me refiero a restaurar :

mysql -u joaquin -padriana03 api4 < copia_api4.sql 



#--------------------------------------------------------
# Para aumenter numero de conexiones a la base de datos

con el servidor en marcha 
hay que entrar como root 
ver las conexiones maximas simultaneas 
que por defecto esta en 100 conexiones

para aumentar hay que decircelo a la base de datos
mostramos las conexiones que hay 
y luego le establecemos el numero de conexiones que necesitemos

# si resetamos perdemos esta configuracion

hay que vigilar este tema..
# ****** MUY IMPORTANTE..

show variables like "max_connections";
SHOW VARIABLES LIKE "%version%";
SET GLOBAL max_connections=500;

mysql -u joaquin-padriana03 

# restaurar mariadb
sudo systemctl restart mysql 
sudo systemctl status mysql


#----------------------------------------------
# instalar mariadb en python 3.9

hay que instalar estar librerias 
sudo apt install libmariadb3 libmariadb-dev

luego instala el modulo 
pip install mariadb
