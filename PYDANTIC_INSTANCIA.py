class Pydantic_usuario(BaseModel):
    

    id: Optional[int] = 0
    nombre:Optional[str] = ''
    apellido:Optional[str] = ''
    email:Optional[str] = ''
    contraseña:Optional[str] = ''
    rol:Optional[str]=''

    dni:Optional[str] = ''
    seguridad_social:Optional[str] = ''
    cuenta_cotizacion:Optional[str] = ''
    direccion:Optional[str] = ''
    cp:Optional[str] = ''
    localidad:Optional[str] = ''
    municipio:Optional[str] = ''
    provincia:Optional[str] = ''
    fijo:Optional[str] = ''
    movil:Optional[str] = ''
    nacimiento:Optional[str] = ''
    imagen:Optional[str] = ''
    firma:Optional[str] = ''
    observaciones:Optional[str] = ''
    perfil:Optional[str] = ''
    tipo_usuario:Optional[str] = ''
    empresa_id: Optional[int] = None
    empresa: Optional[Dat_empresa] ={}
    documentos:List[Dat_documento] = []
    permisos:List[Permiso] = []
    titulaciones:Optional[List[Dict[str,Any]]] = []
    centros:Optional[List[Dict[str,Any]]] = []
    horarios:Optional[List[Horario]] = []
    contratos:Optional[List[Documento_oficial]] = []
    nominas:Optional[List[Documento_oficial]] = []
    otros_documento:Optional[List[Documento_oficial]] = []
    eliminado:Optional[bool]  = False
    class Config:
        orm_mode = True

class Dat_rol(BaseModel):

    id:Optional[int]


@app.post('/admin/usuario_id', response_model=Pydantic_usuario)
def usuario_id(usuario:Dat_rol,db: Session = Depends(get_session)):

    usuario = db.query(Usuario).get(usuario.id)
    user = Pydantic_usuario.from_orm(usuario)
    user.contratos = usuario.contratos
    user.nominas = usuario.nominas
    user.otros_documento = usuario.otros_documento 

como de un modelo de dato podemos pasarlo a pydantic 

usuario = db.query(Usuario).get(usuario.id) 

una vez tenemos el modelo 
queremos pasarlo a pydantic 

 user = Pydantic_usuario.from_orm(usuario) 
con esto le pasamos del modelo a pydantic 

pero no las funciones 
y eso se hace con la siguiente definicion :

    user.contratos = usuario.contratos
    user.nominas = usuario.nominas
    user.otros_documento = usuario.otros_documento  

 con esto lo tenemos en pydantic 

#-------->  IMPORTANTE

AL FINAL DE LA DECLARACION DE LA CLASE DE PYDANTIC 

     class Config:
        orm_mode = True

hay que poner esto al final 
