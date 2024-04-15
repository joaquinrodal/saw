pip install pdfkit
sudo apt-get install wkhtmltopdf


which wkhtmltopdf 
/usr/bin/wkhtmltopdf 

output_text = template render de jinja 2


config = pdfkit.configuration(wkhtmltopdf='/usr/bin/wkhtmltopdf')
output_string = 'documento.pdf'
pdf.from_string(output_text,output_string,configuration=config)

  
