ejemplo de comandos de fpdf
usando pandas



from fpdf import FPDF
import pandas as pd

# Crear un DataFrame de ejemplo
data = {'Nombre': ['Juan', 'María', 'Pedro'], 'Edad': [30, 25, 40], 'Ciudad': ['Madrid', 'Barcelona', 'Valencia']}
df = pd.DataFrame(data)

# Crear un documento PDF
pdf = FPDF(format='A4')
pdf.add_page()
pdf.set_font("Arial", size=8)
pdf.set_fill_color(255, 255, 0)  # Color amarillo (RGB)
# Agregar encabezados
pdf.set_xy(100,100)
for col in df.columns:
    pdf.cell(20, 5, col, border=1, align='C', fill=True)
pdf.ln()
fila = 105
pdf.set_xy(100,fila)
# Agregar los datos fila por fila
for _, row in df.iterrows():
    for value in row:
        pdf.cell(20, 5, str(value), border=1, align='C')
    pdf.ln()
    fila +=5
    pdf.set_xy(100,fila)
pdf.set_margins(0, 0, 0)   
pdf.set_xy(0,150)
pdf.set_font("Arial", size=5)
pdf.cell(0,5, txt="Texto en la posición especificada (0,0)", ln=True)
for x in [1,2,3,4,5]:
    pdf.cell(0,3, txt=f"Texto en segunda {x} (0,0)", ln=True)

pdf.image("logo_300x300.png", x=0, y=0, w=10) 
# AGREGAR TEXTO EN VERTICAL
pdf.set_font("Arial", size=7)
pdf.rotate(270,1, 50)
pdf.text(1, 50, "Texto en vertical")
# RESTAURAR
pdf.rotate(0)
#PIE DE PAGINA
pdf.text(1, 296, "JOAQUIN RODAL CHORRO")
pdf.text(208, 296, "O")
# Guardar el PDF
pdf.output("output.pdf")
