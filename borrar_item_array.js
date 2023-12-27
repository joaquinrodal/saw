
En JavaScript, puedes eliminar un elemento de un array por su índice utilizando el método splice(). 
  El método splice() modifica el contenido de un array eliminando o reemplazando elementos existentes 
  y/o agregando nuevos elementos en su lugar.

Aquí tienes un ejemplo de cómo borrar un elemento por índice:

javascript
Copy code
// Un array de ejemplo
var miArray = [1, 2, 3, 4, 5];

// Índice del elemento que quieres borrar
var indiceABorrar = 2;

// Usar splice para eliminar el elemento en el índice proporcionado
miArray.splice(indiceABorrar, 1);

// Imprimir el array después de la eliminación
console.log(miArray);
