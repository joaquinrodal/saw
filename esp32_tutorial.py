boot.py
# This file is executed on every boot (including wake-boot from deepsleep)
#import esp
#esp.osdebug(None)
#import webrepl
#webrepl.start()
# boot.py -- run on boot-up
import network, utime, machine

# Replace the following with your WIFI Credentials
SSID = "MiFibra-06B0"
SSID_PASSWORD = "F7U6DyEG"


def do_connect():
    sta_if = network.WLAN(network.STA_IF)
    if not sta_if.isconnected():
        print('connecting to network...')
        sta_if.active(True)
        sta_if.connect(SSID, SSID_PASSWORD)
        while not sta_if.isconnected():
            print("Attempting to connect....")
            utime.sleep(1)
    print('Connected! Network config:', sta_if.ifconfig())
    
print("Connecting to your wifi...")
do_connect()


main.py

import time
import ubinascii
from machine import Pin
from umqtt.simple import MQTTClient

# Default MQTT MQTT_BROKER to connect to
MQTT_BROKER = "37.60.247.141"
CLIENT_ID = ubinascii.hexlify(machine.unique_id())
TOPIC = b"temperature"
led_pin = 8
led = Pin(led_pin, Pin.OUT)

# Received messages from subscriptions will be delivered to this callback
def sub_cb(topic, msg):
    print((topic, msg))
    message_str = msg.decode('utf-8')
    print(message_str)
    if message_str == 'ON':
        print('ON1')
        led.on()
    else:
        print('OFF2')
        led.off()


def main():
    mqttClient = MQTTClient(CLIENT_ID, MQTT_BROKER, keepalive=60)
    mqttClient.set_callback(sub_cb)
    mqttClient.connect()
    mqttClient.subscribe(TOPIC)
    print(f"Connected to MQTT  Broker :: {MQTT_BROKER}, and waiting for callback function to be called!")
    while True:
        if True:
            # Blocking wait for message
            mqttClient.wait_msg()
        else:
            # Non-blocking wait for message
            mqttClient.check_msg()
            # Then need to sleep to avoid 100% CPU usage (in a real
            # app other useful actions would be performed instead)
            time.sleep(1)

    mqttClient.disconnect()


if __name__ == "__main__":
    main()

publisher.py

import time
import ubinascii
import machine
from umqtt.simple import MQTTClient
import random

# Default MQTT server to connect to
SERVER = "37.60.247.141"
CLIENT_ID = ubinascii.hexlify(machine.unique_id())
TOPIC = b"temperature"

def reset():
    print("Resetting...")
    time.sleep(5)
    machine.reset()
    
def main():
    mqttClient = MQTTClient(CLIENT_ID, SERVER, keepalive=60)
    mqttClient.connect()
    print(f"Connected to MQTT  Broker :: {SERVER}")

    while True:
        random_temp = random.randint(20, 50)
        print(f"Publishing temperature :: {random_temp}")
        mqttClient.publish(TOPIC, str(random_temp).encode())
        time.sleep(3)
    mqttClient.disconnect()
    
    
if __name__ == "__main__":
    try:
        main()
    except OSError as e:
        print("Error: " + str(e))
        reset()

subscriber.py

import time
import ubinascii
from umqtt.simple import MQTTClient
import machine
from machine import Pin

# Default MQTT MQTT_BROKER to connect to
MQTT_BROKER = "37.60.247.141"
CLIENT_ID = ubinascii.hexlify(machine.unique_id())
TOPIC = b"temperature"
led_pin = 8
led = Pin(led_pin, Pin.OUT)


# Ping the MQTT broker since we are not publishing any message
last_ping = time.time()
ping_interval = 60

# Received messages from subscriptions will be delivered to this callback
def sub_cb(topic, msg):
    print((topic, msg))
    message_str = msg.decode('utf-8')
    print(message_str)
    if message_str == 'ON':
        print('ON1')
        led.off()
    else:
        print('OFF2')
        led.on()




def reset():
    print("Resetting...")
    time.sleep(5)
    machine.reset()
    
def main():
    mqttClient = MQTTClient(CLIENT_ID, MQTT_BROKER, keepalive=60)
    mqttClient.set_callback(sub_cb)
    mqttClient.connect()
    mqttClient.subscribe(TOPIC)
    print(f"Connected to MQTT  Broker :: {MQTT_BROKER}, and waiting for callback function to be called!")
    while True:
        if False:
            # Blocking wait for message
            mqttClient.wait_msg()
        else:
            # Non-blocking wait for message
            mqttClient.check_msg()
            # Then need to sleep to avoid 100% CPU usage (in a real
            # app other useful actions would be performed instead)
            global last_ping
            if (time.time() - last_ping) >= ping_interval:
                mqttClient.ping()
                last_ping = time.time()
                now = time.localtime()
                print(f"Pinging MQTT Broker, last ping :: {now[0]}/{now[1]}/{now[2]} {now[3]}:{now[4]}:{now[5]}")
            time.sleep(1)
            
    print("Disconnecting...")
    mqttClient.disconnect()


if __name__ == "__main__":
    try:
        main()
    except OSError as e:
        print("Error: " + str(e))
        reset()



