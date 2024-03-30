

pip install pendulum

import pendulum

# Fecha y hora actual
ahora = pendulum.now()
print("Fecha y hora actual:", ahora)

# Fecha y hora específica
fecha_hora = pendulum.datetime(2022, 3, 22, 12, 30)
print("Fecha y hora específica:", fecha_hora)

# Sumar un día a una fecha
mañana = ahora.add(days=1)
print("Mañana:", mañana)

# Restar un intervalo de tiempo
hace_una_semana = ahora.subtract(weeks=1)
print("Hace una semana:", hace_una_semana)

# Diferencia entre dos fechas
diferencia = ahora.diff(hace_una_semana)
print("Diferencia de tiempo:", diferencia.in_words())


# Fecha y hora en una zona horaria específica
fecha_hora_paris = ahora.in_timezone("Europe/Paris")
print("Fecha y hora en París:", fecha_hora_paris)



# Obtener el año, mes y día
print("Año:", ahora.year)
print("Mes:", ahora.month)
print("Día:", ahora.day)

# Obtener la hora, minuto y segundo
print("Hora:", ahora.hour)
print("Minuto:", ahora.minute)
print("Segundo:", ahora.second)

# Formatear fecha y hora como una cadena
print("Fecha y hora formateadas:", ahora.format("YYYY-MM-DD HH:mm:ss"))

# Formatear fecha y hora en un formato personalizado
print("Fecha y hora formateadas (personalizado):", ahora.format("DD/MM/YYYY HH:mm:ss A"))

# Formatear solo la fecha
print("Fecha formateada:", ahora.to_date_string())

# Formatear solo la hora
print("Hora formateada:", ahora.to_time_string())

# Cambiar la zona horaria de una fecha y hora
fecha_hora_paris = ahora.in_timezone("Europe/Paris")
print("Fecha y hora en París:", fecha_hora_paris)

# Obtener la lista de zonas horarias disponibles
zonas_horarias = pendulum.timezones
print("Zonas horarias disponibles:", zonas_horarias)





# Verificar si una fecha es anterior o posterior a otra
if ahora > fecha_hora:
    print("La fecha y hora actual es posterior a la fecha y hora específica.")
elif ahora < fecha_hora:
    print("La fecha y hora actual es anterior a la fecha y hora específica.")
else:
    print("Las fechas y horas son iguales.")

# Obtener la diferencia en días entre dos fechas
diferencia_dias = ahora.diff(fecha_hora).in_days()
print("Diferencia en días:", diferencia_dias)


# Sumar un período de tiempo a una fecha
proxima_semana = ahora.add(weeks=1)
print("Próxima semana:", proxima_semana)

# Restar un período de tiempo a una fecha
hace_un_dia = ahora.subtract(days=1)
print("Hace un día:", hace_un_dia)

# Calcular la diferencia entre dos fechas en un intervalo específico
diferencia_horas = ahora.diff(fecha_hora).in_hours()
print("Diferencia en horas:", diferencia_horas)

