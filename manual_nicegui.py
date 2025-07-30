

Qué hace on_click=partial(show_edit_user_dialog, row)

Propósito: Asigna al botón "Editar" una función que, al hacer clic, ejecutará show_edit_user_dialog(row), 
pasando el diccionario row correspondiente a la fila de la tabla donde se encuentra el botón.

Por qué usar partial: Sin partial, asignar directamente on_click=show_edit_user_dialog(row)
ejecutaría la función inmediatamente al renderizar la página, en lugar de esperar al clic.

partial crea una función que "envuelve" show_edit_user_dialog con row predefinido, y solo se ejecuta cuando se hace clic en el botón.

Resultado: Cuando el usuario hace clic en el botón "Editar" de una fila, se abre un diálogo con los datos del usuario correspondiente a 
esa fila (por ejemplo, row = {'id': 1, 'username': 'admin', 'email': 'admin@example.com'}).
