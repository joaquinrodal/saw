
<script src="{{url_for('static', filename='js/alpine.js')}}"></script>

x-data: Nos permite declarar un nuevo scope (espacio de trabajo) del componente

x-show: Muestra, o no, un elemento dependiendo de un resultado booleano.

x-bind: Asigna el valor de un atributo a partir del resultado de una expresión javascript.

x-model: Mantiene la entrada del elemento sincronizado con los datos del componente.

x-on: Adjunta un evento a un elemento y ejecuta una expresión javascript cuando se emite el evento.

x-text: Actualiza el texto que contiene un elemento.

x-for: Permite crear tantos nodos en el DOM como elementos contenga un array dado.

@click="open = true"
@click.away="open = false"  cuando se hace click fuera del objeto..

x-data	Declara un nuevo scope del componente.
x-init	Ejecuta una expresión cuando un componente se inicializa.
x-show	Alterna display: none; en el elemento dependiendo de la expresión booleana (true o false).
x-bind	Asigna el valor de un atributo a partir de el resultado de una expresión de JS.
x-on	Adjunta un evento listener al elemento. Ejecuta una expresión de JS cuando se emite el evento.
x-model	Añade "two-way data binding" al elemento. Mantiene la entrada del elemento sincronizado con los datos del componente.
x-text	Funciona similar a x-bind, pero actualiza el innerText del elemento.
x-html	Funciona similar a x-bind, pero actualiza el innerHTML del elemento.
x-ref	Forma conveniente de extraer elementos crudos del DOM del componente.
x-if	Elimina totalmente un elemento del DOM. Debe ser utilizado en una etiqueta <template>.
x-for	Crea nuevos nodos en el DOM por cada elemento en un arreglo. Debe ser utilizado en una etiqueta <template>.
x-transition	Directivas para aplicar clases a varias etapas de la transición del elemento.
x-spread	Permite hacer bind de un objeto de las directivas de Alpine a un elemento para mejor reusabilidad.
x-cloak	Este atributo se elimina cuando Alpine se inicializa. Útil para ocultar el DOM pre-inicializado.

x-on:click="open"
x-init="() => { // aquí tenemos acceso al estado de post-inicialización del DOM // }"

    div x-show="[expression]"></div>

<input x-bind:[attribute]="[expression]">
<button x-on:[event]="[expression]"></button>
<input x-on:input.debounce.750="fetchSomething()">
<input x-on:input.debounce.750ms="fetchSomething()">

<input type="text" x-model="[data item]"></input>
<span x-text="foo"></span>

<div x-ref="[ref name]"></div><button x-on:click="$refs.[ref name].innerText = 'bar'"></button>
<template x-if="true"><div>Some Element</div></template>

<template x-for="item in items" :key="item">
    <div x-text="item"></div>
</template>

@mouseover=""
@mouseout=""
@click=""
x-on:ketdown.enter=""
x-on:click.away="" hacer click fuera del componente



// Alpine como injectar html a una etiqueta

<div x-html="obtener_datos()"></div> 

// en el archivo js 

     obtener_datos : function(){
         this.variable = '<span>hola</span>'
     }


// Para asignar un valor a un estilo en style

:style="`background-color:${x.color}`" 

  : asignamos variales de alpine al contenido de style
como style solo recibe string le pasaremos string
para insertar un valor a un string 
usaremos   `${variable} texto`
