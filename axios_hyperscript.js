        <button _="
                          on click 
                          call axios.get('/websocket') 
                          then log it.data
                          then put it.data into #resul30
                          then put it.data into al.res40
            ">
                  axios
        </button>

# Aqui esta como usando hyperscript 
  podemos usar axios con una peticion get 
  cuya respuesta la metemos en una variable de alpinejs
  para que con reactividad 
  la muestre en el dom de lla pagina html

# que maravilla de codigo.

       <div _="
                on click 
                call axios.post('/datos',{id:al.id}) 
                then log it.data
                then set al.mensaje to it.data
            "
            >PEDIR</div>
#################################################
espera 1s para que se cargue alpinejs 
repetir conexiones cada 3s
      <div _="
             init
             wait 1s
             repeat forever
                call axios.post('/datos',{id:al.id}) 
                then set al.mensaje to it.data
                wait 3s
              end
             ">EMPEZAR</div>
--------------------------------------------------




