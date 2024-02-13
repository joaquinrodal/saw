// La idea es 

un div en blanco

<!-- VENTANA MODAL CON ALPINE.JS-->
<!-- Confirmacion de baja de un contrato-->
  
<div x-html="html_baja">

</div>


y desde cualquier parte de la aplicacion 
 en variables 

html_baja = '' 

      @click=" contrato__id = x.id;
               axios.post('/baja').then((resp)=>{
                                    html_baja = resp.data;
               })"
esto hace una llamada API rest y devuelve 
un texto en html 
y lo muestra en el div de arriba cuya variable es html_baja.

y el servidor devuelve :
<!-- MENSAJE DE BAJA AL CONTRATO.-->
<div>
     <!-- FONDO GRIS CON OPACIDAD 30%-->
    <div class="absolute w-[100vw] h-[100vh] bg-black z-[100] opacity-[30%] flex justify-center">
         
    </div>
    <!-- MENSAJE -->
    <div class="absolute w-[30vw] h-[20vh] z-[101] bg-white 
                left-[40%] top-[20%] flex justify-center flex-col
                 items-center text-[20px] rounded-[5px] shadow">
                 <div>Confirmas dar de baja a este contrato ? </div>
                <div class="flex justify-center items-center mt-[10px]">
                    <div  @click='axios.post("/baja_contrato_id",{"contrato_id":contrato__id}).then((resp)=>{
                                  console.log("CAMBIO DE ESTADO:-->",resp.data);
                                  listar_contratos();

                    })    ;                                  html_baja = "";contratos.map((ce)=>ce.bit=false)'
                          class="border rounded-[5px] px-[25px] bg-red-600 mx-[10px]
                                 hover:scale-[1.06] hover:text-white cursor-pointer ">Si</div>
                    <div  @click="html_baja = '';contratos.map((ce)=>ce.bit=false)"
                                   class="border rounded-[5px] px-[25px] bg-green-600 mx-[10px]
                                   hover:scale-[1.06] hover:text-white cursor-pointer ">No</div>
                </div>
              
                
                </div>  
</div>

con el click en si hacemos varias cosas:
1º una peticion axios a cambiar de estado un contrato concreto con un id determinado.
2º listar los contratos para que se actualizen 
3º html_baja = '' , para que desaparezca la ventana modal .
4º cerramos todas la ventanas modales de opciones.
con el click en no hacemos una cosa:
1º cerramos todas la ventanas modales de opciones.
  
