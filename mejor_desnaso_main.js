#--------------------------------------------------------------
# API BASE DATOS 
#--------------------------------------------------------------
import random
from servidor import app , plantilla
from modelos.modelos import * 
from conexion import get_session 
from sqlmodel import select, col, or_ , col
 
from fastapi import Request ,Response , WebSocket, WebSocketDisconnect , Cookie ,Header ,Request
from fastapi.responses import RedirectResponse, HTMLResponse ,FileResponse
from fastapi.responses import JSONResponse
from lib.decorador import logueado

from jwt import encode ,decode
from fastapi_pagination import Page, add_pagination, paginate ,LimitOffsetPage

#----------------------------------------------------------
# TAREAS EN SEGUNDO PLANO

from fastapi import BackgroundTasks
from typing import List

import ast


#----------------------------------------------------------
# Importamos Librerias para enviar notificaciones 

from pywebpush import webpush, WebPushException
import os
import json

from sqlmodel import Session
from fastapi import Depends
import requests
from rutas.factusol import consulta_cliente,consulta_factura

#-----------------------------------------------------------
# REDIS ,instalacion,  insertar , obtener ,imprimir 

import redis
r = redis.Redis(host="localhost", port="6379")
r.mset({"nombre":"joaquin"})
dat = r.get('nombre').decode("utf-8") # Decodificamos con decode("utf-8")
print('REDIS :-->',dat)

#------------------------------------------------------------

from pydantic import BaseModel

DER_BASE64_ENCODED_PRIVATE_KEY_FILE_PATH = os.path.join(os.getcwd(),"private_key.txt")
DER_BASE64_ENCODED_PUBLIC_KEY_FILE_PATH = os.path.join(os.getcwd(),"public_key.txt")

VAPID_PRIVATE_KEY = open(DER_BASE64_ENCODED_PRIVATE_KEY_FILE_PATH, "r+").readline().strip("\n")
VAPID_PUBLIC_KEY = open(DER_BASE64_ENCODED_PUBLIC_KEY_FILE_PATH, "r+").read().strip("\n")

VAPID_CLAIMS = {
"sub": "mailto:informatico.joaquin@gmail.com"
}

consultar = consulta_cliente
consultar_factura = consulta_factura

#------------------------------------------------------------
# WEBSOCKET 

class ConnectionManager:

    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        await websocket.send_text('CONECTADO')
        print('CONECTADO :-->',self.active_connections)


    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        print('desCONECTADO :-->',self.active_connections)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)
        print('mensaje:-->',message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()

#------------------------------------------------------------------------------
@app.websocket("/wss/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
  
    await manager.connect(websocket)

    
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_personal_message(f"You wrote: {data}", websocket)
            await manager.broadcast(f"Client #{client_id} says: {data}")
     
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client #{client_id} left the chat")

#--------------------------------------------------------------
# al arrancar la aplicacion
@app.on_event('startup')
async def startup_event():
    print('INICIO DE LA APLICACION')

#--------------------------------------------------------------
# al PARAR la aplicacion
@app.on_event('shutdown')
async def shutdown_event():
    print('PARAR DE LA APLICACION')

#-----------------------------------------------------------------
# Prueba de Cokkies
@app.get('/prueba')
def prueba(request: Request , db: Session = Depends(get_session)):
 
    usuario = db.query(Usuario).filter(Usuario.id == 2).one()
    usuario.usuario = 'pedro'
    db.commit()

    print('comandos------>',usuario)

    print('request',request)
    for x in request:
        print('*',x)

    print(request.headers['cookie'])  # forma de saber las cookies
    print('COOKIES:',request.cookies) # otra forma de saber las cookies

    return request.cookies
#-----------------------------------------------------------------
# Prueba de Cokkies

@app.post('/prueba')
def prueba(user:Usuario, db: Session = Depends(get_session)):

    usuario = db.query(Usuario).filter(Usuario.id == 2).one()
    usuario = user
    db.commit()

    print('comandos------>',usuario)

    return usuario



#--------------------------------------------------------------
# RUTA RAIZ DE LA APLICACION 

@app.get("/",response_class=HTMLResponse)
async def root(request: Request, db: Session = Depends(get_session)):

    if 'session' in request.cookies :
        session = decode(request.cookies['session'] ,key="adriana03",algorithms=["HS256"] )
        usuario = db.query(Usuario).get(session['id'])
        # print('USUARIO RUTA :',usuario.ruta)

        if usuario :
            if usuario.perfil == 'ADMINISTRADOR':
                return plantilla.TemplateResponse("/01_admin/admin.html", {"request": request , 'session':session})
            if usuario.perfil == 'TIENDA':
                return plantilla.TemplateResponse("/02_tienda/tienda.html", {"request": request , 'session':session})
            if usuario.perfil == 'ALMACEN':
                return plantilla.TemplateResponse("/03_almacen/almacen.html", {"request": request , 'session':session})
            if usuario.perfil == 'REPARTIDOR':
                return plantilla.TemplateResponse("/04_repartidor/repartidor.html", {"request": request , 'session':session})

        else:
            return plantilla.TemplateResponse("/0_login/login.html", {"request": request})    

    else:
        return plantilla.TemplateResponse("/0_login/login.html", {"request": request})
 
    return plantilla.TemplateResponse("/0_login/login.html", {"request": request})

#----------------------------------------------------------------
# LOGUEARSE 

@app.post("/loguearse", tags=["login"])
def loguearse(usuario:Usuario, db: Session = Depends(get_session)):
    """
          ESTO ES DOCUMENTACION ADICIONAL
    """

    # mensaje = decode(token ,key="adriana03",algorithms=["HS256"] )

    db_usuario = db.query(Usuario).filter(Usuario.usuario == usuario.usuario,Usuario.clave == usuario.clave).first()
    token = ''
    
    if db_usuario :
        token = encode(payload={'nombre':db_usuario.usuario,'id':db_usuario.id,'expira':'2/03/2022'},key="adriana03",algorithm="HS256")
        resultado = 'ok'
        response = JSONResponse({'resultado':resultado})
        response.set_cookie(key="session", value=token)
        response.set_cookie(key="id", value=db_usuario.id)
        response.set_cookie(key="tienda", value=db_usuario.tienda)
        response.set_cookie(key="serie", value=db_usuario.serie_tienda)
        response.set_cookie(key="usuario", value=db_usuario.usuario)

    else:
        resultado = 'no valido'
        response = JSONResponse({'resultado':resultado})

    return response

#-------------------------------------------------------------------
# LOGOUT 

@app.get("/logout")

def logout():

    response = JSONResponse({'resultado':'ok'})
    response.delete_cookie("session")

    return response
#--------------------------------------------------------------------
# SUBCRIPCION 

@app.get("/subcripcion/")
def subscription():
    print('PUBLICK KEY ',VAPID_PUBLIC_KEY)
    response = JSONResponse({'public_key':VAPID_PUBLIC_KEY})
    return response

# -------------------------------------------------------------------
# Clase modelo dato post 

class Token(BaseModel):
    sw_token:str
    cliente_id:int

#----------------------------------------------------------------------
# SUBCRIPCION POST GRABAR EN BASE DE DATOS USUARIO

@app.post("/subcripcion/")
def subscription(sw_token:Token , db: Session = Depends(get_session)):

    usuario = db.query(Usuario).filter(Usuario.id == sw_token.cliente_id).first()
    usuario.token = sw_token.sw_token
    db.commit()

    print('REQUEST:-->', sw_token.sw_token)
    token = json.loads(usuario.token)
    print('token:-->', token)
    print('cliente_id:-->', sw_token.cliente_id)
    send_web_push(token,'hola que tal')

    response = JSONResponse({'resultado':'ok'})
    return response

#-----------------------------------------------------------------------------

def send_web_push(subscription_information, message_body):

    print('webpush enviado')
    return webpush(
        subscription_info=subscription_information,
        data=message_body,
        vapid_private_key=VAPID_PRIVATE_KEY,
        vapid_claims=VAPID_CLAIMS
    )
#-------------------------------------------------------------------------
# enviar mensaje 
@app.post('/enviar_mensaje')
def enviar_mensaje (request:Request , db: Session = Depends(get_session)):
    # A traves del request sacamos la cookies id usuario sesion
    id_cliente = request.cookies['id']
    
    # id en entero
    id = int(id_cliente)
    usuario = db.query(Usuario).get(id)

    # el token esta grabado en str --> diccionario
    to = json.loads(usuario.token)
    
    send_web_push(to,'hola que tal')

    response = {'resultado': request.cookies,'to':to}
    return response

#-------------
# enviar prueba
@app.get('/admin/enviar_prueba')
def enviar_prueba(request:Request):

    list1 = [1, 2, 3, 4, 5, 6]
    print(random.choice(list1))
    print(request.headers['cookie'])  # forma de saber las cookies
    print('COOKIES:',request.cookies['usuario']) # otra forma de saber las cookies
    text =''
    if request.cookies['usuario'] == 'DIEGO':
        
        texto = f'''<div id="comments"><span>MENSAJE:{request.cookies['usuario']},{random.choice(list1)}</span></div>'''
    else:
        texto = f'<div id="comments"><span>MENSAJE:desconocido</span></div>'

    return Response(texto)

#------------------------------------------
# AÑADIR USUARIO
#------------------------------------------
@app.post('/admin/añadir_usuario')
async def añadir_usuario(usuario:Usuario , db: Session = Depends(get_session)):

    if usuario.perfil == 'ADMINISTRADOR':
        usuario.ruta = '/admin'
    if usuario.perfil == 'TIENDA':
        usuario.ruta = '/tienda'
    if usuario.perfil == 'ALMACEN':
        usuario.ruta = '/almacen'
    if usuario.perfil == 'REPARTIDOR':
        usuario.ruta = '/repartidor'

    db.add(usuario)
    db.commit()
    await manager.broadcast("USUARIO NUEVO")

    return usuario
#------------------------------------------
# EDITAR USUARIO
#------------------------------------------
@app.post('/admin/editar_usuario')
async def añadir_usuario(usuario:Usuario , db: Session = Depends(get_session)):

    #Obtenemos registro unico de la base de datos
    usuario_db = db.query(Usuario).get(usuario.id)

    #Pasamos a diccionario
    usuario_dict = usuario.dict(exclude_unset=True)

    
    # Recorremos cada campo del diccionario
    # y se lo asignamos al registro
    for key , val in usuario_dict.items():
        setattr(usuario_db,key,val)

    await manager.broadcast("USUARIO EDITADO")

    
    db.commit()
    db.refresh(usuario_db)

    return usuario_db
#------------------------------------------
# BORRAR USUARIO
#------------------------------------------

@app.post('/admin/eliminar_usuario')
async def eliminar_usuario(usuario:Usuario , db: Session = Depends(get_session)):

    usuario1 = db.query(Usuario).get(usuario.id)
   
    db.delete(usuario1)
    db.commit()
    
    await manager.broadcast("USUARIO ELIMINADO")
    return 'ok'
#------------------------------------------------------
# Pruebas de consulta. a la base de datos

@app.post('/admin/listar_usuarios2')
async def admin_listar_usuarios(db: Session = Depends(get_session)):
    usuarios = db.query(Usuario).all()
    lista = [
        {
            'usuario': x,
            'tienda':x.tienda,
            'serie':x.serie_tienda,
            'nombre':[
                {
                    'use': d,
                    'nombre':d.nombre
                } for d in x.nombre

            ],
            'base':x.base
            } for x in usuarios
    ]
    print('USUARIOS:-->',usuarios)
  

    return lista
#-------------------------------------------------------
# LISTADO DE USUARIOS
#-------------------------------------------------------
class Dato(BaseModel):
    busqueda:Optional[str] = ''
    page:Optional[int]=1 
    size:Optional[int]=50

@app.post('/admin/listado_usuarios', response_model=Page[Usuario])
def listado_usuarios(dato: Dato, db: Session = Depends(get_session)):
    print('DATOS--->',dato)

    #Paginacion page = 1 , size = 20  ejemplo.
    # https://asesorialaferia.freemyip.com/admin/listado_usuarios?page=2&size=20 
    # query --> ?page=1&size=10 

    #Cogemos busqueda y a cada espacio lo sustituimos por % para la busqueda avanzada
    buscado = dato.busqueda.replace(' ','%')
    # y ponemos % tanto al principio como al final
    buscar = f'%{buscado}%'
    #usuarios = db.query(Usuario).offset(2*5).limit(5).all()

    # Realizamos la busqueda con sqlmodel , con busqueda avanzada
    usuarios = db.query(Usuario).filter(or_(Usuario.usuario.like(buscar),
        Usuario.email.like(buscar),
        Usuario.movil.like(buscar))).all()
    #usuarios = db.query(Usuario).all()

    return paginate(usuarios)
#-------------------------------------------------
# ELIMINAR USUARIOS SELECCIONADOS DE UNS LISTA
class Eliminados(BaseModel):
    lista:List[int]

@app.post('/admin/eliminar_usuarios')
def eliminar_usuarios(eliminados: Eliminados, db: Session = Depends(get_session)):

 
    for id in eliminados.lista:
        usuario = db.query(Usuario).get(id)
        db.delete(usuario)
    db.commit()
    return {'resultado':'ok'}

@app.post('/admin/listar')
def listar(db: Session = Depends(get_session)):

    usuarios = db.query(Usuario).all()
    listado = [
        {
            "usuario":x,
            "notas":x.notas  

        } for x in usuarios
    ]
    
    return listado
#---------------------------------------------
# API 
class Busqueda(BaseModel):
    busqueda:Optional[str] = ''
    fecha_factura:Optional[str] = ''
    serie:Optional[str] = ''


@app.post('/admin/leer_clientes')
def leer_clientes(busqueda:Busqueda):

 
    print('BUSQUEDA:--->',busqueda)

    bus = busqueda.busqueda
    buscar = f'%{bus}%'
    buscado = buscar.replace(' ','%')
   
    auth_token='kbkcmbkcmbkcbc9ic9vixc9vixc9v'
    hed = {'Authorization': 'Bearer ' + auth_token}
    data = {"codigoFabricante":"485","codigoCliente":"48713","baseDatosCliente":"3FS008","password":"RU9YamNkS3Zkb2tD"}

    url = 'https://api.sdelsol.com/login/Autenticar'
    url2 ='https://api.sdelsol.com/admin/LanzarConsulta'
    #response = requests.post(url, json=data, headers=hed)
    response = requests.post(url, json=data)
    response.encoding = "utf-8"
    data = json.loads(response.text)
    #print('datos----',data['resultado'])
    hed = {'Authorization': 'Bearer ' + data['resultado']}
    
    print('BUSQUEDA sql :--->',buscar)

    #SELECT column_name(s)
    #FROM table1
    #INNER JOIN table2 3FS008
    #ON table1.column_name = table2.column_name;
    #buscar_sql = f"SELECT TOP 10 C.CODCLI,C.NIFCLI,C.NOCCLI,D.PCODIR,D.TELDIR FROM F_CLI C LEFT JOIN F_DIR D ON C.CODCLI = D.CLIDIR  WHERE D.NOCCLI LIKE '{buscado}' "
    buscar_sql = f"SELECT TOP 50 CODCLI,NIFCLI,NOCCLI FROM F_CLI WHERE NOCCLI LIKE '{buscado}'  "
    buscar_sql2 = f"SELECT COUNT(NOCCLI)  FROM F_CLI"

    data2 = {"ejercicio": "2023","consulta": buscar_sql}
    data9 = {"ejercicio": "2023","consulta": buscar_sql2}

    respuesta = requests.post(url2, json=data2, headers=hed)
    respuesta.encoding = 'utf-8'
    data3= json.loads(respuesta.text)

    respuesta2 = requests.post(url2, json=data9, headers=hed)
    respuesta2.encoding = 'utf-8'
    data10= json.loads(respuesta2.text)
    #print('CLIENTES DELSON----',data3['resultado'])
    #print('CUANTOS HAY :--->',data10['resultado'])

    return data3['resultado']

#------------------------------
# LISTADO DE FACTURAS

@app.post('/admin/leer_facturas')
def leer_clientes(busqueda:Busqueda):

 
    print('BUSQUEDA:--->',busqueda)

    bus = busqueda.busqueda
    buscar = f'%{bus}%'
    buscado = buscar.replace(' ','%')
    buscar_fecha = f'{busqueda.fecha_factura}%'
    serie = busqueda.serie
   
    auth_token='kbkcmbkcmbkcbc9ic9vixc9vixc9v'
    hed = {'Authorization': 'Bearer ' + auth_token}
    data = {"codigoFabricante":"485","codigoCliente":"48713","baseDatosCliente":"3FS008","password":"RU9YamNkS3Zkb2tD"}

    url = 'https://api.sdelsol.com/login/Autenticar'
    url2 ='https://api.sdelsol.com/admin/LanzarConsulta'
    #response = requests.post(url, json=data, headers=hed)
    response = requests.post(url, json=data)
    response.encoding = "utf-8"
    data = json.loads(response.text)
    #print('datos----',data['resultado'])
    hed = {'Authorization': 'Bearer ' + data['resultado']}
    
    print('BUSQUEDA sql :--->',buscar)

    #SELECT column_name(s)
    #FROM table1
    #INNER JOIN table2 3FS008
    #ON table1.column_name = table2.column_name;
    #buscar_sql = f"SELECT TOP 10 C.CODCLI,C.NIFCLI,C.NOCCLI,D.PCODIR,D.TELDIR FROM F_CLI C LEFT JOIN F_DIR D ON C.CODCLI = D.CLIDIR  WHERE D.NOCCLI LIKE '{buscado}' "
    buscar_sql = f"SELECT TOP 50 CODFAC,REFFAC,FECFAC,ESTFAC,CNOFAC,CDOFAC,CPOFAC,CCPFAC,CPRFAC,CNIFAC,TELFAC,TOTFAC,FOPFAC,PEDFAC,COBFAC,TIPFAC,PROFAC,AGEFAC,ALMFAC FROM F_FAC WHERE CNOFAC LIKE '{buscado}' AND FECFAC LIKE '{buscar_fecha}' AND TIPFAC = {serie} "
    buscar_sql2 = f"SELECT COUNT(NOCCLI)  FROM F_CLI"
    buscar_sql3 = f"SELECT CODAGE, NOMAGE  FROM F_AGE"
    buscar_sql4 = f"SELECT TIPLFA, CODLFA , ARTLFA , DESLFA ,CANLFA ,TOTLFA,DTPLFA,DCOLFA  FROM F_LFA WHERE TIPLFA = 1 AND CODLFA = 158"

    data2 = {"ejercicio": "2023","consulta": buscar_sql}
    data9 = {"ejercicio": "2023","consulta": buscar_sql3}
    dataf = {"ejercicio": "2023","consulta": buscar_sql4}

    respuesta = requests.post(url2, json=data2, headers=hed)
    respuesta.encoding = 'utf-8'
    data3= json.loads(respuesta.text)

    respuesta2 = requests.post(url2, json=data9, headers=hed)
    respuesta2.encoding = 'utf-8'
    data10= json.loads(respuesta2.text)

    respuesta3 = requests.post(url2, json=dataf, headers=hed)
    respuesta3.encoding = 'utf-8'
    datafac= json.loads(respuesta3.text)


    #print('CLIENTES DELSON----',data3['resultado'])
    print('agentes :--->',data10['resultado'])
    print('FECHA FACTURA:--->', busqueda.fecha_factura)
    print('factura:------------>',datafac['resultado'])

    return data3['resultado']
#------------------------------------------------------
# FACTURA POR NUMERO

class Datos(BaseModel):
    numero_factura:Optional[str] = ''
    serie:Optional[str] = ''


@app.post('/admin/factura_id')
def admin_factura_id(datos:Datos, db: Session = Depends(get_session)):
    
    # data cadena de conexion a la base de datos
    data = {"codigoFabricante":"485","codigoCliente":"48713","baseDatosCliente":"3FS008","password":"RU9YamNkS3Zkb2tD"}

    # URL AUTENTICAR Y CONSULTA
    url_autenticar = 'https://api.sdelsol.com/login/Autenticar'
    url_consulta ='https://api.sdelsol.com/admin/LanzarConsulta'

    # OBTENER TOKEN
    response = requests.post(url_autenticar, json=data)
    response.encoding = "utf-8"
    data_token = json.loads(response.text)
    hed = {'Authorization': 'Bearer ' + data_token['resultado']}

    # BUSQUEDA FACTURA DETALLE

    factura = f"SELECT TIPFAC,CODFAC,FECFAC,CNOFAC,CDOFAC,CPOFAC,CCPFAC,CNIFAC,TELFAC,TOTFAC,OBRFAC FROM F_FAC WHERE TIPFAC = {datos.serie} AND CODFAC = {datos.numero_factura}"
    factura_detalle = f"SELECT TIPLFA, CODLFA , ARTLFA , DESLFA ,CANLFA ,PRELFA ,TOTLFA,POSLFA FROM F_LFA WHERE TIPLFA = {datos.serie} AND CODLFA = {datos.numero_factura}"

    consulta_factura = {"ejercicio": "2023","consulta": factura}
    consulta_factura_detalle = {"ejercicio": "2023","consulta": factura_detalle}

    respuesta = requests.post(url_consulta, json=consulta_factura, headers=hed)
    respuesta.encoding = 'utf-8'
    datos_consulta_factura= json.loads(respuesta.text)

    respuesta2 = requests.post(url_consulta, json=consulta_factura_detalle, headers=hed)
    respuesta2.encoding = 'utf-8'
    datos_consulta_factura_detalle= json.loads(respuesta2.text)
    factura = db.query(Factura).filter(Factura.serie == datos.serie,Factura.numero_factura == datos.numero_factura).first()
    print('FACTURA HAY SI O NO _--------------------------->',factura)
    # si existe la factura la crea solo con serie y numero de factura.

    if factura is None:
        fact = Factura()
        fact.serie = datos.serie 
        fact.numero_factura = datos.numero_factura 
        db.add(fact)
        db.commit() 
        factura = db.query(Factura).filter(Factura.serie == datos.serie,Factura.numero_factura == datos.numero_factura).first()
    reparto_detalle = db.query(Factura_detalle).join(Factura).filter(Factura.serie == datos.serie,Factura.numero_factura == datos.numero_factura).all()
    print('REPARTO DETALLE :---->', reparto_detalle)
    lista = []
    for x in reparto_detalle:
        lista.append(x.linea)
    resul  = {
        'factura':datos_consulta_factura,
        'detalle':datos_consulta_factura_detalle,
        'reparto':reparto_detalle,
        'lista':lista,
        'id':factura.id
     
    }
    return resul

#-----------------------------------------------------
# NUEVO REPARTO
class Dato_reparto(BaseModel):
    id:Optional[int] = 0
    numero_factura:Optional[str] = ''
    serie:Optional[str] = ''
    fecha_propuesta:Optional[str] = ''
    contacto:Optional[str] = ''
    movil:Optional[str] = ''
    a_cuenta:Optional[float] = '0.00'
    total:Optional[float] = '0.00'
    observaciones:Optional[str] = ''
    momento:Optional[str] = ''
    direccion_entrega:Optional[str] = ''

@app.post('/admin/nuevo_reparto')
def admin_nuevo_reparto(dato:Dato_reparto , db: Session = Depends(get_session)):

    fac = consultar_factura(dato.serie,dato.numero_factura)
    print('FACTURA :---->',fac)
    cli = consultar(fac['codigo_cliente'])
 
    factura = Factura()
    factura.numero_factura = dato.numero_factura 
    factura.serie = dato.serie 

    factura.nif_contacto = cli['nif']
    factura.direccion = cli['direccion'] 
    factura.poblacion = cli['poblacion'] 
    factura.cp = cli['cp']
    factura.provincia = cli['provincia']
    factura.fecha_propuesta = dato.fecha_propuesta 
    factura.contacto = dato.contacto 
    factura.movil = dato.movil 
    factura.importe_cuenta = dato.a_cuenta 
    factura.total = dato.total
    factura.momento = dato.momento
    factura.direccion_entrega = dato.direccion_entrega

    db.add(factura)
    db.commit()

    return 'ok'
@app.post('/admin/editar_reparto')
def admin_nuevo_reparto(dato:Dato_reparto , db: Session = Depends(get_session)):

    factura = db.query(Factura).get(dato.id)
    factura.numero_factura = dato.numero_factura 
    factura.serie = dato.serie 
    factura.fecha_propuesta = dato.fecha_propuesta 
    factura.contacto = dato.contacto 
    factura.movil = dato.movil 
    factura.importe_cuenta = dato.a_cuenta 
    factura.total = dato.total 
    factura.momento = dato.momento
    factura.importe_cuenta = dato.a_cuenta
    factura.direccion_entrega = dato.direccion_entrega

    db.commit()

    return 'ok'
#-----------------------------------------------------
# LISTAR REPARTOS 
@app.post('/admin/listar_repartos')
def admin_listar_repartos(request: Request,db: Session = Depends(get_session)):
    serie = request.cookies['serie']
    repartos = ''
    if 'filtro_propuesta' in request.cookies:
        fecha = request.cookies['filtro_propuesta']
        repartos = db.query(Factura).filter(Factura.serie == serie,Factura.fecha_propuesta == fecha).all()
    else:
        repartos = db.query(Factura).filter(Factura.serie == serie).all()
    print('filtro propuesta :--------->',fecha)
    
    listado = [
        {
        'id':x.id,
        'numero_factura':x.numero_factura,
        'serie':x.serie,
        'fecha_propuesta':x.fecha_propuesta,
        'fecha_entrega':x.fecha_entrega,
        'contacto':x.contacto,
        'movil':x.movil,
        'total':x.total,
        'a_cuenta':x.importe_cuenta,
        'momento':x.momento,
        'direccion_entrega':x.direccion_entrega,
        'estado':x.estado,
        'ruta':x.ruta,
        'lineas':[
            l.linea for l in x.detalles
        ],
        'detalles': [
            {
                'id':d.id,
                'linea':d.linea,
                'articulo':d.articulo,
                'descripcion':d.descripcion,
                'cantidad':d.cantidad,
                'total':d.total
            } for d in x.detalles
        ],
        'a_cobrar': sum(i.total for i in x.detalles ),
        'observaciones': [
            {
                'id':o.id,
                'descripcion':o.descripcion,
                'usuario':o.usuario.usuario
            } for o in x.observaciones
        ]
        } for x in repartos
    ]

    return listado
#-----------------------------------------------------
# AÑADIR FACTURA DETALLE 

class Dat_detalle(BaseModel):
    linea:Optional[int] = 1
    articulo:Optional[str] = ''
    descripcion:Optional[str] = ''
    cantidad:Optional[int] = 0
    total:Optional[float] = 0.00
    factura_id:Optional[int] = 1 

@app.post('/admin/añadir_factura_detalle')
def admin_añadir_factura_detalle(detalle : Dat_detalle, db: Session = Depends(get_session)):
    print('detalle recibido',detalle)
    factura = db.query(Factura).get(detalle.factura_id)
    print('FACTURA:---->',factura)
    factura_detalle = Factura_detalle()
    factura_detalle.linea = detalle.linea
    factura_detalle.articulo = detalle.articulo
    factura_detalle.descripcion = detalle.descripcion
    factura_detalle.cantidad = detalle.cantidad
    factura_detalle.total = detalle.total
    #localizamos la factura por el id , añadimos el detalle.
    print('DATOS RECIBIDOS DETALLE:-->',factura_detalle)
    factura.detalles.append(factura_detalle)
   
    db.commit() 
    db.refresh(factura)

    return factura.detalles



#------------------------------------------------------
# ELIMINAR REPARTO 
#------------------------------------------------------
@app.post('/admin/eliminar_reparto')
def admin_eliminar_reparto(dato:Dato_reparto, db: Session = Depends(get_session)):

    reparto = db.query(Factura).get(dato.id)
    db.delete(reparto)
    db.commit()


    return 'ok'


#------------------------------------------------------
# LISTADO DE TIENDAS
#-----------------------------------------------------    
@app.post('/admin/listado_tiendas')
def listado_tiendas(db: Session = Depends(get_session)):

    tiendas = db.query(Tienda).all()
    listado = [
        {
            'id':x.id,
            'serie': x.serie,
            'descripcion':x.descripcion
        } for x in tiendas
    ]
    

    return listado
#------------------------------------------
# AÑADIR TIENDA
#------------------------------------------
@app.post('/admin/añadir_tienda')
async def añadir_tienda(tienda:Tienda , db: Session = Depends(get_session)):


    db.add(tienda)
    db.commit()
    await manager.broadcast("TIENDA NUEVA")

    return tienda
#------------------------------------------
# EDITAR TIENDA
#------------------------------------------
@app.post('/admin/editar_tienda')
async def añadir_tienda(tienda:Tienda , db: Session = Depends(get_session)):

    #Obtenemos registro unico de la base de datos
    tienda_db = db.query(Tienda).get(tienda.id)

    #Pasamos a diccionario
    tienda_dict = tienda.dict(exclude_unset=True)
    print('TIENDA EDITAR :-->',tienda_dict)
    
    # Recorremos cada campo del diccionario
    # y se lo asignamos al registro
    for key , val in tienda_dict.items():
        setattr(tienda_db,key,val)

    await manager.broadcast("TIENDA EDITADA")

    
    db.commit()
    db.refresh(tienda_db)

    return tienda_db
#------------------------------------------
# BORRAR USUARIO
#------------------------------------------

@app.post('/admin/eliminar_tienda')
async def eliminar_tienda(tienda:Tienda , db: Session = Depends(get_session)):

    tienda1 = db.query(UTienda).get(tienda.id)
   
    db.delete(tienda1)
    db.commit()
    
    await manager.broadcast("Tienda ELIMINADO")
    return 'ok'
#---------------------------------------------
# FACTURA CLIENTE 
def consulta_cliente2(id_cliente):

    # data cadena de conexion a la base de datos
    data = {"codigoFabricante":"485","codigoCliente":"48713","baseDatosCliente":"3FS008","password":"RU9YamNkS3Zkb2tD"}


    # URL AUTENTICAR Y CONSULTA
    url_autenticar = 'https://api.sdelsol.com/login/Autenticar'
    url_consulta ='https://api.sdelsol.com/admin/LanzarConsulta'

    # OBTENER TOKEN
    response = requests.post(url_autenticar, json=data)
    response.encoding = "utf-8"
    data_token = json.loads(response.text)
    hed = {'Authorization': 'Bearer ' + data_token['resultado']}

    #--> CONSULTA CLIENTE
    cliente = f"SELECT CODCLI,NIFCLI,NOFCLI,NOCCLI,DOMCLI,POBCLI,CPOCLI,PROCLI FROM F_CLI WHERE CODCLI = {id_cliente}"
    consulta_cliente = {"ejercicio": "2023","consulta": cliente}
    respuesta_factusol = requests.post(url_consulta, json=consulta_cliente, headers=hed)
    respuesta_factusol.encoding = 'utf-8'
    datos_consulta_cliente = json.loads(respuesta_factusol.text)
    cliente = datos_consulta_cliente
    print('cliente:---->',cliente)

    return cliente

class Busqueda_factura(BaseModel):
   
    factura_id:Optional[int] = 0

@app.post('/admin/factura_cliente')
async def factura_cliente(dato:Busqueda_factura , db: Session = Depends(get_session)):

    # data cadena de conexion a la base de datos
    data = {"codigoFabricante":"485","codigoCliente":"48713","baseDatosCliente":"3FS008","password":"RU9YamNkS3Zkb2tD"}

    # URL AUTENTICAR Y CONSULTA
    url_autenticar = 'https://api.sdelsol.com/login/Autenticar'
    url_consulta ='https://api.sdelsol.com/admin/LanzarConsulta'

    # OBTENER TOKEN
    response = requests.post(url_autenticar, json=data)
    response.encoding = "utf-8"
    data_token = json.loads(response.text)
    hed = {'Authorization': 'Bearer ' + data_token['resultado']}

    # BUSQUEDA FACTURA DETALLE

    factura = f"SELECT TIPFAC,CODFAC,FECFAC,CLIFAC,CNOFAC,CDOFAC,CPOFAC,CCPFAC,CNIFAC,TELFAC,TOTFAC,OBRFAC FROM F_FAC WHERE TIPFAC = 1 AND CODFAC = {dato.factura_id}"
    factura_detalle = f"SELECT TIPLFA, CODLFA , ARTLFA , DESLFA ,CANLFA ,PRELFA ,TOTLFA,POSLFA FROM F_LFA WHERE TIPLFA = 1 AND CODLFA = {dato.factura_id}"
    
    consulta_factura = {"ejercicio": "2023","consulta": factura}
    consulta_factura_detalle = {"ejercicio": "2023","consulta": factura_detalle}

    respuesta = requests.post(url_consulta, json=consulta_factura, headers=hed)
    respuesta.encoding = 'utf-8'
    datos_consulta_factura= json.loads(respuesta.text)

    respuesta2 = requests.post(url_consulta, json=consulta_factura_detalle, headers=hed)
    respuesta2.encoding = 'utf-8'
    datos_consulta_factura_detalle= json.loads(respuesta2.text)

    id_cliente = datos_consulta_factura['resultado'][0][3]['dato']

    cliente = f"SELECT CODCLI,NIFCLI,NOFCLI,NOCCLI,DOMCLI,POBCLI,CPOCLI,PROCLI FROM F_CLI WHERE CODCLI = {id_cliente}"
    consulta_cliente = {"ejercicio": "2023","consulta": cliente}
    respuesta3 = requests.post(url_consulta, json=consulta_cliente, headers=hed)
    respuesta3.encoding = 'utf-8'
    datos_consulta_cliente = json.loads(respuesta3.text)
    print('RESULTADO:cliente-->',datos_consulta_cliente)
    print('RESULTADO:-->',datos_consulta_factura['resultado'][0][3]['dato'])

    resul  = {
        'factura':datos_consulta_factura,
        'detalle':datos_consulta_factura_detalle,
        'cliente':datos_consulta_cliente

    }




    return {'resultado':resul}

#---------------------------------------------
# FACTURA CLIENTE2 

@app.get('/admin/factura_cliente2/{factura}')
async def factura_cliente2(factura:str ,request:Request, db: Session = Depends(get_session)):
    tienda,factura_id = factura.split('-')
    print('tienda:----->',tienda,'factura_id',factura_id)
    # data cadena de conexion a la base de datos
    data = {"codigoFabricante":"485","codigoCliente":"48713","baseDatosCliente":"3FS008","password":"RU9YamNkS3Zkb2tD"}

    # URL AUTENTICAR Y CONSULTA
    url_autenticar = 'https://api.sdelsol.com/login/Autenticar'
    url_consulta ='https://api.sdelsol.com/admin/LanzarConsulta'

    # OBTENER TOKEN
    response = requests.post(url_autenticar, json=data)
    response.encoding = "utf-8"
    data_token = json.loads(response.text)
    hed = {'Authorization': 'Bearer ' + data_token['resultado']}

    # BUSQUEDA FACTURA DETALLE

    factura = f"SELECT TIPFAC,CODFAC,FECFAC,CLIFAC,CNOFAC,CDOFAC,CPOFAC,CCPFAC,CNIFAC,TELFAC,TOTFAC,OBRFAC FROM F_FAC WHERE TIPFAC = {tienda} AND CODFAC = {factura_id}"
    factura_detalle = f"SELECT TIPLFA, CODLFA , ARTLFA , DESLFA ,CANLFA ,PRELFA ,TOTLFA,POSLFA FROM F_LFA WHERE TIPLFA = {tienda} AND CODLFA = {factura_id}"
    
    consulta_factura = {"ejercicio": "2023","consulta": factura}
    consulta_factura_detalle = {"ejercicio": "2023","consulta": factura_detalle}

    respuesta = requests.post(url_consulta, json=consulta_factura, headers=hed)
    respuesta.encoding = 'utf-8'
    datos_consulta_factura= json.loads(respuesta.text)

    respuesta2 = requests.post(url_consulta, json=consulta_factura_detalle, headers=hed)
    respuesta2.encoding = 'utf-8'
    datos_consulta_factura_detalle= json.loads(respuesta2.text)
    print('DATOS CONSULTA FACTURA :--->',len(datos_consulta_factura_detalle['resultado']))
    if len(datos_consulta_factura_detalle['resultado']) != 0 :
        id_cliente = datos_consulta_factura['resultado'][0][3]['dato']
    
    
        cliente = f"SELECT CODCLI,NIFCLI,NOFCLI,NOCCLI,DOMCLI,POBCLI,CPOCLI,PROCLI FROM F_CLI WHERE CODCLI = {id_cliente}"
        consulta_cliente = {"ejercicio": "2023","consulta": cliente}
        respuesta3 = requests.post(url_consulta, json=consulta_cliente, headers=hed)
        respuesta3.encoding = 'utf-8'
        datos_consulta_cliente = json.loads(respuesta3.text)
        print('RESULTADO:cliente-->',datos_consulta_cliente)
        print('RESULTADO:-->',datos_consulta_factura['resultado'][0][3]['dato'])

        resul  = {
            'factura':datos_consulta_factura,
            'detalle':datos_consulta_factura_detalle,
            'cliente':datos_consulta_cliente

        }


        dato = f'''
        <div  id="resultado"
            class="mt-[10px] grid grid-cols-[100px,100px,100px,100px,auto,500px,100px,100px,200px] 
                gap-[5px]  items-baseline
                hover:bg-yellow-200 cursor-pointer">
            <div class=" mx-[2px] pl-[4px]">{resul['factura']['resultado'][0][1]['dato']}</div>
            <div class=" mx-[2px] pl-[4px]">{resul['factura']['resultado'][0][3]['dato']}</div>
            <div class=" mx-[2px] pl-[4px]">{resul['factura']['resultado'][0][2]['dato'].split('T')[0]}</div>
            <div class=" mx-[2px] pl-[4px]">AGENTE</div>
            <div class=" mx-[2px] pl-[4px]">{resul['cliente']['resultado'][0][2]['dato']}</div>
            <div class=" mx-[2px] pl-[4px]">{resul['cliente']['resultado'][0][4]['dato']}</div>
            <div class=" mx-[2px] pl-[4px]">{resul['cliente']['resultado'][0][1]['dato']}</div>
            <div class=" mx-[2px] pl-[4px] text-center">{resul['factura']['resultado'][0][9]['dato']}</div>
            <div class=" mx-[2px] pl-[4px] text-center">{resul['factura']['resultado'][0][10]['dato']} €</div>
            </div> 
                '''

        detalle_total = ''
        for detalle in resul['detalle']['resultado']:
            det = f'''
                    <div class="mt-[10px] grid grid-cols-[100px,auto,100px,100px,200px] 
                                    gap-[5px]  items-baseline hover:bg-yellow-200 cursor-pointer">

                        <div class="pl-[4px]">{detalle[2]['dato']}</div>
                        <div class="pl-[4px]">{detalle[3]['dato']}</div>
                        <div class="pl-[4px] text-center">{detalle[4]['dato']}</div>
                        <div class="pl-[4px] text-center">{detalle[5]['dato']}</div>
                        <div class="pl-[4px] text-center">{detalle[6]['dato']}</div>
                        </div>
            '''
            detalle_total += det
        dato_detalle = f'''
            <div id="detalle">
        {detalle_total}

            </div>
        '''

        result1 = dato + dato_detalle
        dato2 =f'<div id="resultado"><span>MENSAJE:desconocido</span></div>'
    else:
        result1 = '''
        <div id="resultado" class="mx-3 parpadea bg-[#941405] text-white">
        No hay datos en la consulta 
        </div> 

        '''


    #return {'resultado':resul}
    return Response(result1)
    #return {'resultado':resul}

#------------------------------
# ADMIN LISTADO DE REPARTOS ...
@app.get('/admin/listado_repartos/{serie}/{inicio}/{final}')
async def factura_cliente2(serie:str,inicio:str,final:str,request:Request, db: Session = Depends(get_session)):
    print('serie:-->',serie,'inicio:-->',inicio,'final:-->',final)
    tienda,factura_id = serie.split('-')
    print('tienda:-->',tienda,'factura_id:-->',factura_id)
    facturas = db.query(Factura).filter(Factura.serie == tienda,Factura.fecha_propuesta >= inicio,Factura.fecha_propuesta <= final).all()
    texto = ''
    for index ,factura in enumerate(facturas):

        comentarios = ''
        for comentario in factura.observaciones:
            com1 = f'''
            <div class="mx-3">
            <span class="font-bold text-blue-400">{comentario.usuario.usuario}</span>
                <span class="">
                {comentario.descripcion}
                </span> 
            </div>
            '''
            comentarios += com1


        dat = f'''
            
     
                    <div 
            class=" grid grid-cols-[150px,170px,100px,100px,150px,auto,150px,100px,100px,150px]
                    mx-3  border mt-2 items-center hover:bg-yellow-200 cursor-pointer
                    bg-[#F6FCEE]
            ">
        <div class="text-xs px-2">{factura.fecha_propuesta}</div>
        <div class="text-xs px-2">{factura.fecha_entrega}</div>
        <div class="text-lg px-2">{factura.ruta}</div>
        <div class="px-2">{factura.numero_factura}</div>
        <div class="px-2">{factura.total}</div>
        <div class="px-2 flex justify-between">{factura.contacto}
        <span @click="ver_serie = {factura.serie};ver_numero_factura={factura.numero_factura};tab2 ='ver_factura';console.log('VER TAB2 :-->',tab2)">
        <img style="height:35px;" src="/static/imagenes/pdf.png">
        </span>
        </div>
        <div class="px-2">{factura.movil}</div>
        <div class="px-2">A cuenta</div>
        <div class="px-2">{factura.importe_cobrado}</div>
        <div class="px-2 text-center">{factura.estado}</div>

        </div>
        <div class="border  mx-3 bg-[#F6FCEE]">
         <span class="pl-[5px] text-blue-600"> Direccion de Entrega :</span>
         <span>{factura.direccion_entrega}  </span>
        </div>
        <div class="mx-3">
         <span>Observaciones :
            {comentarios}
        </div>
  
            '''
        texto += dat
    if len(facturas) == 0:
        texto = '''
        <div id="reparto_detalle">
        <div class="mx-[10px] parpadea bg-red-400 text-white">No hay Datos...</div>
        </div>
        
        '''
    
    resul = f'<div id="reparto_detalle">{texto}</div>'

    return Response(resul)
    


#---------------------------------------------------------
# PAGINADOR 
#---------------------------------------------------------
add_pagination(app)
#---------------------------------------------------------
