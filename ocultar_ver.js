
// VENTANA
<div x-ref="importacion"
     
     class="absolute top-[20%] left-[35%] bg-white 
            w-[600px] h-[400px] z-[200] hidden
            flex justify-center items-center border rounded-[5px]">

    IMPORTACIONES



</div>

<span            @click.away="$refs.importacion.classList.add('hidden')"

                  @click="$refs.importacion.classList.remove('hidden')"

                              class="material-symbols-outlined text-[35px] transition-all duration-[1s]
                                     cursor-pointer text-[#ACAAA9] px-[30px]">
                        description
</span>

x-ref="nombre"
$refs.nombre ---> 

classList.remove('nombre_clase') - > quitar clase 
classList.add('nombre_clase') -> añadir clase
