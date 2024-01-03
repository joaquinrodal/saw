#-----------------------------
Como generar un modelo con propiedades definidas en el modelo de sqlmodel
es decir 

sqlmodel --> con @property 
                 def mas(self)

 usuario = db.query(Usuario).get(usuario.id) 
# con esto obtenemos usuario.
user = Pydantic_usuario.from_orm(usuario) 

con user lo pasamos a pydantic

    user.contratos = usuario.contratos
    user.nominas = usuario.nominas
    user.otros_documento = usuario.otros_documento 

en pydantic lo igualamos con la funcion del modelo.contratos

funciona bien...

y el user lo devolvemos al modelo de salida de pydantic ...

contratos:Optional[List[Documento_oficial]] = []

--> Optional[]
    dentro [] --> List[]--> 
     [Documento_oficial] = []

     si no hay nada sera []
    pero si no lo igualamos 
    sino no hay nada saldra NULL
    en el pydantic 

