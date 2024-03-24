

Allow Managed: si está seleccionada, se asignan rutas y direcciones IP privadas administradas por ZeroTier.
Allow Global: si está seleccionada, se asignan rutas y direcciones IP privadas administradas por ZeroTier, pero se pueden superponer con el espacio IP público.
Allow Default: el programa puede anular la ruta predeterminada del sistema operativo, y reenviar todo el tráfico a través del túnel.
Allow DNS: se permite la obtención de DNS a través de la red administrada por ZeroTier.



video bueno
https://www.youtube.com/c/CaibneTik/videos

imagen orange pi zero 
https://openwrt.org/toh/views/toh_fwdownload?dataflt%5BModel*%7E%5D=orange

video vpn zerotier 
https://www.youtube.com/watch?v=AFzKJJgJJNk 
 sitio a sitio 


# INSTALAR OPENWRT
En algun dispositivo

luego configurar
con una ip. 192.168.1.75
            255.255.255.0
            192.168.1.1
            192.168.1.255. broadcast

            dhcp desabilitado
            dns  192.168.1.1

            firewall
            fordwarding
            accept 
            mascarade

entrar en openwrt como ssh 
ssh root@192.168.1,75

antes tienes que tener instalado nano

para editar el fichero

/etc/config/zerotier
y añadir el ID del swicth que hay en la nube

para restaurar 

/etc/init.d/zerotier restart 

y en unos segundos aparecera el zerotier que has configurado en el openwrt



