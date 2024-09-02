
en fastapi

from fastapi import  BackgroundTasks

tareas en segundo plano

# ENVIAR CORREO EMPLEADO
async def tarea(dato):

  ejecutamos lo que sea
  return 'ok'
  
# envio masivo de correos a los usuarios de una lista de contratos o nominas.
class Dat_importacion(BaseModel):
    id:Optional[int]

@app.post('/enviar_correos_importacion')
async def enviar_correo_importacion(dato:Dat_importacion,background_tasks: BackgroundTasks, db: Session = Depends(get_session)):
  
    background_tasks.add_task(tarea,dato)
    return 'ok'

en fastapi , tenemos tareas en segundo plano
background_tasks: BackgroundTasks-->

  * background_tasks.add_task(tarea,dato) --> añadir una tarea en segundo plano.

