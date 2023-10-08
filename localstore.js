Quiero que una variable que tengo en alpine, cuando se cargue compruebe si esta en el localstorage
sino está ponga por defecto un valor predeterminado

contador:localStorage.getItem("contador") || 0,

en el html insertamos el siguiente codigo
    <button x-on:click="contador++;
                        localStorage.setItem('contador',contador)">
         contador
    </button>

incrementados en 1 
almacenamos el valor en el localstorage 

cuando cargamos la pagina 
cargara el valor almacenado en el localstorage..
