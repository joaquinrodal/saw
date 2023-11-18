#---------------------------
# ALMACEN


#--------------------------------------------------------------
# API BASE DATOS 
#--------------------------------------------------------------
from typing import Annotated
from servidor import app , plantilla
from modelos.modelos import * 
from conexion import get_session 
from sqlmodel import select, col, or_ , col
import datetime
 
from fastapi import Request ,Response , WebSocket, WebSocketDisconnect , Cookie ,Header ,Request,Body,Form
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
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.units import cm ,mm
from reportlab.lib.pagesizes import A4

from io import BytesIO
from reportlab.lib.colors import red, magenta,gray
from reportlab.lib  import colors
from reportlab.lib.colors import HexColor


class Dato_almacen_reparto(BaseModel):
   
    factura_id:Optional[int]=1
    fecha_entrega:Optional[str]=''
    ruta:Optional[str]=''
    estado:Optional[str]=''
    
@app.post('/almacen/actualizar_reparto_almacen')
async def actualizar_reparto_almacen(dato:Dato_almacen_reparto, db: Session = Depends(get_session)):

    factura = db.query(Factura).get(dato.factura_id)
    factura.fecha_entrega = dato.fecha_entrega 
    factura.ruta = dato.ruta
    factura.estado = dato.estado
    
    db.commit()

    return 'ok'


#-----------------------------------------------------
# LISTAR REPARTOS
class Dato_almacen_busqueda(BaseModel):
   
    serie:Optional[int]=1
    fecha_inicio:Optional[str]=''
    fecha_final:Optional[str]=''


@app.post('/almacen/busqueda_listar_repartos')
def busqueda_listar_repartos(dato:Dato_almacen_busqueda, db: Session = Depends(get_session)):

    print('serie:-->',dato.serie)
    print('inicio:-->',dato.fecha_inicio)
    print('final:-->',dato.fecha_final)

    comando = ''
    if dato.serie == 0:
        comando = select(Factura).where(Factura.fecha_propuesta >= dato.fecha_inicio , Factura.fecha_propuesta <= dato.fecha_final ).order_by(Factura.fecha_propuesta)
    else:
        comando = select(Factura).where(Factura.fecha_propuesta >= dato.fecha_inicio , Factura.fecha_propuesta <= dato.fecha_final, Factura.serie == dato.serie).order_by(Factura.fecha_propuesta)
    repartos = db.exec(comando).all()
    #records.reverse()
    #repartos = db.query(Factura).filter(
    #    Factura.fecha_propuesta >= dato.fecha_inicio
    #).all()
    #repartos.sort(key = lambda person: person.age)
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
        'observaciones': [
            {
                'id':o.id,
                'descripcion':o.descripcion,
                'usuario':o.usuario.usuario,
                'fecha':o.fecha
            } for o in x.observaciones
        ]
        } for x in repartos
    ]

    return listado


#-----------------------------------------------------
# AGREGAR OBSERVACION

class Dato_observacion(BaseModel):

    factura_id:Optional[int] = 1
    descripcion:Optional[str] = ''

@app.post('/almacen/agregar_comentario')
def agregar_comentario(dato : Dato_observacion,id: Annotated[int | None, Cookie()] = None, db: Session = Depends(get_session)):
  
    factura = db.query(Factura).get(dato.factura_id)
    observacion = Observacion()
    observacion.factura_id = factura.id 
    observacion.descripcion = dato.descripcion 
    observacion.usuario_id = id
    observacion.fecha = datetime.date.today()
    factura.observaciones.append(observacion) 

    db.commit()


    return 'ok'


#---------------------------------------------------------------
# IMPRIMIR EN PDF 
class Dato_imprimir_pdf(BaseModel):
   
    serie:Optional[int]=1
    fecha_inicio:Optional[str]=''
    fecha_final:Optional[str]=''
    ruta:Optional[str]='1'

@app.post('/almacen/imprimir_pdf')
def almacen_imprimir_pdf( dato:Dato_imprimir_pdf , db: Session = Depends(get_session)):

    pdfmetrics.registerFont(TTFont('Fuente', '/home/joaquin/elmejordescanso/static/letras/letra-thin.ttf'))
    print('inicio:-->',dato.fecha_inicio)
    print('final:-->',dato.fecha_final)
    print('serie:-->',dato.serie)
    print('ruta',dato.ruta)
    tiendas = [
          'TODAS LAS TIENDAS',
          'FISIODESCANS Y TRIANA',
          'MAS DE GAMINDE',
          'LUIS DORESTE SILVA',
          'LA PALMA',
          'MASPALOMAS',
          'GALDAR',
          'GALICIA',
          'VECINDARIO Y ALCAMPO',
          'OFICINA'
          ]
    comando = ''
    if dato.serie == 0:
        comando = select(Factura).where(Factura.fecha_propuesta >= dato.fecha_inicio , Factura.fecha_propuesta <= dato.fecha_final , Factura.ruta == dato.ruta).order_by(Factura.fecha_propuesta)
    else:
        comando = select(Factura).where(Factura.fecha_propuesta >= dato.fecha_inicio , Factura.fecha_propuesta <= dato.fecha_final, Factura.serie == dato.serie , Factura.ruta == dato.ruta).order_by(Factura.fecha_propuesta)
        
    repartos = db.exec(comando).all()

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
        'observaciones': [
            {
                'id':o.id,
                'descripcion':o.descripcion,
                'usuario':o.usuario.usuario,
                'fecha':o.fecha
            } for o in x.observaciones
        ]
        } for x in repartos
    ]


    

    output = BytesIO()
    p = canvas.Canvas(output)

    p.setFont('Helvetica-Bold',8)
    p.drawString(190*mm,280*mm,f'Pag: {str(p.getPageNumber())}')   

 
    p.setFont('Helvetica-Bold',10)
    p.drawString(20*mm,280*mm,'LISTADO DE FACTURAS    de Reparto')
    p.setLineWidth(1*mm) 
    p.line(10*mm, 275*mm, 200*mm,275*mm)

    p.setFont('Helvetica-Bold',8)
    menu = f'Tienda : {tiendas[dato.serie]}      FECHA INICIO: {dato.fecha_inicio}          FECHA FINAL: {dato.fecha_final}'
    p.drawString(20*mm,270*mm,menu) 

    fila = 260
    for fac in listado:
        p.setFont('Helvetica-Bold',14)
        p.drawString(20*mm,fila*mm,fac['numero_factura'])
        p.setFont('Helvetica-Bold',14)
        p.drawString(40*mm,fila*mm,fac['contacto'])
        p.setFont('Helvetica-Bold',10)
        p.drawRightString(200*mm,fila*mm,fac['movil'])

        fila -= 5

        p.setFont('Helvetica-Bold',10)
        p.drawString(20*mm,fila*mm,f"{fac['direccion_entrega']}                   Ruta: {fac['ruta']}")
        fila -= 5
        fila -= 5

        for de in fac['detalles']:
            p.setFont('Helvetica-Bold',10)
            p.drawString(20*mm,fila*mm,f"{de['articulo']}   {de['descripcion']}  {de['cantidad']}")
            fila -= 5
        fila -= 5
        for ob in fac['observaciones']:
            p.setFont('Helvetica-Bold',10)
            p.drawString(20*mm,fila*mm,f"{ob['fecha']} {ob['usuario']} {ob['descripcion']}")
            fila -= 5
        fila -= 5
        p.drawString(20*mm,fila*mm,f"- - - - - - - - - - - - - - - -  - - - - - - - - -  - - - - - - - - - - - - - - - * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ")
        fila -= 5
        
        if fila < 80 :
            p.showPage()
            p.setFont('Helvetica-Bold',8)
            p.drawString(190*mm,280*mm,f'Pag: {str(p.getPageNumber())}')   

        
            p.setFont('Helvetica-Bold',10)
            p.drawString(20*mm,280*mm,'LISTADO DE FACTURAS    de Reparto')
            p.setLineWidth(1*mm) 
            p.line(10*mm, 275*mm, 200*mm,275*mm)

            p.setFont('Helvetica-Bold',8)
            p.drawString(20*mm,270*mm,'Tienda : FISIOTERAPIA      FECHA INICIO: 01/06/2023          FECHA FINAL: 30/06/2023') 
            fila = 260
     


    p.showPage()

    p.save()

    pdf_out = output.getvalue()

    
    ruta2 = f'./static/facturas/listado.pdf'

    with open(ruta2, "wb") as f:
        f.write(output.getvalue())



    output.close()

    headers = {'Content-Disposition': 'attachment; filename="out.pdf"'}
    return Response(pdf_out, headers=headers, media_type='application/pdf')

