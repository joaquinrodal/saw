#---------------------------------------------
# ENVIAR CORREO 

@app.get("/enviar_correo")

def enviar_correo():
    data = {
    'Messages': [
        {
        "From": {
            "Email": "informatico.joaquin@gmail.com",
            "Name": "JOAQUIN RODAL CHORRO"
        },
        "To": [
            {
            "Email": "adrianaarodal@gmail.com",
            "Name": "adriana rodal"
            }
        ],
        "Subject": "mi primer correo de mailjet",
        "TextPart": "FELICIDADES",
        "HTMLPart": "<H1>hola adriana</h1><div>esto funciona</div>"
        }
    ]
    }
    #result = mailjet.send.create(data=data)
    result2 = mailjet.eventcallbackurl.get()



    response = JSONResponse({'resultado':'ok',
                            'resul':'',
                            'resul2':result2.status_code})
 

    return response
