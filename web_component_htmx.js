<script>
      
     customElements.define('mi-etiqueta', class Etiqueta extends HTMLElement {
       //---------------------------------------
     connectedCallback() {
     const buttonColor = this.getAttribute('color') || 'blue';
     this.innerHTML = `
              <div class="text-[30px] text-red-400">HOLA</div>
     `
     htmx.process(root) 
     }
     //------------------------------------
     static get observedAttributes() {
      return ['color'];
     }
     //-----------------  
     attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'color' && oldValue !== newValue) {
          this.connectedCallback(); // Volver a renderizar el componente con el nuevo color
        }
       
      }
     //---------------------
       
     })
  
</script>
