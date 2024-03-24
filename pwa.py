#pwa
# para inpecionar chrome los services worker 
chrome://inspect

import json
import ast

from datetime import datetime
from pywebpush import webpush, WebPushException 

DER_BASE64_ENCODED_PRIVATE_KEY_FILE_PATH = os.path.join(os.getcwd(),"private_key.txt")
DER_BASE64_ENCODED_PUBLIC_KEY_FILE_PATH = os.path.join(os.getcwd(),"public_key.txt")

VAPID_PRIVATE_KEY = open(DER_BASE64_ENCODED_PRIVATE_KEY_FILE_PATH, "r+").readline().strip("\n")
VAPID_PUBLIC_KEY = open(DER_BASE64_ENCODED_PUBLIC_KEY_FILE_PATH, "r+").read().strip("\n")

VAPID_CLAIMS = {
"sub": "mailto:informatico.joaquin@gmail.com"
}




1º

<link rel="manifest" href="{{url_for('static', filename='manifest.json')}}">

fichero manifest.json -->

{
    "name": "Maderpar",
    "short_name": "Maderpar",
    "description": "Maderpar",
    "background_color": "white",
    "theme_color": "#FFFFFF ",
    "orientation": "portrait",
    "display": "standalone",
    "start_url": "https://maderpar.kozow.com/",
    "scope": "/",
    "lang": "es-ES",
    "icons": [
        {
          "src": "iconos/logo_1024x1024.png",
          "sizes": "1024x1024",
          "type": "image/png"
        },
        {
          "src": "iconos/logo_512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        },

        {
          "src": "iconos/logo_256x256.png",
          "sizes": "256x256",
          "type": "image/png"
        },

        {
          "src": "iconos/logo_128x128.png",
          "sizes": "128x128",
          "type": "image/png"
        },

        {
          "src": "iconos/logo_64x64.png",
          "sizes": "64x64",
          "type": "image/png"
        },
        {
          "src": "iconos/logo_32x32.png",
          "sizes": "32x32",
          "type": "image/png"
        },
        {
          "src": "iconos/logo_16x16.png",
          "sizes": "16x16",
          "type": "image/png"
        }
 
      ]

  }


2º
<script src="{{url_for('static', filename='script.js')}}"></script>

#---------------------------------------------

let swRegistration = null;


function urlB64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/');

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

if (true){

if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('sw.js')
      .then(reg => {
        swRegistration = reg
        console.log('Registro de SW exitoso', reg)
        Notification.requestPermission(function(result) {
          if (result === 'denied') {
            console.log('Permission wasn\'t granted. Allow a retry.');
            return;
          } else if (result === 'default') {
            console.log('The permission request was dismissed.');
            return;
          }
          // Hacer algo con el permiso concedido.
        });
      })
      .catch(err => console.warn('Error al tratar de registrar el sw', err))
  }

}




  function clave_servidor(){

    axios.get('/subcripcion/')
    .then(function (response) {
   
      console.log(' clave del servidor:--->',response);
      localStorage.setItem('applicationServerPublicKey',response.data.public_key)
      const applicationServerPublicKey = localStorage.getItem('applicationServerPublicKey');
      const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
      console.log('swRegistration:--->',swRegistration)
      console.log('applicationServerPublicKey:--->',applicationServerKey)
      swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      })
      .then(function(subscription) {
        console.log('usuario suscrito ');
        console.log('usuario token : ',JSON.stringify(subscription));
        localStorage.setItem('sw_token',JSON.stringify(subscription));
        enviar();


      })
      .catch(function(err) {
        console.log('error al subscribirse', err);
    
      });

    })

  }

  
  if (!localStorage.getItem('sw_token')){
    console.log('sw_token',localStorage.getItem('sw_token'))
    console.log('no hay token:----> ',localStorage.getItem('sw_token'))
       clave_servidor()
  }
  

  async function enviar(){
    const json = JSON.stringify({'sw_token':localStorage.getItem('sw_token')});
    const res = await axios.post('/subcripcion/', json ,  {headers: {
    
      'Content-Type': 'application/json'
    }}).then( response =>{
      console.log('respuesta:',response)
    }

    );
  }
#----------------------------------------------------------------------------------------
  


# FLASK main.py

@app.route("/subcripcion/", methods=["GET", "POST"])
def subcripcion():
    """
        POST creates a subscription
        GET returns vapid public key which clients uses to send around push notification
    """

    if request.method == "GET":
        return Response(response=json.dumps({"public_key": VAPID_PUBLIC_KEY}),
            headers={"Access-Control-Allow-Origin": "*"}, content_type="application/json")

    subscription_token = request.get_json("sw_token")
    tok = json.loads(subscription_token['sw_token'])

    
    usuario = Usuario.query.get(11)
    dispositivo = Dispositivo()
    dispositivo.usuario_id=11
    dispositivo.sw_token = str(tok)
    db.session.add(dispositivo)
    db.session.commit()
    return Response(status=201, mimetype="application/json")

# flask enviar notificacion..

@app.route("/enviar/", methods=["GET", "POST"])
def enviar_notificacion():

    admin = Usuario.query.get(1)
    mensaje = f'ADMIN ,tienes avisos en RYD \n 2 lineas portadas \n 5 fijos en la calle menorca\n esto es una prueba\n este mensaje es mas largo\n como es posible que llegue un mensaje mas largo'
    tok3 = Dispositivo.query.get(10)
    tok4 = ast.literal_eval(tok3.sw_token)
    print('token...............',tok4)
    send_web_push(tok4, mensaje)
    return jsonify({'success':1})
