# EVENTSOURCE   CLIENTE

var eventSource = new EventSource('/cce/en_linea', { withCredentials: true } ) 

eventSource.addEventListener('online',(e)=>{
            var aviso = JSON.parse(e.data)
            
            if (aviso[0].aviso == 'si'){
              campana.className ='parpadea'
            }else{
              campana.className =''
            }

             

           })

# SERVIDOR 

def en_linea (request):

    ahora = datetime.now()
    print('usuario en linea ',request.user.first_name)
    perfil = Perfil.objects.filter(usuario__id = request.user.id).first()
    perfil.on_line = ahora
    perfil.save() 
    lista = []
    dato = {}
    dato['aviso']='no'
    lista.append(dato)
    resultado = json.dumps(lista)
    retorno = f'data: {resultado}\nevent: online\n\n'
    return HttpResponse(retorno, content_type='text/event-stream')
