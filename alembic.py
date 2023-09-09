#----------------------------------------
# ALEMBIC 
 
pip install alembic  
 
alembic init -t async migration
# Crear carpeta de migracion 
alembic init migracion
alembic revision --autogenerate -m "init"
alembic upgrade heads 

https://testdriven.io/blog/fastapi-sqlmodel/  
pagina donde explica como configurar alembic con sql model 

#.................................................................
# FICHEROS A MODIFICAR PARA QUE FUNCIONE ALEMBIC CON SQLMODEL
-- alembic.ini. archivo hay que añadir dicha instruccion ... 

sqlalchemy.url = mysql+pymysql://joaquin:adriana03@localhost/asesoria

-- script.py.mako --> archivo hay que añadir 

import sqlmodel    

-- env.py  archivo hay que añadir ....

from sqlmodel import SQLModel
from modelos.modelos import *
target_metadata = SQLModel.metadata

con esto configuramos alembic para que se acople a sqlmodel..
