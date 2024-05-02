
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
