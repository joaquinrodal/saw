Quiero ejecutar desde el html una funcion pasandole el nombre de la funcion.


  1. en alpine js declaro dos variable
  orden:'',
  app:null,

  2. en la function start() , que la inicializo con alpine con
     x-init="start()"  dentro del body 

       start: function(){
       this.app = window.document.body._x_dataStack[0]
       },

  3, una vez que tengo la variable app que representa el alpine 
    que tengo en uso ...

    dentro del html puedo ejecutar lo siguiente :

    orden = 'eliminar_contacto'
    app[orden]() 
    con este comando ejecuamos una funcion que tenemos definida en un fichero.js

    function eliminar_contacto(){

    var data = {...this.contacto}
 
    axios.post('/admin/eliminar_contacto',data)
    .then(resp =>{
        
        this.listar_clientes()

    } )
    }

     dentro del html , y dentro del @click podemos ejecutar cualquier comando js separados por ; 
     <div    @click="console.log('ORDEN:',orden);
                     console.log('TAB-->:',camino);
                     app[orden]();
                     atras_camino();"
                       
              class="h-[30px] border mx-[10px] rounded-[10px] cursor-pointer
                            bg-green-800 text-white px-3 
                            flex items-center hover:bg-blue-800">
                              
                              Confirmar
    </div>

 asi de esta manera tengo una ventana de aviso advertencia , y dependiendo de la orden que asigne podra ejecutar una
 funcion u otra la que quiera aprovechando la misma ventana.

 seguire perfecionando esta tecnica.

   
    
