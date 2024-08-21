


password_file /etc/mosquitto/passwd

sudo mosquitto_passwd -c /etc/mosquitto/passwd usuario
sudo systemctl restart mosquitto
sudo systemctl start mosquitto
sudo systemctl stop mosquitto

sudo mosquitto_passwd -c /etc/mosquitto/passwd joaquin

sudo nano /etc/mosquitto/mosquitto.conf
sudo nano /var/log/mosquitto/mosquitto.log
sudo journalctl -u mosquitto -f


3. Generar la Autoridad Certificadora (CA)
Primero, necesitas generar una clave privada para tu CA:

sudo openssl genpkey -algorithm RSA -out ca.key
Luego, genera el certificado de la CA:

sudo openssl req -new -x509 -days 3650 -key ca.key -out ca.crt
Durante este proceso, se te pedirá que introduzcas información para el certificado. Puedes dejar los valores predeterminados o introducir tu propia información.

4. Generar la Clave Privada del Servidor
Ahora, genera una clave privada para el servidor:

sudo openssl genpkey -algorithm RSA -out server.key
5. Crear una Solicitud de Firma de Certificado (CSR)
Crea una solicitud de firma de certificado para el servidor:

sudo openssl req -new -out server.csr -key server.key
Se te pedirá que ingreses la información del certificado, como el nombre común (Common Name). Asegúrate de que el nombre común coincida con el nombre de dominio o la dirección IP del servidor.

6. Firmar el Certificado del Servidor con la CA
Firma el certificado del servidor usando el certificado de la CA:

sudo openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 3650




