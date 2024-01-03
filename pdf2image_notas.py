
from pdf2image import convert_from_path, convert_from_bytes

    # Grabo una imagen de la primera pagina de un PDF .
    images = convert_from_bytes(open(ruta_pdf_entrada, 'rb').read(),first_page=1,fmt='png',dpi=300)
    #imagenes = convert_from_path(ruta_pdf, output_folder='.', fmt='png')
    #imagenes = convert_from_path(ruta_pdf, first_page=pagina, last_page=pagina, fmt='png', output_folder='.', dpi=300)
    images[0].save(f"./static/usuario/firma/fondo.png", "PNG")

# El tamaño estándar del papel A4 es de 210 x 297 milímetros


        with open(ruta_pdf_salida, 'wb') as archivo_salida:
            pdf = canvas.Canvas(archivo_salida)
            # Imagen de la primera pagina.
            pdf.drawImage('static/usuario/firma/fondo.png',0*mm,0*mm,210*mm,297*mm,preserveAspectRatio=False,mask='auto')
            # Imagen de la firma
            pdf.drawImage(firma,130*mm,70*mm,20*mm,10*mm,preserveAspectRatio=True,mask='auto')

            pdf.showPage()
            pdf.save()

con reportlab --> cargamos la imagen de fondo

       0,0   -> x,y 
      210*mm , 297*mm  , ancho y alto .

