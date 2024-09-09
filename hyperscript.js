<script src="https://unpkg.com/hyperscript.org@0.9.11"></script>

 <div _="on click toggle .bg-blue-400 on me">
        HOLA MUNDO
  </div>

 cuandas hagas click cambia la clase color de fondo azul sobre el mismo elemento.

  AL PULSAR CLICK EN UN BOTON REMOVER UNA CLASE DE UN DIV

_="on click remove .bg-blue-400 from #etiqueta

   esto esta genial --> al pulsar quito el color de fondo de otro div y hago desaparecer el div que lo genera.
    
   <div _="on click remove .bg-yellow-400 from #etiqueta then add .hidden to me">
        QUITAR FONDO DE UN DIV
    </div>
    <div id="etiqueta" class="bg-yellow-400">
        FONDO DE COLOR AMARILLO
    </div>

//----------------

        <div x-init="htmx.process(document.getElementById('auto-update'));"
             id="auto-update" 
             hx-target="#resul"
             hx-get="https://enformate.enwork.net/websocket" 
             hx-trigger="every 3s" 
             hx-swap="innerHTML"
         >
              
        <!-- Contenido inicial -->
        <p id="resul">Esperando nueva data...</p>
              
        <div  x-ref="bot32"
              id="bot"
              x-init="_hyperscript.processNode($refs.bot32)">

                        <button _="on click 
                                   log 'hola quini'
                        ">
                        Click Me
                        </button>

            <button _="on click 
                        fetch '/websocket' 
                        then log it 
                        then put it into the next <output/>">

                Fetch It
            </button>

          <output>--</output>

            <button _="
                          on click 
                          call axios.get('/websocket') 
                          then log it.data
                          then put it.data into #resul30
                          then put it.data into al.res40
            ">
                  axios
            </button>

            <div id="resul30"></div>
            <div x-text="`RESULTADO:${res40}`"></div>
            <div _="
                   init 
                   js
                   console.log('USUARIO;',al.usuario);
                   console.log('USUARIO js;',resul30);
                   console.log('USUARIO resul40;',al.res40);
                   end
                   set al.res40 to 'eureka'
            
            
            "></div>





        </div>

//----------------------------
<body 
       style="font-family:'Montserrat2';font-weight: 300;"
       class="block bg-[#F8F8F8] dark z-[10]" 
       x-data="data_admin()" 
        
        x-init="
                 usuario.id = {{session.id}};
                 usuario_id();
                 if('{{session.rol}}' === 'Trabajador'){
  
                        ver_tab('perfil');
                        tab2 = 'resumen';

                    }; 

         // Variable general al -->
         window.al = document.body._x_dataStack[0];
          
         listado_empleado();
         start();
         
                                     ">
