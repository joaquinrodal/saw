
        <select  class="w-full bg-white px-4 border rounded-lg py-1"
                              x-model="usuario.dto">
                         <template x-for="s in dto">
                          
                             <option 
                             :selected="s==usuario.dto?'selected':''"
                             :value="s" 
                             x-text="s">
                             </option>
                          
                         </template>
        </select>
