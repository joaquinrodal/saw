# Descargar fichero con fastapi
@app.get("/file/{name_file}")
def get_file(name_file: str):
    return FileResponse(path=getcwd() + "/" + name_file)

# Descargar fichero con fastapi
@app.get("/imagenes/{name_file}")
def get_file(name_file: str):
    return FileResponse(path=getcwd() + "/static/imagenes/" + name_file)

#-- SEPARAR HOJAS DE UN PDF Y CADA HOJA GRABAR EN UN PDF SOLO...
@app.post('/paginas')
async def paginas(db: Session = Depends(get_session)):

    reader = PdfReader("/home/joaquin/rrhhenformate/static/JOAQUINRODALCHORRO.pdf")
    writer = PdfWriter()


    number_of_pages = len(reader.pages)
    page = reader.pages[0]
    text = page.extract_text()
    keyword = 'INFORMATICO.JOAQUIN'

    found_pages = []
    for page_num in range(number_of_pages):
        page = reader.pages[page_num]
        text = page.extract_text()
        if keyword in text:
            found_pages.append(page_num + 1)
            writer.add_page(reader.pages[page_num])
            pagina_1 = f'/home/joaquin/rrhhenformate/static/{page_num + 1}.pdf'
            with open(pagina_1, 'wb') as outfile:
                writer.write(outfile)

    dato = {
        'numero_paginas':number_of_pages,
        'paginas': found_pages,
        'paginas_encontradas':found_pages
    }
    return dato



#-----------------------------------------------------------------
# ARRANCANDO LA APLICACION 

@app.on_event("startup")
def on_startup():
    print('ARRANCADO APLICACION')

#--------------------------------------------------------------
# al PARAR la aplicacion
@app.on_event('shutdown')
async def shutdown_event():
    print('PARAR DE LA APLICACION')
