
Como obtener un usuario en concreto.
db_usuario = db.get(Usuario,usuario.id) 

    como grabar todos los item con los mismos campos...

    data_usuario = usuario.dict(exclude_unset=True)
    for key, value in data_usuario.items():
        setattr(db_usuario, key, value)


    buscado = dato.busqueda.replace(' ','%')
    buscar = f'%{buscado}%'

    print('------------------------db--->',dir(db.query(Usuario)))

    usuarios = db.query(Usuario).filter(or_(Usuario.nombre.like(buscar),
        Usuario.apellido.like(buscar),
        Usuario.movil.like(buscar),
        Usuario.dni.like(buscar),
        Usuario.email.like(buscar))).all()


    db_centro_trabajo = db.get(Centro_trabajo,centro_trabajo.id)
    
    db.delete(db_centro_trabajo)
    db.commit()


@app.get("/nombre/{id}",response_class=HTMLResponse)
async def nombre(id:int,request: Request, db: Session = Depends(get_session)):
    print('id-->',id)
    return plantilla.TemplateResponse("/nombre.html", {"request": request})


class Dat_empleado(BaseModel):
    id:Optional[int] = 1  

@app.post("/admin/empleado_contratos", response_model=Empleado)
async def empleado_contratos(usuario : Dat_empleado , db: Session = Depends(get_session)):
    print('*************************************',usuario)
    usuario = db.query(Usuario).get(usuario.id)

    return usuario

