
//

   Como crear un componente web

// 
class Tarjeta extends HTMLElement {
    constructor(){
        super();
    }
    connectedCallback() {

        this.classList.add("text-[30px]","text-red-400" ,"border","rounded-[5px]" ,"p-[5px]");
      }

}
customElements.define('e-tarjeta', Tarjeta);

//------------------------------------------------------------------
class Tarjeta extends HTMLElement {
    constructor(){
        super();

    }
    connectedCallback() {

        this.classList.add("border","rounded-[5px]" ,"p-[5px]");
        this.setAttribute("style", "color: blue; font-size: 20px;");
      }


}

customElements.define('e-tarjeta', Tarjeta);

//------------------------------------------------------------------

Forma de como añadir una clase y un style a un componente...
  
this.classList.add("border","rounded-[5px]" ,"p-[5px]");
this.setAttribute("style", "color: blue; font-size: 20px;");



