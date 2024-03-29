

from sqlalchemy import event
from sqlalchemy.orm import Session
from mi_modulo import MiModelo  # Supongamos que tienes un modelo llamado MiModelo

@event.listens_for(MiModelo, 'after_insert')
def after_insert_listener(mapper, connection, target):
    # Esta función se ejecutará después de que se inserte una instancia de MiModelo en la base de datos
    print("Se ha insertado una instancia de MiModelo en la base de datos")

# Ejemplo de uso
mi_instancia = MiModelo(atributo1='valor1', atributo2='valor2')
session.add(mi_instancia)
session.commit()


# Aquí tienes algunos otros eventos comunes para los que puedes registrar listeners en SQLAlchemy:

before_insert: Se ejecuta antes de que se inserte una instancia de modelo en la base de datos.

after_update: Se ejecuta después de que se actualiza una instancia de modelo en la base de datos.

before_delete: Se ejecuta antes de que se elimine una instancia de modelo de la base de datos.

after_flush: Se ejecuta después de que se hayan enviado todas las operaciones pendientes 
             de la sesión al motor de base de datos, pero antes de que se realice el commit.

after_commit: Se ejecuta después de que se ha confirmado una transacción y 
               se han aplicado los cambios en la base de datos.

after_rollback: Se ejecuta después de que se ha revertido una transacción.

Estos son solo algunos ejemplos de los muchos eventos que puedes escuchar en SQLAlchemy. 
Puedes registrar listeners para estos eventos utilizando el decorador @event.listens_for 
como se mostró en el ejemplo anterior, especificando el evento al que deseas escuchar y 
la función que se ejecutará cuando ocurra ese evento.
