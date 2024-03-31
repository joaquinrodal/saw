
# en sqlmodel como podemos agrupar 

 contratos = db.query(Contrato).outerjoin(Usuario)
                               .outerjoin(Tipo_contrato,Contrato.tipo_contrato_id == Tipo_contrato.id)
                               .outerjoin(Categoria_profesional,Contrato.categoria_profesional_id == Categoria_profesional.id)
                               .having(Contrato.empresa_id == session['empresa_id'])
                               .group_by(Contrato.empleado_id.desc())
                               .all()

con query seleccionamos lo que queremoa traer 
con outerjoin enlazamos las tablas
con having hacemos filtros
con group_by  --> agrupamos

pero en la agrupaciones cogemos el primer registro y
quiero en este caso el ultimo registro de la agrupacion 

.group_by(Contrato.empleado_id.desc()) 
por eso ponemos desc() seguido del campo a agrupar

Contrato.empleado_id

# en las agrupaciones

  duplicados = db.query(Contrato.empleado_id,
                        func.row_number().over(partition_by=Contrato.empleado_id, order_by=Contrato.id.desc()).label("row_num")
                        ,func.count(Contrato.empleado_id).label("total"))  ----> cuenta y con func.sum ----> suma en los agrupados 
                        .having(func.count(Contrato.empleado_id) > 1)
                        .group_by(Contrato.empleado_id).all()
