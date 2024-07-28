     compruebo si en localstore la variable tipos_contrato esta creada

     !== significa distinto 

      null  --> nulo

      para meter valor en localstorage hay que  -->
      JSON.stringify()

      y para obtenerlo -->
      JSON.parse()

      
      

     if (localStorage.getItem('tipos_contrato') !== null)
          {
            console.log('localstorage de tipos contrato si existe')
            start.alpine().lista_tipos_contrato = JSON.parse(localStorage.getItem('tipos_contrato'))
          } 
      else
     
     {
              axios.post('/admin/listar_tipos_contrato3').then((resp)=>{

                    localStorage.setItem('tipos_contrato',JSON.stringify(resp.data));
               
                
                start.alpine().lista_tipos_contrato = JSON.parse(localStorage.getItem('tipos_contrato'))
                console.log('esto es una maravilla2 cargando en localstorage', start.alpine().lista_tipos_contrato);
               })
      }
