IMPORTANTE estos conceptos..

comando = select(Usuario).where(Usuario.id == usuario_id)
user = db.exec(comando).first()
user = db.exec(comando).one_or_none() 
if user == None :
  retornar que no hay usuario

para retornar un model de pydantic

@app.post('/obtener_usuario',response_model = Usuario)
