
#------------------------------------
# busqueda contiene , muy importante.

comando = select(Factura).where(Factura.fecha_propuesta.contains(dato.fecha_entrega)).order_by(Factura.fecha_propuesta)
repartos = db.exec(comando).all()

statement = select(Hero).where(or_(Hero.age <= 35, Hero.age > 90))

    statement = (
        select(User, Address)  # Seleccionar columnas de User y Address
        .join(Address, Address.user_id == User.id)  # Definir el JOIN

    statement = (
        select(User, Address)
        .join(Address, Address.user_id == User.id)
        .where(or_(User.name == "Alice", Address.city == "New York"))
    )

with Session(engine) as session:
    users = session.exec(select(User)).all()
    for user in users:
        for address in user.addresses:  # Relación directa
            print(f"Usuario: {user.name}, Dirección: {address.street}, Ciudad: {address.city}")


### IMPORTANTE

@app.post("/consulta")
async def consulta(db: Session = Depends(get_session)):

    operaciones = db.query(Operacion).all()   # Cogemos todas los registros .
    re = [
        {** x.dict(),'moviles':x.moviles} for x in operaciones if x.empresa in 'CASA AFRICA'
   
      
    ]
    for r in re:
        r.pop("comercial", None)
        r.pop("tramitadora", None)

    return re
