#------------------------>
Localizar un archivo que se ha quedado en ejecucion y quiero pararlo, eliminarlo.

Listar procesos mediante un filtro , sabiendo como se llama el archivo de python

en este caso mi archivo en cuestion se llama mqt.py
pues en debian seria asi:

ps aux | grep mqt.py 

y saldria una cosa como esta :
joaquin   496423 16.5  1.7 207040 106320 pts/48  Sl+  15:09   0:01 python mqt.py
joaquin   496430  0.0  0.0   9020  2208 pts/50   S+   15:09   0:00 grep mqt.py

una vez localizado podemos matar el proceso mediante.

kill -9 496430 

  y con esta orden eliminamos el proceso de ese archivo en cuestion.
