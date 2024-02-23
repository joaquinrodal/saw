
CARGAR CADA 5 SEGUNDO ESTE DIV
<div hx-get="/messages"
    hx-trigger="load delay:5s"
    hx-swap="outerHTML"
>
</div>

<div hx-get="/news" hx-trigger="every 2s"></div>



CON ALPINE JS 

EN UNA PLANTILLA DE TEMPLATE , no funciona htmx porque ???
x-init="console.log('cargado htmx',htmx.version);htmx.process($refs.contenido);htmx.process($refs.contenido2); cargar();"

       <div x-ref="contenido2"
            hx-post="/datos_servidor2" hx-target="#resultado" hx-trigger="click">enviar</div>

     <div  x-ref="contenido"
            id="nuevo-contenido"
            hx-target="this" hx-post="/datos_servidor2" hx-trigger="every 10s"></div>


como crear un evento con alpine 
  <div @men.window="console.log('EVENTO CURIOSO')"></div>
      <div @click="$dispatch('men')">Enviar</div>
