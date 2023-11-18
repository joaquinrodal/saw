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
    
    
    
    
pdfmetrics.registerFont(TTFont('Fuente', '/home/joaquin/tresbaez/static/letras/letra-thin.ttf'))

output = BytesIO()
p = canvas.Canvas(output)
    #p.setFillColor(colors.gray)

p.drawImage('./primera_pagina.png',30,10,555,820,preserveAspectRatio=False,mask='auto')
    #p.drawImage('static/imagenes/cobrado.png',250,230,350,210,preserveAspectRatio=False,mask='auto')
    
    #ruta_firma = f'static/firmas/{factura.firma}'
    #p.drawImage(ruta_firma,80,270,250,80,preserveAspectRatio=False,mask='auto')

    #p.setStrokeGray(.85)
    #p.line(16*mm, 227*mm,198*mm, 227*mm)
    #p.line(16*mm, 234*mm,198*mm, 234*mm)
    
   
    # Numero de pagina actual  -->getPageNumber()
    # Numero de todas las paginas del documento --> getNumPages()
    #p.setFont('Helvetica',8)
    #p.drawString(520,810, "Pagina : "+ str(p.getPageNumber()) )


    #p.setFont('Helvetica-Bold',10)
    #p.drawString(100*mm,226*mm,'FACTURA')

    #p.setFont('Helvetica-Bold',8)
    #p.drawString(130*mm,226*mm,f'{factura.serie}-{factura.numero_factura}') 
    # FECHA --> DE LA FACTURA
    #t1_fecha = factura.fecha_propuesta.split('T')
    #t2_fecha = t1_fecha[0].split('-')
    #año = t2_fecha[0]
    #mes = t2_fecha[1]
    #dia = t2_fecha[2]

    #fecha_factura = f'{dia}-{mes}-{año}'
    #p.setFont('Helvetica-Bold',8)
    #p.drawString(172*mm,226*mm,f'{fecha_factura}') 

    # NIF DEL CLIENTE
p.setFont('Helvetica',10)
p.drawString(20*mm,212*mm,'JOAQUIN RODAL CHORRO') 

    # AGENTE
    #p.setFont('Helvetica-Bold',10)
    #p.drawString(60*mm,211*mm,f'{factura.agente}') 

    # FORMA COBRO
    #p.setFont('Helvetica-Bold',10)
    #p.drawCentredString(150*mm,211*mm,f'{factura.forma_cobro}') 

    # NOMBRE CLIENTE
    #p.setFont('Helvetica-Bold',10)
    #p.drawString(20*mm,245*mm,f'{factura.contacto}') 

    # DOMINILIO
    #p.setFont('Helvetica-Bold',8)
    #p.drawString(20*mm,240*mm,f'{factura.direccion_entrega}') 
    # CP
    #p.setFont('Helvetica-Bold',8)
    #p.drawString(20*mm,237*mm,f'{factura.cp}') 

    # POBLACION
    #p.setFont('Helvetica-Bold',10)
    #p.drawString(20*mm,232*mm,f'{factura.poblacion}') 
    # PROVINCIA
    #p.setFont('Helvetica-Bold',10)
    #p.drawString(20*mm,228*mm,f'{factura.provincia}') 

    # TOTAL
    #p.setFont('Helvetica-Bold',10)
    #total_factura = f'{str(factura.a_cobrar).replace(".",",")} €'
    #p.drawString(186*mm,76*mm,total_factura) 

    # OBSERVACIONES
    #if factura.forma_cobro == 'OBSERVACIONES':
        #p.setFont('Helvetica-Bold',10)
        #p.drawString(65*mm,45*mm,f'Observaciones:') 
        # OBSERVACIONES detalle
        #p.setFont('Helvetica-Bold',10)
        #p.drawString(65*mm,40*mm,f'{factura.observaciones[-1].descripcion}') 

    #p.setFont('Helvetica-Bold',8)
    #p.drawString(156*mm,226*mm,str(p.getPageNumber()))  
    #  
    #Numero Factura 
    #numero_fac = f'{factura.serie}-{factura.numero_factura}'
    #p.setFont('Helvetica-Bold',10)
    #p.drawString(40*mm,237*mm,numero_fac)
    #fila = 192
    #for detalle in factura.detalles:
       
        #p.setFont('Helvetica',8)
        #p.drawString(20*mm,fila*mm,detalle.articulo)
        #p.setFont('Helvetica',8)
        #p.drawString(45*mm,fila*mm,detalle.descripcion)
        #p.setFont('Helvetica',8)
        #p.drawString(110*mm,fila*mm,str(detalle.cantidad))
        #p.setFont('Helvetica',8)
        #precio = f'{str(detalle.total).replace(".",",")} €'
        #p.drawRightString(200*mm,fila*mm,precio)
        #fila -= 5      

    #p.setFont('Helvetica-Bold',10)
    #p.drawString(75*mm,237*mm,'FECHA :')

    # color borde figuras R G B
    #p.setStrokeColorRGB(0, 0, 0)

    




    #p.showPage()
    #p.drawImage('static/imagenes/2.png',30,10,555,820,preserveAspectRatio=False,mask='auto')
    #p.showPage()

p.save()

pdf_out = output.getvalue()

ruta = f'prueba2.pdf'
ruta2 = f'./static/facturas/factura.pdf'

with open(ruta, "wb") as f:
    f.write(output.getvalue())



output.close()
