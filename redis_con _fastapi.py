sudo apt update
sudo apt install redis-server
sudo systemctl status redis-server
sudo systemctl enable redis-server



import redis

redis_client = redis.Redis(host='localhost', port=6379, db=0)

Asignamos valores a variables en redis.
redis_client.set("valor", valor)
redis_client.set("n_nomina", n_nomina)

Capturamos valores de variables grabadas en redis
"valor":redis_client.get("valor").decode()
"n_nomina":redis_client.get("n_nomina").decode()

con esto que consigo 
que si en un worker asignamos un valor a una variable de redis

lo podemos capturar ese valor 
en otro worker .

asi podemos mover informacion de la variables entre los worker que tengas ejecutando.
