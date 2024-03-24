from Google import Create_Service 
import base64 
from email.mime.multipart import MIMEMultipart 
from email.mime.text import MIMEText 
from email.mime.base import MIMEBase 
from email import encoders 
import mimetypes
import os



CLIENTE = "trchatbot.json" 
API_NAME = "gmail"
API_VERSION = "v1"
SCOPES = ["https://mail.google.com/"]

service = Create_Service(CLIENTE, API_NAME, API_VERSION, SCOPES)

mimeMessage = MIMEMultipart() 
mimeMessage["subject"] = " hola esto es un titulo"
emailMsg = " Buenas esto es un mensaje "
mimeMessage["to"] = "informatico.joaquin@gmail.com"

mimeMessage.attach(MIMEText(emailMsg,"plain"))

filename = os.path.basename('frances1.pdf')
f = open('frances1.pdf', 'rb')
myfile = MIMEBase('aplication','pdf')
myfile.set_payload(f.read())
myfile.add_header('Content-Disposition', 'attachment', filename = filename)
encoders.encode_base64(myfile)
f.close()
mimeMessage.attach(myfile)

raw_string = base64.urlsafe_b64encode(mimeMessage.as_bytes()).decode() 


message = service.users().messages().send(userId = "me", body = {"raw":raw_string}).execute()



print(message)
