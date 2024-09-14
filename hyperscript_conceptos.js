# hyperscript 
Conceptos generales

  Insertar un script de hyperscript
 <script type="text/hyperscript">

 </script>
 Definir una funcion dentro de este script 

 def funcion(valores) 

 end 

 Para definir una funcion dentro de hyperscript 
 solo para comandos generales de hyperscript 
 no de javascript

 si queremos ejecutar una funcion de java script 

 comando de hyperscript 

 js(valores) 

 end

 este comando de hyperscript dentro 
 podemos ejecutar funciones que estan en window 
 donde podemos usar los valores que le pasamos

 si ponemos un return dentro del bloque 
 despues del end del js
 podemos recuperar el resultado con it

 # llamada axios desde hyperscript 

                call axios.post('/datos',{id:al.id}) 
                then log it.data
                then set al.mensaje to it.data

   donde en call llamamos a axios post 
   donde entre comillas ponemos la url 
   y el siguiente paso es pasar datos en el body en formato json

   segun en que contexto podemos usar los valores esten donde esten.

  el resultado lo tenemos en it

  para obtener solo la data de lo que devuelve axios
  pondremos it.data

  y podemos poner tantos then como queramos 
  ejecutando las sentencias que queramos


 
