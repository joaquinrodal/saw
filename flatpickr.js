
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <script src="/static/js/flatpickr.js"></script>
    <script src="/static/js/flatpickr.es.js"></script>


    
      <!-- FECHA-->
      <div class="mx-auto w-[100%] relative">
      
        <label class="text-[13px] tracking-widest " for="alta">Fecha</label>
      
        <div  x-init="
        flatpickr($refs.fecha_registro, {
              locale: 'es', 
              dateFormat: 'd-m-Y',
              minDate: 'today',
              onChange: function(selectedDates, dateStr, instance) {
                
                    const originalDate = selectedDates[0]; // Obtener el objeto de fecha seleccionado
           
                    horario_fecha = instance.formatDate(originalDate, 'd-m-Y');
                    horario.fecha = instance.formatDate(originalDate, 'Y-m-d'); 
       
                }
            });
         
         console.log('FLATPICK:-->',$refs.fecha_registro);
         "
         class="border rounded-[5px] px-5px flex items-center h-[35px]"
        >
        <svg  class="mr-[20px] ml-[12px] text-[#D3D2D1]"
        xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
       
          <input  class="outline-[#ffffff]" 
                  x-model="horario_fecha"
                  type="text" 
                  x-ref="fecha_registro" 
                  placeholder="Selecciona una fecha">
      </div>
    
   </div> 
