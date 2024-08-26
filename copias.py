#COPIAS DE ENTORNO VIRTUAL
---------------------------------------------
zip -r copia_carpeta.zip saturno 
saturno es una carpeta donde esta el entorno virtual de miniconda
miniconda3/envs/ ---> donde esta alojado saturno
se crea una copia --> y se puede restaurar en otro sitio
unzip copia_carpeta.zip
-------------------------------------------------
# COPIA DE ENWORK 

TODA LA APLICACION WEB A MEDIDA

zip -r copia_carpeta_enwork.zip enwork

enwork carpeta donde esta toda la aplicacion entera

restaurar --> 
unzip copia_carpeta_enwork.zip

---------------------------------------------------
# COPIA DE BASE DE DATOS EN MARIADB

mysqldump --user="{username}" --password="{password}" {database} > {dia}-{mes}-{año}-{hora}-{minuto}-copia_awp_db.sql
mysqldump -u joaquin -padriana03 enwork > 26_08_2024-copia_enwork.sql


-----------------------------------------------------
