#-------------------------------------------
# cosas interesantes 
#-------------------------------------------

-- REPOSITORIOS

cd /etc/apt/sources.list.d

-- ************************
curl ipinfo.io

video sshttle explicado
https://www.youtube.com/watch?v=FHOGSQwGps8&t=1277s

sudo apt-get install sshuttle 
sshuttle -r joaquin@82.223.128.190 0/0

sshuttle -l 0.0.0.0/24 -r joaquin@82.223.128.190 0.0.0.0/0 
sshuttle -NHr joaquin@82.223.128.190 0/0

-- conectamos dos redes de distintas empresas .


https://www.digitalocean.com/community/tutorials/how-to-use-sftp-to-securely-transfer-files-with-a-remote-server-es


https://geekflare.com/es/sftp-command-examples/

#-------------------------
-- VIDEO INTERESANTE SSH TUNEL 
https://www.youtube.com/user/inwx/featured 
MUY BUENO

# sftp 
sftp joaquin@82.223.128.190
password

ls
cd ..
subir un archivo --->   put nombre archivo
descargar fichero ----> get nombre fichero 

# COPIAR FICHERO AL SERVIDOR
scp nombre_fichero joaqui@82.223.128.190:/home/joaquin 
copia un fichero local a un servidor remoto ..

#IMPORTANTE
CERTIFICADO DE SEGURIDAD

1º Se crea un certificado de SEGURIDAD
ssh-keygen 

el certificado se guarda en /home/joaquin/.ssh 
llamado id_rsa 
2º Una vez tengo el certificado hay que copiarlo en el servidor
   remoto con el siguiente comando

ssh-copy-id joaquin@82.223.128.190 

ya podemos entrar en el servidor sin que nos pida la clave de acceso 

ssh joaquin@82.223.128.190 
sftp joaquin@82.223.128.190
scp nombre_fichero joaquin@82.223.128.190:/home/joaquin


#sincronizar carpetas y ficheros

rsync ./* ../text1

#---> sincronizar en remoto 
rsync -avz -e ssh ./* joaquin@82.223.128.190:/home/joaquin 

# TUNEL A OTRA MAQUINA A OTRO SERVIDOR

ssh -L <puerto-local-escucha>:<host-remoto>:<puerto-remoto> <servidor-ssh>

ssh -L 8080:camofi.org:80 joaquin@82.223.128.190
ssh -L 8081:82.223.128.190:4300 joaquin@82.223.128.190

imaginate una red local con varios PCs 
y desde afuera acceder a servicios de los Pcs de cualquier Pcs

ssh -NL localhostLocal:puerto:ip_remota:puerto_remoto joaquin@82.223.128.190
--la ip_remota puede ser cualquier ordenador que esté en la red local 

ssh -R <puerto-remoto-escucha>:<host-local>:<puerto-local> <servidor-ssh>
ssh -R 8090:localhost:8090 joaquin@82.223.128.190 

# tunel a otra maquina sock 

ssh -D <puerto-origen-dinámico-escucha> <servidor-ssh>

ssh -D 1337 joaquin@82.223.128.190 

en el pc o portatil 
tiene que activar el proxy 
generalmente esta en la tarjeta de red

# PARA COPIAR ARCHIVOS
rsync --partial --progress --rsh=ssh video.mov joaquin@82.223.128.190:/home/joaquin/video.mov


# MAPEAR UNA RED LOCAL 
ssh -l ubuntu -NL localhost:3389:192.168.1.34:3906 joaquin@82.223.128.190  

# MAPEAR 
ssh -i ssh-key-2022-05-03.key -l ubuntu -NL localhost:8080:10.0.0.184:8080 ubuntu@192.9.231.119

# mapear visual studio code en oracle ..
ssh -i ssh-key-2022-05-04.key -l ubuntu -NL localhost:8080:10.0.0.155:8080 ubuntu@155.248.202.23

# video de wireguard en debian 10 muy bueno.
https://www.youtube.com/watch?v=QL6yF5k2ljA&t=1237s



#ssh comandos 
AllowTcpForwarding
sysctl net.ipv4.ip_forward=1

# comprobado
nano /proc/sys/net/ipv4/ip_forward 
tiene que estar a 1 

#cliente
ssh-keygen -t rsa -b 4096
ssh-copy-id usuario@IP_servidor
PubkeyAuthentication yes
ssh usuario@IP

ssh -L <puerto-local>:localhost:<puerto-remoto> <gateway>

Usar un servidor como SOCKS proxy
ssh -N -D 1080 servidor-remoto


ssh -L [bind_address:]port:host:hostport user@hostname
donde

bind_address Generalmente se puede obviar. Es por si en tu equipo tienes varias IP, para especificar cuál queremos usar
port Puerto local que pondremos a un extremo del túnel SSH(donde vamos a colocar la entrada de la tubería)
host Host remoto al que queremos acceder
port Puerto del host remoto al que queremos acceder (extremo de salida de la tubería)
user Usuario para conectar al gateway
hostname Host que hará de pasarela o gateway


#-----   Remote Port (-R)
Esta es un poco más enrevesada de entender. En principio, 
vamos a olvidar nuestra máquina local, esta no interviene para nada salvo para ejecutar el comando. 
La sintaxis es similar a la anterior:

ssh -R [bind_address:]port:host:hostport user@hostname

Y la traducción sería: Abre el puerto port en hostname y todo lo que llegue lo redirige al hostport de host. 
Fácil, ¿no?. Pero, ¿qué pasa si en host ponemos nuestro equipo?

ssh -R 1234:localhost:80 myuser@maquinaamigo.com

En este caso, cualquier persona que abra el navegador con http://maquinaamigo.com:1234 podra ver una web publicada en mi propio equipo. Ideal para mostrar una página en desarrollo a un jefe, pedir ayuda remota a un amigo o cualquier cosa que se te ocurra.


ssh -R 8888: localhost: 1234 bob@ssh.youroffice.com


# resultado final

# cliente --> servidor
ssh  -R 82.223.128.190:2222:localhost:22 82.223.128.190
R = remoto ip_servidor_remoto:puerto_servidor_remoto:localhost_cliente:puerto_cliente ip_servidor_remoto 
82.223.128.190:2222-->localhost:22 = tunel de trafico entre cliente y servidor 

# dentro servidor 
ssh -L 82.223.128.190:5800:localhost:5400 joaquinrodal@localhost -p2222



#----------------------
iptables 

/proc/sys/net/ipv4/ip_forward 

iptables -t nat -A POSTROUTING -s 172.16.10.0/24 -o ens192 -j MASQUERADE 

iptables -P INPUT ACCEPT 
            OUTPUT
            FORWARD 

Manual de IPTABLES
https://albertomolina.wordpress.com/2009/01/09/nat-con-iptables/ 


iptables -t nat -A POSTROUTING -s 172.16.10.0/24 -o ens192 -j MASQUERADE

este caso al fina se pone la ip publica , pero si no la sabes se pone MASQUERADE
iptables -t nat -A POSTROUTING -s 192.168.3.0/24 -o eth0 -j SNAT --to 80.58.1.14

SOURCE NAT (DINÁMICO) CON IPTABLES
Podríamos tener un caso similar al anterior, pero en el que 
la dirección IP pública del equipo que se conecta a Internet fuese dinámica,
 por lo que no la sabríamos a priori y no sería posible definirla en una regla como la anterior. 
 En ese caso la regla de iptables a utilizar sería:

iptables -t nat -A POSTROUTING -s 192.168.3.0/24 -o eth0 -j MASQUERADE

Donde el único cambio se refiere a la acción (parámetro -j), en este caso es MASQUERADE, 
que cambia la dirección origen por la que tenga la interfaz de salida (eth0).

MASQUERADE podría funcionar también si la dirección IP de eth0 fuese estática, pero en ese 
caso se recomienda utilizar SNAT.


iptables -P FORWARD DROP
iptables -A FORWARD -i eth1 -s 10.0.0.1 -o eth0 -d 8.8.8.8 -p udp --dport 53 -j ACCEPT
iptables -A FORWARD -p udp --dport 53 -j ACCEPT

1

# Source NAT de la red local y la DMZ:
iptables -t nat -A POSTROUTING -o eth0 -s 192.168.1.0/24 -j SNAT --to 40.12.1.14
iptables -t nat -A POSTROUTING -o eth0 -s 192.168.2.0/24 -j SNAT --to 40.12.1.14
# DNAT de los servicios http,https,smtp,pop3s e imaps al servidor de la DMZ:
iptables -t nat -A PREROUTING -i eth0 -d 40.12.1.14 -p tcp --dport 80 -j DNAT --to 192.168.2.2
iptables -t nat -A PREROUTING -i eth0 -d 40.12.1.14 -p tcp --dport 443 -j DNAT --to 192.168.2.2
iptables -t nat -A PREROUTING -i eth0 -d 40.12.1.14 -p tcp --dport 25 -j DNAT --to 192.168.2.2
iptables -t nat -A PREROUTING -i eth0 -d 40.12.1.14 -p tcp --dport 993 -j DNAT --to 192.168.2.2
iptables -t nat -A PREROUTING -i eth0 -d 40.12.1.14 -p tcp --dport 995 -j DNAT --to 192.168.2.2


https://web.mit.edu/rhel-doc/4/RH-DOCS/rhel-sg-es-4/s1-firewall-ipt-fwd.html
iptables -A FORWARD -i eth1 -j ACCEPT
iptables -A FORWARD -o eth1 -j ACCEPT
sysctl -w net.ipv4.ip_forward=1
sysctl -p /etc/sysctl.conf
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE


# VIDEO MUY BUENO 
SSH TUNNEL 
https://www.youtube.com/watch?v=EOxKbKlZN4M&t=187s

# route 
para saber puerta enlace 
route 
Kernel IP routing table
en el flags G significa Gateway
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
default         10.255.255.1    0.0.0.0         UG    0      0        0 ens192
10.255.255.1    0.0.0.0         255.255.255.255 UH    0      0        0 ens192
172.17.0.0      0.0.0.0         255.255.0.0     U     0      0        0 docker0
172.18.0.0      0.0.0.0         255.255.0.0     U     0      0        0 br-32476c1317f7

# para cambiar la ip a una tarjeta de red

ifconfig eth0 192.168.1.20 netmask 255.255.255.0 
sudo route add default gw 192.168.1.1 eth0 
-- añadimos puerta enlace a la tarjeta de red 
