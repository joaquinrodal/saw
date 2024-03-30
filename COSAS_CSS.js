
/* Regla @import para importar estilos CSS de otro fichero */
@import url("index.css");

/* Media query para definir estilos de móvil */
@media screen and (max-width: 640px) {
  .page {
    width: 100%;
  }
}

const firstElement = document.querySelector(".first");
firstElement.style.setProperty("border", "2px solid red");


Método	Descripción
.setProperty(propName, value, priority)	Añade o cambia el valor de una propiedad o variable CSS.
.getPropertyValue(propName)	Obtiene el valor de una propiedad o variable CSS.
.getPropertyPriority(propName)	Devuelve  important si tiene prioridad.
.removeProperty(propName)	Elimina una propiedad o variable CSS de un elemento.


p:not(.main) {
  border: 2px solid black;
  padding: 8px;
  color: white;
  background: indigo;
}



// Pseudoclase	Significado	Más información

Interacción	Pseudoclases relacionadas con acciones de usuario.	Ver más abajo, en esta página.
:hover, :active, :focus, :focus-within, :focus-visible	
Ubicación	Pseudoclases relacionadas con enlaces o ubicaciones.	Ver pseudoclases de ubicación
:any-link, :link, :visited, :target	
Idioma	Pseudoclases relacionadas con idiomas.	Ver pseudoclases de idioma
:lang(), :dir()	
Estructura	Pseudoclases de estructura de documentos HTML	Ver pseudoclases de estructura
:root, :host, :defined, :empty
:first-child, :last-child, :only-child
:first-of-type, :last-of-type, :only-of-type
:nth-child(), :nth-last-child(), :nth-of-type(), :nth-last-of-type()	
Formulario	Pseudoclases de formularios HTML	Ver pseudoclases de formularios
:checked, :indeterminate
:enabled, :disabled, :read-only, :read-write, :placeholder-shown, :default
:required, :optional, :valid, :invalid, :user-valid, :user-invalid
:in-range, :out-of-range	
Estado	Pseudoclases relacionadas con el estado de modales o similares.	Ver pseudoclase de estado
:fullscreen, :modal	
Paginado	Pseudoclases de paginado de documentos HTML	Ver pseudoclases de paginado
:first, :left, :right, :blank
