
import threading
import requests
valor = 0
n_nomina = 0

# valores globales en python para oda la aplicacion.

def update_global_variable(new_value):
    global valor
    valor = new_value

def actualizar_nomina(new_value):
    global n_nomina
    n_nomina = new_value

# FICHERO FASTAPI-->
@app.get("/htmx/ver",response_class=HTMLResponse)
async def ver2(request: Request,db: Session = Depends(get_session)):
    return plantilla.TemplateResponse("/htmx.html", {"request": request,"valor":valor,"n_nomina":n_nomina})

# PLANTILLA ---> htmx.html 

<div  x-init="{{valor}}!=0 ? rango = false:rango=true;
              if({{valor}}== 100){
               codigo = informacion;
              }"
      x-show="{{valor}} != 0 "
       class="flex justify-center items-center w-[200px] bg-gray-100 mx-[20px] relative">
    <div   
           class=" absolute left-0 top-0 text-[25px] bg-[#F6921F] w-[{{valor}}%] text-center z-[300] h-[25px]">
    </div>
   <span class="z-[301]">{{valor}} % - {{n_nomina}}</span> 
</div>

# FRONTED --> ARCHIVO base_admin.html

<div hx-target="this" hx-trigger="every 1s" hx-get="/htmx/ver"></div>

lo curioso de esto es que cada segundo renderiza el html que trae del servidor
con valores de python que cambia segun una funcion que se ejecuta en segundo plano.

la plantilla la sumistra fastapi renderizando la pagina con jinja2 

