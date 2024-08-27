
Generar una Clave Privada
openssl genpkey -algorithm RSA -out key.pem -aes256

Crear una Solicitud de Firma de Certificado (CSR)
openssl req -new -key key.pem -out request.csr

Generar el Certificado Autofirmado
openssl x509 -req -days 365 -in request.csr -signkey key.pem -out cert.pem

Verificar el Certificado
openssl x509 -text -noout -in cert.pem

