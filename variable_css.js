en style


.contador {
  --color:red;
  --dark-color: yellow;
  display:grid;


}

desde js 

const contador = document.querySelector('.contador') 

contador.style.setProperty("--color", el color deseado)

contador.getPropertyValue('--color')
// ----- increible ------
<div  x-ref="ver2"
      class="grid grid-cols-[1fr,1fr,1fr]
             mt-[30px] fijo bg-yellow-200 
             ">
     <div class=" grid grid-cols-[1fr,1fr]">
          <div>1a</div>
          <div>2a</div>
     </div>
     <div>2</div>

     <div>3</div>

</div>
<div @click="$refs.ver2.style.setProperty('--color','green');console.log('fijo--------->',$refs.ver2.style.getPropertyValue('--color'))">
               boton
</div>
 
// tenemos un div con x-ref="ver2" 
   que lo referenciamos con $refs.ver 
   y si queremos acceder a los estilos 
   $refs.ver2.style   ---> increible 

   $refs.ver2.style.setProperty('--color','green') con esto accedemos a la variable --color donde podemos asignarle el valor de green .
     
   para obtener el valor de la variable --color 
   $refs.ver2.style.getPropertyValue('--color') --> increible.

 .classList	Devuelve la lista de clases del elemento HTML.
 .classList.length	Devuelve el número de clases del elemento HTML.
 .classList.item(n)	Devuelve la clase número n del elemento HTML.  si no existe.
 .classList.contains(clase)	Indica si la clase existe en el elemento HTML.
//   Acciones sobre clases
.classList.add(c1, c2, ...)	Añade las clases c1, c2... al elemento HTML.
.classList.remove(c1, c2, ...)	Elimina las clases c1, c2... del elemento HTML.
 .classList.toggle(clase)	Si la clase no existe, la añade. Si no, la elimina.
 .classList.toggle(clase, expr)	Si expr es true, añade la clase. Si es false, la elimina.
 .classList.replace(old, new)	Reemplaza la clase old por la clase new.


 <div @click="$refs.mensaje40.classList.add('text-[30px]')"
       >BOTON2</div>
       <div @click="$refs.mensaje40.classList.remove('text-[30px]')"
       >BOTON2</div>
       <div @click="$refs.mensaje40.classList.toggle('text-[30px]')"
       >BOTON3</div>


       <div x-ref="mensaje40"
            @mouseover="$el.classList.add('text-[30px]')" 
            @mouseleave="$el.classList.remove('text-[30px]')"
            class="transition-all duration-[500ms] cursor-pointer">JOAQUIN</div>

 para hacer referencia al mismo elemento podemos acceder con $el

        $el.classList.add('text-[30px]')  ---> con esto añadimos una clase al elemento 
        $el.classList.remove('text-[30px]') ----> con esto eliminamos una clase al elemento.

        transition-all   hacer transiciones en todas
        duration-[x]  ---> duracion en segundos o milisegundos     1s   2ms 2000ms = 2s

 .classList.contains(clase) ---> comprueba si existe una clase dentro de un elemento.

