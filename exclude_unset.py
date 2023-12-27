
exclude_unset=True

En SQLModel, exclude_unset=True es un parámetro que puedes utilizar al llamar al método dict() 
en un modelo para excluir los campos que no han sido establecidos en la instancia del modelo. 
Esto es útil cuando deseas convertir un modelo a un diccionario y deseas omitir los campos 
que tienen el valor predeterminado y no han sido modificados.
