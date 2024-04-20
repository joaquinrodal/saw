
        tab:'',
        fecha_entrega:'',
        facturas:[],
        factura:{},
        firma_cliente:'',
        formData:new FormData(),
        imagen: new Image(),
        dato:'hola mundo',
        fichero1:null,
        fichero2:null,
        fichero3:null,
        bloque:null,
        bit_image:false,
        nombre_archivo1:'',
        nombre_archivo2:'',
        nombre_archivo3:'',






<div x-init="

$refs.area3.addEventListener('dragover', function(e) {
   e.preventDefault(); // Prevenir el comportamiento por defecto
   $refs.area3.classList.add('bg-yellow-200');
   });
   
   $refs.area3.addEventListener('dragleave', function() {
       $refs.area3.classList.remove('bg-yellow-200');
   });

 $refs.area3.addEventListener('drop', function(e) {
   e.preventDefault(); // Prevenir el comportamiento por defecto
   $refs.area3.classList.remove('bg-yellow-200'); // Quitar clase de resaltado al soltar los archivos

   var files = e.dataTransfer.files;

   $refs.firma_area3.files = files;
   console.log('Archivos seleccionados 34:', $refs.firma_area3.files[0].name);
   nombre_archivo3 = $refs.firma_area3.files[0].name
 });
 $refs.firma_area3.addEventListener('change', function() {
 
   console.log('Archivos seleccionados:', fileInput.files);
 });


"
 x-ref="area3" 
 class="w-[220px] h-[130px] border rounded-[5px] border-dashed border-4 md:ml-[18%] mt-[10px]
          flex justify-center items-center flex-col">
          <div>
           <img   class="h-[40px]"
                  src="/static/imagenes/cloud_firma.png" alt="">
          </div>
          <label class="text-[18px] hover:scale-[1.1] cursor-pointer" for="fichero3">Iban : </label>

         <input x-ref="firma_area3" hidden
                                   accept="*/*"
                                  id="fichero3"
                                  type="file" 
                                  class=" text-[15px] w-[500px] mx-[20px]"
                                  x-ref="fichero3" 
                                  x-on:change="file = Object.values($event.target.files);
                                  nombre_archivo3 = $refs.firma_area3.files[0].name
                           ">

<div x-text="nombre_archivo3"></div>
</div>
