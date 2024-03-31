
El método .find() y .findIndex()
Dentro de las Array functions, existen dos métodos interesantes: find()  y findIndex() . 
Ambos se utilizan para buscar elementos de un array mediante una condición, 
la diferencia es que el primero devuelve el elemento mientras 
que el segundo devuelve su posición en el array original. Veamos como funcionan:

const names = ["Ana", "Pablo", "Pedro", "Pancracio", "Heriberto"];

names.find((name) => name.length == 5);       // 'Pablo'
names.findIndex((name) => name.length == 5);  // 1

La condición que hemos utilizado en este ejemplo es 
buscar el elemento que tiene 5 carácteres de longitud. 
Al buscarlo en el array original, el primero que encontramos es Pablo, 
puesto que find() devolverá 'Pablo' y findIndex() devolverá 1, 
que es la segunda posición del array donde se encuentra.

En el caso de no encontrar ningún elemento que cumpla la condición, 
find() devolverá , mientras que findIndex(), que debe devolver un , devolverá -1.

#---------------------------------------------

El método .findLast() y .findLastIndex()
De la misma forma, tenemos findLastIndex() y findLast(), 
  que son las funciones equivalentes a findIndex() y find(), 
  pero buscando elementos desde derecha a izquierda, en lugar de izquierda a derecha:

const names = ["Ana", "Pablo", "Pedro", "Pancracio", "Heriberto"];

names.findLast((name) => name.length == 5);       // 'Pedro'
names.findLastIndex((name) => name.length == 5);  // 2

En este caso, en lugar de encontrarnos a Pablo (posición 1), el primer elemento que tiene 5 carácteres, como va buscando de derecha a izquierda, el primero que encuentra es Pedro (posición 2).
