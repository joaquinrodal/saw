Ventana Modal con Confirmación Sí o No en NiceGUI

Ventana modal con pregunta en NiceGUI
NiceGUI permite crear diálogos modales usando ui.dialog(). Este elemento sirve, por ejemplo, para mostrar 
ventanas de confirmación y, al ser awaitable, podemos esperar la respuesta del usuario antes de seguir con la ejecución

from nicegui import ui

async def mostrar_confirmacion():
    with ui.dialog() as dialog, ui.card():
        ui.label("¿Desea continuar?")
        with ui.row():
            ui.button("Sí", on_click=lambda: dialog.submit("Sí"))
            ui.button("No", on_click=lambda: dialog.submit("No"))
    resultado = await dialog
    if resultado == "Sí":
        funcion_si()
    else:
        funcion_no()
En este ejemplo, al hacer clic en "Sí" o "No" se ejecuta dialog.submit("Sí") o dialog.submit("No"), 
cerrando el diálogo y retornando el valor elegido. Luego usamos resultado = await dialog para obtener 
esa respuesta. Si resultado es "Sí", llamamos a funcion_si(), y de lo contrario a funcion_no()
smhk.net
smhk.net
. De este modo obtenemos un diálogo modal moderno en NiceGUI que ejecuta diferentes funciones según la respuesta.
> Nota: Opcionalmente se puede usar dialog.props('persistent') al crearlo para que el modal no se cierre al pulsar 
fuera de él, asegurando que el usuario deba elegir explícitamente una opción. Fuentes:
Ejemplos basados en la documentación de NiceGUI
smhk.net
 y en ejemplos de uso de ui.dialog con botones de confirmación
smhk.net
smhk.net
.
