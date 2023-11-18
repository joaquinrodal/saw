import fitz  # PyMuPDF

def extraer_y_guardar_primer_pagina_pdf(pdf_path, imagen_path):
    # Abrir el archivo PDF
    pdf_documento = fitz.open(pdf_path)

    # Obtener la primera página del PDF
    primera_pagina = pdf_documento.load_page(0)

    # Obtener el tamaño de la página
    ancho, alto = primera_pagina.rect.width, primera_pagina.rect.height

    # Crear un objeto Pixmap para renderizar la página como una imagen
    pix = primera_pagina.get_pixmap()

    # Guardar la imagen como PNG
    pix.save(imagen_path)

    # Cerrar el documento PDF
    pdf_documento.close()

# Ruta del archivo PDF
ruta_pdf = "./factura_leisier.pdf"

# Ruta donde se guardará la imagen PNG
ruta_imagen_png = "primera_pagina.png"

# Llamar a la función para extraer y guardar la primera página del PDF como PNG
extraer_y_guardar_primer_pagina_pdf(ruta_pdf, ruta_imagen_png)
