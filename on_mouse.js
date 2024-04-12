
       <div   @mouseover="mensaje_notificacion='dentro'" 
              @mouseleave="mensaje_notificacion='fuera'"
              @click="mensaje_notificacion='hola'" 
              x-text="mensaje_notificacion" 
              :class="boton1"></div>


interesante @mouseover usar esto en determinados casos
