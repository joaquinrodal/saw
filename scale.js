
scale


<div   x-init="setTimeout(() => estado=true, 1)"
       class="h-[80px] bg-[#000000] 
            flex justify-between 
            transition-all duration-[500ms]
            items-center scale-0"
       :class="{'scale-100':estado}">


 Este div es un menu de 80px de alto , con fondo negro.
 justificado con una transtion de 500ms , partiendo de scale-0 
 dinamicamente insertamos una clase con una condicion
 :class="{'scale-100':estado}"

 cuando estado sea verdadero scale valdra 100 
 y cuando iniciamos el div 
 x-init="setTimeout(() => estado=true, 1)

 con x-init ejecutamos el setTimeout que cabiamos el estado al segundo pasado 

 con efecto visual bueno.
 

              
