
# Obtenemos un usuario por el id
usuario = Usuario.query.get(5)

# Insertamos una nota
nota = Nota() 
nota.descripcion = 'esto es una maravilla'
nota.usuario = usuario
db.session.add(nota)
db.session.commit()

# Insertamos una nota desde el usuario
nota2 = Nota() 
nota2.descripcion = 'esto es una maravilla de narices' 
usuario.notas.append(nota2)
db.session.commit()

# Un usuario , la primera nota de muchas
usuario.notas[0] 

# Un usuario , la ultima nota de muchas
usuario.notas[-1]

# Para borrar una nota..
nota = Nota.query.get(19)
db.session.delete(nota)
db.session.commit()
# con esto borra la nota de la base de datos.

usuario = Usuario.query.get(5)
nota = Nota.query.get(19)

usuario.notas.remove(nota)
db.session.commit()
# con esto borramos el id del usuario 
# que está en la nota 
# en el modelo de nota hay un id de usuario
# no borramos la nota de la base de datos 
# si no el id de usuario dejando la nota en la base
# de datos sin el id de usuario que lo pone a null.
