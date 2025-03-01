from machine import UART, Pin, PWM
from umqtt.simple import MQTTClient
import network
import time
import ubinascii

buzzer_pin = 5  # Cambia este número según el GPIO que uses

buzzer = PWM(Pin(buzzer_pin))
buzzer.duty_u16(0)

# Configuración de la red WiFi
#SSID = "MiFibra-06B0"  # Nombre de la red WiFi
#PASSWORD = "F7U6DyEG"  # Contraseña de la red WiFi
SSID = "iPhone de joaquin"  # Nombre de la red WiFi
PASSWORD = "$Adriana0311"  # Contraseña de la red WiFi

# Configuración del broker MQTT
MQTT_BROKER = "100.42.188.239"  # Cambia esto al broker que uses
MQTT_PORT = 1883
MQTT_CLIENT_ID = "micropython_lector_entrada"  # ID único del cliente
MQTT_TOPIC = "lector_entrada"  # Tópico al que te suscribes


uart = UART(1, baudrate=9600, tx=Pin(21), rx=Pin(20))
last_card = ''  # Variable para almacenar la última tarjeta leída
data =''
tarjeta_id = ''

client_id = ubinascii.hexlify(network.WLAN().config('mac'),':').decode()

# Configuración del pin para el LED
LED_PIN = 2  # Pin utilizado para controlar el LED
led = Pin(2, Pin.OUT)
status = False  # Estado de encendido/apagado del LED
led.value(0)

# Función de callback para manejar los mensajes recibidos
def mqtt_callback(topic, msg):
    print(f"Mensaje recibido en el tópico {topic.decode()}: {msg.decode()}")
    valor = msg.decode()
    if valor == 'off':
        led.value(0)
    else:
        led.value(1)

# Configuración del cliente MQTT
client = MQTTClient(MQTT_CLIENT_ID, MQTT_BROKER, port=MQTT_PORT)

def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print('Connecting to WiFi...')
        wlan.connect(SSID, PASSWORD)
        while not wlan.isconnected():
            pass
    print('Connected to WiFi:', SSID)
    

def pitido(frecuencia=1000, duracion=1):

    buzzer.freq(2000)  # Configura la frecuencia en Hz
    buzzer.duty_u16(32768)   # Ajusta el duty cycle (50% = 32768 en un rango de 0-65535)
    time.sleep(duracion)     # Tiempo que suena el pitido
 
    buzzer.duty_u16(0)



def leer_rdm6300():
    """
    Lee y decodifica el paquete de datos enviado por el RDM6300.
    Devuelve el ID de la tarjeta RFID o None si los datos son inválidos.
    """
    global tarjeta_id
    global last_card
    global data
    global uart
    global client
    global led
    
   
    if uart.any() >= 14:  # El paquete completo tiene 14 bytes
        
     
        data = uart.read(14)
        if data and len(data) == 14:
     
            

            
            
            
            if data[0] == 0x02 and data[13] == 0x03:  # Verifica inicio (0x02) y fin (0x03) del paquete
                tarjeta_id = data[1:11]  # Extrae los bytes que contienen el ID en ASCII
              
                try:
                    tarjeta_id = int(tarjeta_id.decode('ascii'), 16)  # Convierte el ID de ASCII a entero hexadecimal
                    if tarjeta_id != last_card:  # Solo procesar si la tarjeta es nueva
                        print("Nueva tarjeta detectada:", tarjeta_id)
                        last_card = tarjeta_id  # Guardar la última tarjeta
                        
                        client.publish('lector_entrada', str(tarjeta_id))
                        led.value(1)
                        pitido()
                        
                        return tarjeta_id
                    return ''
                except ValueError:
                    print("Error: Datos corruptos")
                    return ''
            else:
                print("Error: Paquete inválido")
                return ''
    return ''


def main():
    connect_wifi()
    n = 0
    global led
    try:
        # Conectar al broker MQTT
        client.connect()
        print(f"Conectado al broker MQTT: {MQTT_BROKER}")

        # Asignar la función de callback
        client.set_callback(mqtt_callback)

        # Suscribirse al tópico
        client.subscribe(MQTT_TOPIC)
        print(f"Suscrito al tópico: {MQTT_TOPIC}")
        tarjeta = ''

        # Escuchar mensajes indefinidamente
        while True:
            # Verificar si hay mensajes disponibles
            client.check_msg()  # No bloqueante
            # También puedes usar client.wait_msg() para esperar activamente mensajes

            # Agregar una pausa para evitar sobrecargar el procesador
            
            # tarjeta = leer_rdm6300()
            if tarjeta != '':
                print("Tarjeta verificada:", tarjeta)
                
     
                time.sleep(2)
                led.value(0)
                    # pitido()
                tarjeta = ''
                
                    
              
                
            # time.sleep(0.1)  # Pequeño retardo para evitar saturar la CPU
            
            if not tarjeta:
                
                print('esperando ok')
                tarjeta = leer_rdm6300()
                
            time.sleep(0.1)

    except Exception as e:
        print(f"Error: {e}")

    finally:
        # Desconectar del broker MQTT
        client.disconnect()
        print("Desconectado del broker MQTT")

if __name__ == "__main__":
    main()
