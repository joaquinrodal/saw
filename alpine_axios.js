
#-----------------------------------
# Descubrimiento 

--> en el js 
Crear una funcion , con alpine.js

        ruta: async (ruta,datos)=>{
           
            resp = await axios({
                method: 'post',
                url: ruta,
                data: datos
              })
              console.log('datos del servidor',resp.data)
           
              return await resp.data
        },
Creamos una funcion llamada ruta, con valores de entrada 
ruta y datos 

tenemos a axios post y datos
y la funcion devuelve y espera a que devuelva el servidor 
eso es todo .  

en la pagina html .

  <div 
       @click="ruta('/admin/obtener_dato',mensaje).then( valor => caja = valor)"
       
       >DATOS A ENVIAR
  </div>
  <div x-html="caja"></div>

    
     
    
    </div>

al hacer click -->
practicamente en una linea hacemos una consulta a la API de fastapi
y devuelve un valor que se lo adignamos a una variable de alpine.js 

y con 

la directiva x-html = "caja"
renderizamos , lo que nos devuelve la API asignada a la variable

y funciona

en la API :--->

#------------------------------------------
class Item(BaseModel):
    nombre: Any
    edad: Any
    letras : List

@app.post('/admin/obtener_dato')
async def obtener_dato(item:Item,request: Request,id: Annotated[int | None, Cookie()] = None, db: Session = Depends(get_session)):
    print('item:--->', item.letras[1])

    html = plantilla.TemplateResponse("/paginas/pruebas/prueba.html", {"request": request,"item":item})

    return html
#-------------------------------------------
tenemos los datos declarados ,
el request ,
el id del usuario , obtenido por coockie , y la conexion a la base de datos

el html , cogemos la plantilla donde la tenemos almacenada 
le pasamos los valores y rederizamos la pagina, y la devolvemos al cliente.

y todo separado por ficheros.



