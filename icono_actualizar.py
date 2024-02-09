            <!--actualizar -->
                       <template x-if="actualizar">

                    
                        <div     @click="clearInterval(intervalo);angulo=0;actualizar=false;"
                                 class="p-[3px] mr-[30px]">
                        <img   x-init="intervalo = setInterval(()=>{angulo += 10;console.log('angulo:->',angulo)},100)"
                               :style="'transform: rotate(' + angulo + 'deg)'"
                               class="h-[40px] w-[44px] "
                               src="/static/imagenes/actualizar.png" alt="">
                       </div>
                       </template>
