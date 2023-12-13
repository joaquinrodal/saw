FASTAPI --> TELEGRAM VIA WEBHOOK


@app.post('/webhook')
# este es el token de crmmovil_bot
# t.me/crmmovil_bot
# 
# https://api.telegram.org/bot<token>/setWebhook?url=<tu_url_webhook> 
# https://api.telegram.org/bot6554423575:AAEvXfuNE5qpf162twBgPfTWc1UQpyjdnCw/setWebhook?url=https://crmmovil.freemyip.com/webhook
# https://api.telegram.org/bot6554423575:AAEvXfuNE5qpf162twBgPfTWc1UQpyjdnCw/getWebhookInfo
# https://api.telegram.org/bot<token>/deleteWebhook

async def webhook(request : Request):
    message = await request.json()
   
    if 'message' in message :
        chat_id = message["message"]["from"]["id"]
        mensaje = message["message"]["text"] 
        texto = mensaje.split('-')
        usuario = db.query(Usuario).filter(Usuario.chat_id == chat_id).first()
        if usuario :
            url = "https://api.telegram.org//sendMessage"
            async with httpx.AsyncClient() as client:
                nombre = message["message"]["from"]["first_name"]
                salida = f'Hola {nombre}, Ya estas registrado en la aplicacion...'
                response = await client.post(url=url , json={"chat_id":chat_id,"text":salida})
        else:
            if texto[0] == 'X':
                usuario = db.query(Usuario).filter(Usuario.dni == texto[1]).first()
                if usuario:
                    usuario.chat_id = chat_id
                    db.commit()
                    url = "https://api.telegram.org/sendMessage"
                    async with httpx.AsyncClient() as client:
                        nombre = message["message"]["from"]["first_name"]
                        salida = f'Hola {nombre}, Ya estas registrado en la aplicacion...'
                        response = await client.post(url=url , json={"chat_id":chat_id,"text":salida})
                else:
                    url = "https://api.telegram.org//sendMessage"
                    async with httpx.AsyncClient() as client:
                        nombre = message["message"]["from"]["first_name"]
                        salida = f'Hola {nombre}, No estas dado de alta en la aplicacion CRMMOVIL, REGISTRATE...'
                        response = await client.post(url=url , json={"chat_id":chat_id,"text":salida})
            else:
 
                url = "https://api.telegram.org/sendMessage"
                async with httpx.AsyncClient() as client:
                    nombre = message["message"]["from"]["first_name"]
                    salida = f'Hola {nombre}, no estas registrado en la aplicacion, tienes que registrarte primero. para ello tienes que mandarme el siguiente codigo : X-dni , sustituye dni por tu dni con la letra al final'
                    response = await client.post(url=url , json={"chat_id":chat_id,"text":salida})

        mensaje = message["message"]["text"]
        print('chat_id:->',chat_id)
        print('MENSAJE:->',mensaje)

        #url = "https://api.telegram.org//sendMessage"
        #async with httpx.AsyncClient() as client:
            #nombre = message["message"]["from"]["first_name"]
            #salida = f'Hola {nombre}, soy el servidor que deseas ..'
            #response = await client.post(url=url , json={"chat_id":chat_id,"text":salida})

        #url = "https://api.telegram.org/sendPhoto"
        #async with httpx.AsyncClient() as client2:
            #url_foto = 'https://crmmovil.freemyip.com/static/documentos/18-portada.png'
            #response2 = await client2.post(url=url , json={"chat_id":chat_id,"photo":url_foto})

    #print('MENSAJE:-->',message)




    return message



EN JS fichero api.js
        // ENVIAR TELEGRAM
        enviar_telegram :(id,mensaje)=>{
            var data = {
                'usuario_id':id,
                'mensaje':mensaje
            }
            window.axios.post('/enviar_telegram',data)
            .then(resp=>{
                console.log('enviado')
            })
        },


y en el html 

 enviar_telegram(contrato.usuario.id,`FIJO:${fijo.linea},......NOTA:${nota_fijo.nota}`); 

enviar la nota --> via axios...
