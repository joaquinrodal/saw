
class Dat_detalle(BaseModel):

    id: Optional[int] = 0
    fecha:Optional[date] = ''
    numero:Optional[int] = 0
    forma_pago:Optional[str] = ''
    vendedor:Optional[str] = ''
    numero:Optional[int] = 0

    socio_id: Optional[int] = 0
 
  
    detalles: Optional[List["Recibo_detalle"]] = []

    class Config:
        orm_mode = True


class Dat_socio_id(BaseModel):

    NumSocio:Optional[int]=0
    Nombre:Optional[str] = ''
    Apellidos:Optional[str]=''
    Dni:Optional[str]=''
    Email:Optional[str] = ''
    Mov:Optional[str] = ''
    FechaNac:Optional[date] = ''

    Fichero:Optional[Any] = ''
    NumTarjeta:Optional[Any] = ''
    Domicilio:Optional[str] = ''
    Localidad:Optional[str] = ''
    CP:Optional[str]=''
    observaciones:Optional[List[Dict[str,Any]]] = []
    recibos:Optional[List[Dat_detalle]] = []
    documentos:Optional[List[Documento]] = []
    cuotas:Optional[List[Recibo_detalle]] = []
    productos:Optional[List[Recibo_detalle]] = []

class Dat_socio(BaseModel):
    id:Optional[int] = 0

@app.post("/socio_id",response_model=Dat_socio_id, tags=["socios"])
def socio_id(dato:Dat_socio , db: Session = Depends(get_session)):
 
    socio = db.query(Socios).filter(Socios.NumSocio == dato.id).first()
    re = dict(socio)
    re['cuotas'] = socio.cuotas
    re['productos'] = socio.productos
    hoy = date.today()


    return re


Importante esto ...



