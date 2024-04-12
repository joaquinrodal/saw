

  <style>
    /* Establece las dimensiones del div para que coincida con el formato A4 */
    #element-to-capture {
      width: 794px; /* Ancho para A4 en píxeles (210 mm) */
      height: 1123px; /* Alto para A4 en píxeles (297 mm) */
      background-color: white; /* Opcional: color de fondo blanco */
      padding: 20px; /* Opcional: margen interior */
      box-sizing: border-box; /* Opcional: incluir padding en el tamaño */
    }
  </style>

En este código, el div con el ID element-to-capture tiene un ancho de 794 píxeles 
(que corresponde a los 210 mm del ancho de un formato A4 a 96 píxeles por pulgada) 
y una altura de 1123 píxeles (que corresponde a los 297 mm de altura). Esto asegura 
que el contenido capturado por html2canvas esté en el tamaño A4. Además, 
se ha añadido un margen interior (padding) 
para que el contenido no quede muy pegado a los bordes.

    html2canvas(element).then(canvas => {
      // Obtiene la URL de la imagen en formato base64
      const imgData = canvas.toDataURL('image/png');
      // Crea un elemento de imagen y establece la URL como su fuente
      const img = document.createElement('img');
      img.src = imgData;
      // Agrega la imagen al documento o realiza otras operaciones
      document.body.appendChild(img);
    });
