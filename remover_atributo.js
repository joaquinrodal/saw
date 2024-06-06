
  <details x-ref="lista"
           class="transition-all duration-[1s] cursor-pointer open">
    <summary  @click="paso=!paso;"
              class="transition-all duration-[1s] flex items-center">
      <span>
        <img  class="h-[15px] rotate-0 transition-all duration-[.5s]"
              :class="{'rotate-90':paso}"
              
              src="/static/imagenes/derecha.png" alt="">

      </span><span 
                   class="ml-[10px]">Usuario</span>
    </summary>
    <div class="transition-all duration-[1s] ml-[30px] scale-0"
         :class="{'scale-100':paso}">
      <div  @click="$refs.lista.removeAttribute('open');paso=false;"
            class="hover:bg-yellow-200">crear</div>
      <div>modificar</div>
    </div>
  </details>


$refs.lista.removeAttribute('open')

el elemento $refs.lista    
luego quitar atributo :-->
  .removeAttribute('open')  
 quita el atributo que se ha puesto al div..

   cuando presionamos en el sumary --> aparece el atributo open mostrando el detalle.

   
