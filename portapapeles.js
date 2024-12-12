


@click="
               navigator.clipboard.writeText(operacion.moviles.map(item => item.linea).join('\n'))
               
               "

map:
Extrae una propiedad específica de cada objeto en el array (en este caso, nombre).

join("\n"):
Une los elementos del array en una cadena, separándolos por saltos de línea (\n).

navigator.clipboard.writeText:
Es la API moderna para escribir texto directamente en el portapapeles.
