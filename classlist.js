

const element = document.querySelector("#page");

// ¿Qué clases tiene?
element.classList;              // ["info", "data", "dark"] (DOMTokenList)
element.classList.value;        // "info data dark" (String)
element.classList.length;       // 3

// Convertirlas a array
Array.from(element.classList)   // ["info", "data", "dark"] (Array)
[...element.classList];         // ["info", "data", "dark"] (Array)

// Consultarlas
element.classList.item(0);      // "info"
element.classList.item(1);      // "data"
element.classList.item(3);      // null

El objeto .classList aunque parece que devuelve un  no es un array, sino un  que actúa de forma similar a un array, 
  por lo que puede carecer de algunos métodos o propiedades concretos. Si quieres convertirlo a un array real, 
  utiliza Array.from() o desestructuración con [...div.classList].

Por último, observa que disponemos del método .classList.item() 
  que nos devuelve un  con la clase específica en esa posición. 
    Si no existe una clase en esa posición, nos devolverá .
    

Añadir y eliminar clases CSS
Los métodos .classList.add() y .classList.remove() permiten indicar una o múltiples clases CSS a añadir o eliminar. Observa el siguiente código donde se ilustra un ejemplo:

const element = document.querySelector("#page");

element.classList.add("uno", "dos");
element.classList;  // ["info", "data", "dark", "uno", "dos"]

element.classList.remove("uno", "dos");
element.classList;  // ["info", "data", "dark"]

Al utilizar los métodos .add() o .remove(), en el caso de que se añada una clase CSS 
  que ya existía previamente, o que se elimine una clase CSS que no existía, 
    simplemente no ocurrirá nada.
