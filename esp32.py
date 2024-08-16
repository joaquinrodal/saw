
lista todos los usb conectados al m2 del minimac
ls -l /dev/cu* 

esptool.py --chip esp32c3 --port /dev/ttyUSB0 erase_flash

/dev/cu.usbmodem1301

  esptool.py --chip esp32c3 --port /dev/cu.usbmodem1301 erase_flash

  esptool.py --chip esp32c3 --port /dev/cu.usbmodem1301 --baud 460800 write_flash -z 0x0 ESP32_GENERIC_C3-20240602-v1.23.0.bin

  ESP32_GENERIC_C3-20240602-v1.23.0.bin

  ## COMANDO QUE FUNCIONO BIEN PARA INSTALAR MICROPYTHOPN EN ESP32C3
  esptool.py --chip esp32c3 --port /dev/cu.usbmodem1301 --baud 460800 write_flash -z 0x0 ESP32_GENERIC_C3-20240602-v1.23.0.bin


  
# FUNCION MICROPYTHON PARA CONEXION ESP32
 
def do_connect(SSID, PASSWORD):
    # Importamos modulo network
    import network                            
    global sta_if
    # Instanciamos el objeto -sta_if- para controlar la interfaz STA
    sta_if = network.WLAN(network.STA_IF)
    # COMIENZA EL BUCLE - SI NO EXISTE CONEXION
    if not sta_if.isconnected():
        # Activamos el interfaz STA del ESP32
        sta_if.active(True)
        # Iniciamos la conexion con el AP
        sta_if.connect("<SSID>", "<PASSWORD>")            
        print('Conectando a la red', SSID + "...")
        # SI NO SE ESTABLECE
        while not sta_if.isconnected():           
            # REPITE EL BUCLE
            pass
    # MUESTRA EN PANTALLA    
    print('CONFIGURACION DE RED(IP/MASCARA/GATEWAY/DNS:', sta_if.ifconfig())
 
#  COMANDO PARA EJECUTAR LA FUNCION
do_connect("<SSID>","<PASSWORD>")



# FUNCION MICROPYTHON PARA CONEXION ESP32
 
def do_connect(SSID, PASSWORD):
    # Importamos modulo network
    import network                            
    global sta_if
    # Instanciamos el objeto -sta_if- para controlar la interfaz STA
    sta_if = network.WLAN(network.STA_IF)
    # COMIENZA EL BUCLE - SI NO EXISTE CONEXION
    if not sta_if.isconnected():
        # Activamos el interfaz STA del ESP32
        sta_if.active(True)
        # Iniciamos la conexion con el AP
        sta_if.connect("MiFibra-06B0", "F7U6DyEG")            
        print('Conectando a la red', SSID + "...")
        # SI NO SE ESTABLECE
        while not sta_if.isconnected():           
            # REPITE EL BUCLE
            pass
    # MUESTRA EN PANTALLA    
    print('CONFIGURACION DE RED(IP/MASCARA/GATEWAY/DNS:', sta_if.ifconfig())
 
#  COMANDO PARA EJECUTAR LA FUNCION
do_connect("MiFibra-06B0","F7U6DyEG")




import machine
import socket
import time
# Importamos modulo network
import network
global sta_if
# Instanciamos el objeto -sta_if- para controlar la interfaz STA
sta_if = network.WLAN(network.STA_IF)
# COMIENZA EL BUCLE - SI NO EXISTE CONEXION
if not sta_if.isconnected():
    # Activamos el interfaz STA del ESP32
    sta_if.active(True)
    # Iniciamos la conexion con el AP
    sta_if.connect("SSID", "PASSWD")
    print("Conectando a la red", SSID + "...")
    # SI NO SE ESTABLECE
    while not sta_if.isconnected():
        # REPITE EL BUCLE
        pass
# MUESTRA EN PANTALLA
print("Configuración de red (IP/netmask/gw/DNS):", sta_if.ifconfig())
# PAGINA WEB
html='''<!DOCTYPE html>
<html>
<head><title>ESP32 LED on/off</title></head>
<center><h2>WebServer para encender LED </h2>
<form>
<button name="LED" value='ON' type='submit'> LED ON </button>
<button name="LED" value='OFF' type='submit'> LED OFF </button></center>
<br><br>
'''
LED0 = machine.Pin(16,machine.Pin.OUT)
LED0.value(0)
s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.bind(('',80))
s.listen(5)
while True:
  conn,addr=s.accept()
  print("GOT a connection from %s" % str(addr))
  request=conn.recv(1024)
  print("Content %s" % str(request))
  request=str(request)
  LEDON=request.find('/?LED=ON')
  LEDOFF=request.find('/?LED=OFF')
  if(LEDON==6):
    LED0.value(1)
  if(LEDOFF==6):
    LED0.value(0)
  response=html
  conn.send(response)
  conn.close()
