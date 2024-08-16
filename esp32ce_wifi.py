
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
    sta_if.connect("MiFibra-06B0", "F7U6DyEG")
    print("Conectando a la red MiFibra-06B0 ...")
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
<button name="LED" value='OFF' type='submit'> LED ON </button>
<button name="LED" value='ON' type='submit'> LED OFF </button></center>
<br><br>
'''
LED0 = machine.Pin(8,machine.Pin.OUT)
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
