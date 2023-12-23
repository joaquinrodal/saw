# tareas 
en js

//----------------------------------------
// Clase Tarea
// # significa variable local privada.
// Ejecutar tareas secuencialmente...
//----------------------------------------
class Tarea {
    #items = [] // variable lista privada 
    meter(item){
        this.#items.push(item)

    }
    sacar(item){
        return this.#items.shift()
    }
    es_vacio(){
        return this.#items.length === 0
    }
}
//----------------------------------------------
function esperando_promesa(tiempo, mensaje){
    return ()=>{
        return new Promise ((res,rej)=>{
           setTimeout(()=>{
               res(mensaje)
           },tiempo)
        })
    }

}
//-----------------------------------------------
const tarea = new Tarea()
tarea.meter([esperando_promesa(2000,'p1'),(data)=>console.log(data)])
tarea.meter([esperando_promesa(2000,'p2'),(data)=>console.log(data)])
tarea.meter([esperando_promesa(2000,'hola como estas'),(data)=>console.log(data)])
tarea.meter([esperando_promesa(2000,'ejecutar listado cliente'),(data)=>console.log(data)])
//------------------------------------------------


async function run(){

    while (!tarea.es_vacio()){
      const fn = tarea.sacar()
      const data = await fn[0]()
      fn[1](data)

    }
}
//-------------------------------------------------


Tareas es una clase , que es una lista vacia.
  donde tiene 3 funciones
  1 meter --> es decir inroducir lo que sea : valores , funciones lo que sea
  2 sacar --> cuando se obtiene una funcion se saca de la lista 
  3 es_vacio --> es cuando nos indica si la lista contine algun item o esta vacia devuelve un booleano true o false

 podemos añadir tantas tareas como queramos y sacarla cuando queramos.

si todo esto esta en algun fichero llamado func.js

<script src="/static/js/componentes/func.js"></script> 






y en el script principal   

run() --> para su ejecucion.

  
