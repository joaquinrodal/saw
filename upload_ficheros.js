
// input 
      <input x-ref="firma_area3" hidden
                                   accept="*/*"
                                  id="fichero3"
                                  type="file" 
                                  class=" text-[15px] w-[500px] mx-[20px]"
                               
                                  x-on:change="file3 = Object.values($event.target.files);
                                  nombre_archivo3 = $refs.firma_area3.files[0].name;
                                  fichero_iban = Object.values($event.target.files);
                                  bit_iban = true ;
                           ">


    // Subir DOCUMENTO USUARIO.
    subir_documento: ()=> {
        console.log('tipo_documento:--->',api.alpine().tipo_documento)
        console.log('nombre_documento:--->',api.alpine().nombre_documento)
        var config = {
            onUploadProgress : (progressEvent)=> {
              var porcentaje = (progressEvent.loaded / progressEvent.total) * 100 
              api.alpine().valor_porcentaje_documento = porcentaje
    
             if(porcentaje === 100){
                 console.log('FICHERO SUBIDO')
                 api.alpine().file = null
         
                 api.alpine().valor_porcentaje_documento = 0
                 api.alpine().$refs.fichero.value = ''
                 console.log('seleccionar fichero:-->',api.alpine().$refs.fichero.value)
                   }
           },
           headers: {
            'Content-Type': 'multipart/form-data'
              }
           
           }
           var formData = new FormData();
    
        
        formData.append("file", api.alpine().file_prueba );
        formData.append("usuario_id", api.alpine().usuario.id )
        formData.append("tipo", api.alpine().tipo_documento )
        formData.append("nombre", api.alpine().nombre_documento )
     

        console.log('DATOS A ENVIAR ;----->',formData)
        //--------------------
        // Subir al servidor
        console.log('form data :-->',formData)
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        axios.post('/subir_documento',formData, config )
        .then(resp=>{
             api.alpine().mostrar_mensaje('Documento se ha cargado al servidor.')
             api.alpine().usuario_id()
             console.log('RESPUESTA DEL SERVIDOR :-->',resp.data)
        }) 
    
        },
