# PANDAS
#-----------------------------------------------------
Total de filas	df.shape[0]
Filtro simple	df[condición].shape[0]
Filtrar con .query()	df.query("condición").shape[0]
Registros únicos en una columna	df["columna"].nunique()
Agrupar y contar	df.groupby("columna").size()
Valores nulos	df["columna"].isna().sum()
Valores no nulos	df["columna"].notna().sum()

#-----------------------------------------------------
@app.post('/trabajador',tags=["excel"])
def trabajador(db: Session = Depends(get_session)):

    usuarios = db.query(Usuario).all()
    df = pd.DataFrame([row.dict() for row in usuarios])  # ASIGNAR DATOS TABLA USUARIO

    filtro = df[df['rol'] == 'Trabajador'] # TABLA CUYO ROL SEA TRABAJADOR
    # contar = df['rol'].value_counts() # CONTAR Y AGRUPAR POR ROL
    contar = df.groupby("rol").size() # ES LO MISMO
    iban = df[df['iban'].notna()].shape[0] ---> CONTAR 
    result = iban
    return JSONResponse(content=result)

# Contar el número de filas
conteo = filtro.shape[0]  # Número de filas


En pandas, puedes contar el número de resultados después de aplicar un filtro o consulta con varias técnicas dependiendo del caso. Aquí tienes algunos ejemplos:

1. Contar filas después de un filtro
Usa .shape o .len() para obtener el número de filas:

python
Copiar código
import pandas as pd

# Crear un DataFrame de ejemplo
data = {
    "nombre": ["Juan", "María", "Luis", "Ana"],
    "edad": [28, 22, 35, 19],
    "ciudad": ["Madrid", "Barcelona", "Madrid", "Valencia"]
}
df = pd.DataFrame(data)

# Filtrar personas mayores de 25 años
filtro = df[df["edad"] > 25]

# Contar el número de filas
conteo = filtro.shape[0]  # Número de filas
print(f"Total de personas mayores de 25 años: {conteo}")
Salida:


2. Contar valores por grupo
Usa .groupby() y .size() para contar filas agrupadas por una categoría:


# Contar cuántas personas hay por ciudad
conteo_por_ciudad = df.groupby("ciudad").size()

print(conteo_por_ciudad)

# Contar valores nulos en la columna "edad"
conteo_nulos = df["edad"].isna().sum()
print(f"Valores nulos en 'edad': {conteo_nulos}")

# Contar personas mayores de 25 años y de Madrid
conteo = df.query("edad > 25 and ciudad == 'Madrid'").shape[0]
print(f"Total de personas mayores de 25 años en Madrid: {conteo}")

# Contar personas menores de 30 años o de Valencia
conteo = df[(df["edad"] < 30) | (df["ciudad"] == "Valencia")].shape[0]
print(f"Total de personas menores de 30 años o de Valencia: {conteo}")

Resumen
Contar filas después de un filtro: df[df["columna"] == valor].shape[0]
Contar valores únicos: df["columna"].value_counts()
Contar valores nulos: df["columna"].isna().sum()
Contar por grupos: df.groupby("columna").size()

# Filtro: Personas de Madrid
conteo = df.query("ciudad == 'Madrid'").shape[0]
print(f"Registros de Madrid: {conteo}")

# Contar cuántas ciudades únicas hay
conteo_ciudades = df["ciudad"].nunique()
print(f"Ciudades únicas: {conteo_ciudades}")

# Contar registros por ciudad
conteo_por_ciudad = df.groupby("ciudad").size()
print(conteo_por_ciudad)

conteo_nulos = df["edad"].isna().sum()
print(f"Registros con valores nulos en 'edad': {conteo_nulos}")

conteo_no_nulos = df["edad"].notna().sum()
print(f"Registros con valores no nulos en 'edad': {conteo_no_nulos}")




