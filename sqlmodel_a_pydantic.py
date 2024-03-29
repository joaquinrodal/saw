

from sqlmodel import SQLModel, Field
from pydantic import BaseModel

# Modelo SQLModel
class Usuario(SQLModel, table=True):
    id: int = Field(primary_key=True)
    nombre: str
    edad: int

# Modelo Pydantic
class UsuarioPydantic(BaseModel):
    id: int
    nombre: str
    edad: int
  
    class Config:
        orm_mode = True

# Crear una instancia de Usuario
usuario_sqlmodel = Usuario(id=1, nombre="Ejemplo", edad=30)

# Convertir a UsuarioPydantic
usuario_pydantic = UsuarioPydantic.from_orm(usuario_sqlmodel)

print(usuario_pydantic)

esto es muy importante ..

en sqlmodel 
podemos tener funciones , que no estan en la tabla

con from_orm(sqlmodel)

pero hay que poner en el modelo pydantic 

al final 
    class Config:
        orm_mode = True
si no , no funciona.

funciona muy bien cuando quieres pasar
modelos de sqlmodel , con funciones 
a pydantic















