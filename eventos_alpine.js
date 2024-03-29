

# ejemplos con alpine y tailwing 
https://www.alpinetoolbox.com/examples/ 

<input x-on:keydown.escape="alert('Esc key  pressed.')" /> 
<input x-on:keydown.enter="alert('Enter key pressed.')" />
<input x-on:keydown.arrow-up="alert('Up arrow key pressed.')" />
<input x-on:keydown.arrow-down="alert('Down arrow key pressed.')" />
<input x-model.number="q" />
<input x-model.debounce="q" />
<input x-model.debounce.500ms="q" />   se actualiza pasado 0.5 segundos

<div x-ref="year"><span>Year</span></div>
$refs.title.innerText

<div x-ref="title">Title</div>
<button @click="alert($refs.title.innerHTML)"></button>

<button @click="aFunction($event)">Search</button>
<input x-on:input="aFunction($event)" />

<div @c-event="console.log('I am a custom event')">

    <button @click="$dispatch('c-event', 90)">

</div>
<div @c-event="console.log($event.detail)">

    <button @click="$dispatch('c-event', 90)">

</div>
<div @c-event="console.log('Custom event called.')">

  <button x-on:click="myFunction($dispatch)">Search</button>

</div>

# ver los cambios que ocurren con $watch 
<div

  x-data="{ open: false }"

  x-init="$watch('open', value => console.log(value))"

>

  <button @click="open = ! open">Toggle Open</button>

</div>


# importante y probar 

@click.outside="open = false"


# Importante codigo de SELECT 
<div class="w-80 flex pr-3">
    <p class="w-1/2">Select option:</p>
    <div class="w-1/2 inline-block relative">
        <select name="my_option" x-model="selectedOption" class="">
            <template x-for="option in options" :key="option">
                <option :value="option" x-text="option"></option>
            </template>
        </select>
    </div>
</div>


# Para insertar una variable en una cadena texto.
Para insertar variable dentro de una cadena de texto 
` esto es una cadena de texto ${varible} `
` Sr. ${variable} `

<div x-show="login" x-text="`welcome ${username}`"></div> 

# Queremos mostrar con x-text en un span una cadena con varias variables..

<span x-text="`Pagina :${pagina} de ${paginas}, Total  : ${total }`"

lo mismo ocurre con x-html ... 



# codigos de scroll

@scroll.window="atTop = (window.pageYOffset > 40) ? false : true"


# transcisiones en alpine 
<ul
	x-show="isOpen"
	@click.away="isOpen = false"
	class="absolute font-normal bg-white shadow overflow-hidden rounded w-48 border mt-2 py-1 right-0 z-20"
	x-transition:enter="transition transform origin-top-right ease-out duration-200"
	x-transition:enter-start="opacity-0 scale-75"
	x-transition:enter-end="opacity-100 scale-100"
	x-transition:leave="transition transform origin-top-right ease-out duration-200"
	x-transition:leave-start="opacity-100 scale-100"
	x-transition:leave-end="opacity-0 scale-75"
></ul>

# aplicar una clase segun sea cierto o no una variable .
:class="{ 'disabled cursor-not-allowed text-gray-600' : pageNumber==0 }" 


# disabled como aplicarlo con alpine segun una condicion..
:disabled="pageNumber >= pageCount() -1"

# tooltip con tailwing y alpine 

     <div x-data="{ tooltip: false }" class="relative z-30 inline-flex ml-10 mt-10">
        <div x-on:mouseover="tooltip = true" x-on:mouseleave="tooltip = false" class="rounded-md px-3 py-2 bg-indigo-500 text-white cursor-pointer shadow">
          INFORMACION
        </div>
    
        <div class="relative" x-cloak x-show.transition.origin.top="tooltip">
            <div class="absolute top-0 z-10 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-1/2 -translate-y-full bg-orange-500 rounded-lg shadow-lg">
              ESTO ES UN TOOLTIP
            </div>
            <svg class="absolute z-10 w-6 h-6 text-orange-500 transform -translate-x-12 -translate-y-3 fill-current stroke-current" width="8" height="8">
                <rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
              </svg>

            </div>

     </div>

# observar cambios que haya en una variable
this.$watch('busqueda',value => console.log('VALOR:-->',value))  

$watch('variable', valor => function(){})
observa la variable , y cada cambio que haya se ejecuta una funcion..
muy util ..

