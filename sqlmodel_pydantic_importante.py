# IMPORTANTE concepto a tener en cuenta

Un modelo de tabla con class y sqlmodel.

class Contrato(SQLModel, table=True):
  
    estado:Optional[str] = Field(sa_column = Column("estado",Text(600)),default='BORRADOR')
    estado2:Optional[EstadoPedido] = Field(sa_column = Column("estado2",Text(600)))
  
    @property
    def estado2(self):
        inicio2 = datetime.strptime(self.inicio,'%Y-%m-%d')

        if self.estado == 'BORRADOR':
            return EstadoPedido.BORRADOR
            
        if self.estado == 'BAJA':
            return EstadoPedido.BAJA

        if self.final != 'NULL':
            final2 = datetime.strptime(self.final,'%Y-%m-%d')
            if final2 <= datetime.today():
                return EstadoPedido.BAJA
            else:

                if inicio2 <= datetime.today():

                    return EstadoPedido.VIGOR
                else:
                    return EstadoPedido.TRAMITADO

        if self.estado == 'TRAMITADO':
            return EstadoPedido.TRAMITADO


class Contrato_model(BaseModel):

    id:Optional[int] = 1
    nombre:Optional[str]=''
    inicio:Optional[str]=''
    final:Optional[str]=''
    modificado: bool
    estado:Optional[str] = ''
    estado2:Optional[str] = ''
    alta:Optional[bool]= False
    tipo_baja:Optional[str]=''
    motivo:Optional[str]=''
    horarios:Optional[List[Dict[str,Any]]]
    causa:Optional[str]=''
    observacion:Optional[str]=''
    cliente:Optional[str]=''
    empleado_id:Optional[int]=0
    empleado:Optional[Usuario_con] ={}
    tipo_contrato_id:Optional[int]=0

    tipo_contrato:Optional[Tipo_contrato] ={}
    categoria_profesional_id:Optional[int]=0
    categoria_profesional:Optional[Categoria_profesional] ={}
    empresa_id:Optional[int]=0
    empresa:Optional[Categoria_profesional] ={}
  
    class Config:
        orm_mode = True

@app.post("/admin/contrato_id", response_model=Contrato_model)
def contrato_id(dato:Dat_contrato_id, db: Session = Depends(get_session)):

    contrato = db.query(Contrato).get(dato.id)

    job = Contrato_model.from_orm(contrato)
    
    return job

# La cuestion es que las propiedades del modelo como pasarlo a pydantic
  y no solo los campos sino tambien la propiedades que uno crea en el modelo


de la base de datos cogemos el contrato 
contrato = db.query(Contrato).get(dato.id)

y luego pasamos el modelo a pydantic

job = Contrato_model.from_orm(contrato) 

teniendo en cuenta lo siguiente ---->

estado2:Optional[str] = ''



