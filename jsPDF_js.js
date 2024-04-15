
        <!--
          
           file_prueba = pdf.output('dataurlnewwindow', {filename: 'comprobante.pdf'});

        -->
          
        <div @click="
          
         const pdf = new jsPDF();     ---> variable para un pdf 
         var imgData = null;
      
          html2canvas($refs.nota).then(canvas => {            desde $refs.nota , tenemos del div con un 
                                                              <div  
                                                                   x-ref="nota"
                                                                   style="padding-left:100px;padding-top:70px;"
                                                                   class=" w-[794px]    ----> ancho en pixel en A4
                                                                           h-[1123px]   ----> alto en pixel en A4
                                                                           absolute     absolute
                                                                           left-[-5000px]   ---> ocultamos el div
                                                                            top-[-1000px]"> ----> ocultamos el div 

                      con el html2canvas()  cogemos el div y lo hacemos una imagen ...
          
          imgData = canvas.toDataURL('image/png');      url de la imagen
          imagen_url = canvas.toDataURL('image/png')
         
          
          pdf.addImage(imgData, 'PNG', 0, 0);    añadimos la imagen al pdf , el 0,0  superior izquierda
          
          pdf.save('archivo.pdf');    --descargar archivo pdf 
                                                  
          var pdfBlob = pdf.output('blob');       --> pasamos a blob el pdf 
                                                  
          file_prueba = new File([pdfBlob], 'documento.pdf', {type: 'application/pdf'}); generamos un fichero con nombre y tipo de fichero.
            
          urlArchivo = URL.createObjectURL(file_prueba)  ---> creamos una url dentro del cliente 
         
          
        });

         

        

         const file4 = pdf.output({filename: 'comprobante.pdf'});
         
          console.log('PDF ON LINE',file_prueba);
          
          console.log('url---------------------------_____>',urlArchivo);
        "
              > PDF </div>

          
      < a :href="urlArchivo">enlace</a>



doc.output('save', 'filename.pdf'); //Try to save PDF as a file (not works on ie before 10, and some mobile devices)
doc.output('datauristring');        //returns the data uri string
doc.output('datauri');              //opens the data uri in current window
doc.output('dataurlnewwindow');     //opens the data uri in new window
window.open(doc.output('bloburl'))
var string = doc.output('datauristring');

pdf.addHTML($('#content'), y, x, options, function () {
    var blob = pdf.output("blob");
    window.open(URL.createObjectURL(blob));
});

var string = doc.output('datauristring');

var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"

var x = window.open();
x.document.open();
x.document.write(iframe);
x.document.close();

window.open(url,"_blank","top=100,left=200,width=1000,height=500")

doc.output('arraybuffer');
doc.output('blob');
doc.output('bloburi');
doc.output('bloburl');
doc.output('datauristring');
doc.output('dataurlstring');
doc.output('datauri');
doc.output('dataurl');
doc.output('dataurlnewwindow');
doc.output('pdfobjectnewwindow');
doc.output('pdfjsnewwindow');

var doc = new jsPDF({
 orientation: ‘lanscape’, unit: ‘in’, format: [4,2]
})
Pero antes de eso, aclarar atributos de las funciones presentadas en los siguientes casos:

var doc = new jsPDF(«p», «pt», «letter»)
en donde el primer atributo en este caso «p» representa la orientación de la página o documento,
  «p» – Protrait (Vertical) o «l» – Landscape (Horizontal), 
  en el siguiente atributo se define las unidades, «pt» – 
  Punto que equivale 1/72 pulgadas ó aporx. 0.35 mm, en este atributo puede la unidad que se desee trabajar
    , ejemplos in (pulgadas), cm (centímetros), mm (milímetro), etc. y 
    como ultimo atributo se presenta el formato de la hoja en este caso letter (carta) 
      puede un defino alguno de los formatos estándar o personalizar  
        en el caso de personalizar requerirá de la siguiente manera:

doc .text( 10, 10, ‘ ¡Hola mundo! ‘  );

doc.addImage(imgData, ‘JPEG’, 15, 40, 180, 160)

doc.fromHTML(¨HTML que se desea obtener de su pagina¨) 

   
