// custon elements

class BotonRecto extends HTMLElement {

    static get observedAttributes (){
      return ['nombre']
    }

    attributeChangedCallback(name,oldValue,newValue){
        const nombre = this.getAttribute('nombre')
        this.innerHTML = /*html*/`
        <div class="border rounded-[5px] bg-[#f6921f] text-white px-[10px] py-[5px] " >${nombre}</div>
        
        `
    }

    connectedCallback() {
        const nombre = this.getAttribute('nombre')
        this.style = ''
        this.classList.add('border', 'rounded-[5px]', 'bg-[#f6921f]', 'text-white', 'px-[10px]', 'py-[5px]');
        this.innerHTML = /*html*/`
        <div class="border rounded-[5px] bg-[#f6921f] text-white px-[10px] py-[5px] " >${nombre}</div>
        
        `
    }

}
//---------------------------------------------
customElements.define('e-botonrecto', BotonRecto);

Solo quiero con clases de tailwind estilizar un componente y cuando hay cambios en los datos
que se actualizen solos

y que esos cambios sean de la propia etiqueta web component
