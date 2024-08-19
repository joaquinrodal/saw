

listener 8083
protocol websockets
cafile /path/to/server.crt
certfile /path/to/server.crt
keyfile /path/to/server.key
allow_anonymous true

listener 8083: Define el puerto en el que Mosquitto escuchará conexiones wss.
protocol websockets: Indica que el protocolo es WebSocket.
cafile /path/to/server.crt: Archivo del certificado de la autoridad certificadora (CA). En este caso, como estamos usando un certificado autofirmado, este será el mismo que el server.crt.
certfile /path/to/server.crt: El certificado del servidor.
keyfile /path/to/server.key: La clave privada del servidor.
allow_anonymous true: Permite conexiones anónimas.

sudo systemctl restart mosquitto

  
Crear una Clave Privada
openssl genpkey -algorithm RSA -out server.key -aes256
Crear un Certificado de Solicitud (CSR)
openssl req -new -key server.key -out server.csr

1.4 Generar el Certificado Autofirmado
Usa el CSR para generar un certificado autofirmado:

openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
-days 365: Define la validez del certificado en días (365 días en este caso).
