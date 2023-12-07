

query = select(User).options(
    select(User).where(User.id == user_id).options(
        select(User.items).where(Item.id == user_id)
    )
)

Uso de Índices:
Asegúrate de que las columnas utilizadas en las cláusulas where y join estén indexadas. Los índices pueden acelerar significativamente la velocidad de las consultas.

{"lazy": "select"}
{"lazy": "joined"}
{"lazy": "subquery"}
{"lazy": "noload"}


