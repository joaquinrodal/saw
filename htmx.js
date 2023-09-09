
CARGAR CADA 5 SEGUNDO ESTE DIV
<div hx-get="/messages"
    hx-trigger="load delay:5s"
    hx-swap="outerHTML"
>
</div>

<div hx-get="/news" hx-trigger="every 2s"></div>
