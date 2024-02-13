
tenemos un estado y quiero que sea verdadero cuando un estado coiincide
con una lista.

con alpine,js  
x-show="['BORRADOR'].includes(x.estado)"

[].includes(condicion)

['VIGOR','BORRADOR'].includes(x.estado)
será verdadero cuando x.estado sea VIGOR O BORRADOR.
