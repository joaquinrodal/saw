#----------------------------
   Problema:
 Cunado creo una funcion en hyperscript 
 y cuando desde alpine quiero acceder a esa funcion de hyperscript 
 me da un error de que la funcion no existe

 el problema es que carga primero alpine y luego hyperscript 

Soluccion:
cargar 1º hyperscript
2º definir todas las funciones en hyperscript 

y de alguna forma cargar por ultimo 
alpine js

Para eso al final del body
poner esto :

  <script>

        window.addEventListener('load', function() {
        // Cargar Alpine.js dinámicamente
        let script = document.createElement('script');
        script.src = '/static/js/alpinejs_3.js';
        script.defer = true;
        document.head.appendChild(script);

        // Ejecutar código cuando Alpine.js esté disponible
         script.onload = function() {
            console.log('Alpine.js cargado después de Hyperscript');
          };
       });

  </script> 

#-----------------------------------------------
