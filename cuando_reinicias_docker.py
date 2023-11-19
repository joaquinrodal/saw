#---------------
cuando reinicias docker 

tienes que iniciar redis
para iniciar redis tienes que ejecutar el siguiente comando:

redis-server 

Como VSCODE , lo tengo instalado en el contenedor , lo inicio en el puerto 8080
pero tengo que poner una PASSWORD = 'adriana03' , como variable de entorno de linux
en debian es el siguiente comando :

export PASSWORD="adriana03" 
/usr/bin/code-server --bind-addr 0.0.0.0:8080 --user-data-dir /var/lib/code-server --auth password 

con esto ya está iniciado el VSCODE

#---->comprobar que mariadb está iniciado:
sudo service --status-all
sudo service mariadb start

ya está iniciado la base de datos.

# ----------------

ya podemos ejecutar en un entorno virtual

conda activate saturno

ir a la carpeta del proyecto

uvicorn --host 0.0.0.0 --port 5900 --reload 

con esto inciamos el servidor uvicorn , con al aplicacion
hecha en FASTAPI .

PARA MI EL MEJOR SERVIDOR DE APLICACIONES WEB . CON DIFERENCIAS DE OTROS.
