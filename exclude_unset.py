
exclude_unset=True

En SQLModel, exclude_unset=True es un parámetro que puedes utilizar al llamar al método dict() 
en un modelo para excluir los campos que no han sido establecidos en la instancia del modelo. 
Esto es útil cuando deseas convertir un modelo a un diccionario y deseas omitir los campos 
que tienen el valor predeterminado y no han sido modificados.

    data_centro_trabajo = centro_trabajo.dict(exclude_unset=True)
    for key, value in data_centro_trabajo.items():
        setattr(db_centro_trabajo, key, value)
