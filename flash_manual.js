#------- usuario.html
@click="enviar_eliminados();flash('Lista de Usuarios eliminados...')"
flash('Lista de Usuarios eliminados...')


#----- flash.html
<template x-if="show" @flash.window ="show=true;
                                      message = $event.detail;
                                      setTimeout(()=> show = false,2000)">

<div        

            x-transition:enter="transition duration-200 transform ease-out"
            x-transition:enter-start="scale-75"
            x-transition:leave="transition duration-100 transform ease-in"
            x-transition:leave-end="opacity-0 scale-90"
           
      
            x-text="message"
            style="top:20%;left:35%;"
            class="fixed bg-blue-500 text-white rounded p-5 z-50">


</div>

</template>


#------   admin.js 
window.flash = message => window.dispatchEvent(new CustomEvent('flash',{detail:message}));


#---------------------------
<span id="texto"></span>
#---------------------------

const mensaje = document.getElementById("texto")
mensaje.textContent = "HOLA MUNDO"
mensaje.style.color = "red"

#----------------------------
