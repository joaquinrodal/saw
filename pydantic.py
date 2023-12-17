
class Usuario (BaseModel):
  id ; Optional[int] = None 
  nombre : str = Field(default='Nuevo Producto',min_length=2 , max_length = 10)
  precio : float = Field(default = 0 ,ge=0 , le=1000)
  stock : int = Field(default = 0 , gt = 0 )
