import schedule
import time
import os
#mysql configuracion
username ='joaquin'
password = 'adriana03'
database = 'quintana'
from datetime import datetime
ahora = datetime.now()
año = ahora.year
mes = ahora.month
dia = ahora.day
hora = ahora.hour
minuto = ahora.minute
#Mega configuracion
from mega import Mega 
mega = Mega()
email = 'informatico.joaquin@gmail.com'
password2 = 'adriana03'
m = mega.login(email, password2)

# tarea a realizar , 
# Hacer una copia de la base de datos.
# y Subirlo a una carpeta en MEGA.NZ
def job():

    ahora = datetime.now()
    año = ahora.year
    mes = ahora.month
    dia = ahora.day
    hora = ahora.hour
    minuto = ahora.minute
    #comando = f'mysqldump -u {username} -p{password} {database} > {dia}-{mes}-{año}-{hora}-{minuto}-copia_db.sql'
    comando = f'mysqldump --user="{username}" --password="{password}" {database} > {dia}-{mes}-{año}-{hora}-{minuto}-copia_awp_db.sql'
    
    os.system(comando)

    fichero = f'{dia}-{mes}-{año}-{hora}-{minuto}-copia_awp_db.sql'

    

    folder = m.find('QUINTANA')
    m.upload(fichero, folder[0])
    print(fichero,'copia grabada ok')

def subir_entorno():

    ahora = datetime.now()
    año = ahora.year
    mes = ahora.month
    dia = ahora.day
    hora = ahora.hour
    minuto = ahora.minute

    comando = f'zip -r {dia}-{mes}-{año}-{hora}-{minuto}-saturno.zip /home/joaquin/miniconda3/envs/saturno'

    os.system(comando)

    fichero = f'{dia}-{mes}-{año}-{hora}-{minuto}-jupiter.zip'

    folder = m.find('QUINTANA')
    m.upload(fichero, folder[0])
    print(fichero,'copia grabada ok')

def subir_quintana():

    ahora = datetime.now()
    año = ahora.year
    mes = ahora.month
    dia = ahora.day
    hora = ahora.hour
    minuto = ahora.minute

    comando = f'zip -r {dia}-{mes}-{año}-{hora}-{minuto}-quintana.zip /home/joaquin/quintana' 
    os.system(comando)

    fichero = f'{dia}-{mes}-{año}-{hora}-{minuto}-quintana.zip'

    folder = m.find('QUINTANA')
    m.upload(fichero, folder[0])
    print(fichero,'copia grabada ok')

    

#schedule.every(10).seconds.do(job)
#schedule.every(10).minutes.do(job)
#schedule.every().hour.do(job)
schedule.every().day.at("09:46").do(job)
schedule.every().day.at("13:00").do(job)
schedule.every().day.at("15:00").do(job)
schedule.every().day.at("22:00").do(job)

schedule.every().day.at("03:00").do(subir_quintana)
schedule.every().day.at("05:00").do(subir_entorno)
#schedule.every(5).to(10).minutes.do(job)
#schedule.every().monday.do(job)
#schedule.every().wednesday.at("13:15").do(job)
#schedule.every().minute.at(":17").do(job)

while True:
    schedule.run_pending()
    time.sleep(1)
