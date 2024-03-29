

# ------------------------------
# Cosas de ssh 

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


# Configurar en el servidor remoto un puerto que apunte a un servidor local

ssh -R 0.0.0.0:5000:192.168.1.68:5400 joaquin@82.223.128.190 

# remoto 
ssh -l joaquin -p 5800 192.168.1.68
