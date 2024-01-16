#-------------------
  ALPINE JS
#--------------------

  COSAS CURIOSAS A SABER :-->

  @input="console.log('busqueda',conbusqueda);pagina_contrato = 1; listar_contratos();" 

  EL @input --> evento que salta cuando hay cualquier cambio cada vez que pulse una tecla 
 
  @change="console.log('busqueda',conbusqueda);pagina_contrato = 1; listar_contratos();" 
  es cuando hay cambio despues de pulsar la tecla enter .


  Tenemos una imagen que queremos cargar , y el enlace lo tenamos en una base de datos
  imagenamos que la imagen ya no está

  como podemos que si da error al cargar la imagen muestre otra de pruebas de momento

           :src="`https://rrhhenformate.freemyip.com/static/empresa/{{session.logo_empresa}}`" 
           x-on:error="$refs.imagen34.src='/static/imagenes/atras.png'"

     esto lo soluciona elegantemente ..

       :src="" --> esto carga la imagen normalmente.
       pero si ffala al cargar se lo decimos con el siguiente comendo de alpine.js
       x-on:error=" $refs.imagen34,src ='ruta dela imagen'  " ---> que guay
