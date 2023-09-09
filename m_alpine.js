		x-cloak
		x-show="isOpen"
		x-transition.origin.top.left.duration.500ms
		@click.away ="isOpen = false"
		@keydown.escape.window="isOpen = false"
		class="absolute w-44 font-semibold bg-white rounded-xl py-3 ml-8 text-left shadow-dialog"


        dentro del x-text="active.lenght === 1 ? 'item':'items'"

        x-text --> mostrar texto segun una condicion ... 

        recorrer un array en js

        this.usuarios.forEach(usuario => usuario.activo = !valor)
        se recorre un array y se puede actualizar 

		        x-data="select({ data: { au: 'Australia', be: 'Belgium', cn: 'China', fr: 'France', de: 'Germany', it: 'Italy', mx: 'Mexico', es: 'Spain', tr: 'Turkey', gb: 'United Kingdom', 'us': 'United States' }, emptyOptionsMessage: 'No countries match your search.', name: 'country', placeholder: 'Select a country' })"
                x-init="init()"
                @click.away="closeListbox()"
                @keydown.escape="closeListbox()"
                 x-ref="search"
                x-show="open"
                x-model="search"
                @keydown.enter.stop.prevent="selectOption()"
                @keydown.arrow-up.prevent="focusPreviousOption()"
                @keydown.arrow-down.prevent="focusNextOption()"
                x-show="open"
                x-transition:leave="transition ease-in duration-100"
                x-transition:leave-start="opacity-100"
                x-transition:leave-end="opacity-0"
                x-cloak
                x-ref="listbox"
                @keydown.enter.stop.prevent="selectOption()"
                @keydown.arrow-up.prevent="focusPreviousOption()"
                @keydown.arrow-down.prevent="focusNextOption()"
                :id="name + 'Option' + focusedOptionIndex"
                @click="selectOption()"
                @mouseenter="focusedOptionIndex = index"
                @mouseleave="focusedOptionIndex = null"
                role="option"
                :aria-selected="focusedOptionIndex === index"
                :class="{ 'text-white bg-indigo-600': index === focusedOptionIndex, 'text-gray-900': index !== focusedOptionIndex }"


# doble click 
<div x-data="data()" class="p-4">
    <a @click.prevent @dblclick="toggleEditingState" x-show="!isEditing" x-text="text" class="select-none cursor-pointer underline text-blue-500"></a>
    <input type="text" x-model="text" x-show="isEditing" @click.away="toggleEditingState" @keydown.enter="disableEditing" @keydown.window.escape="disableEditing" class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 appearance-none leading-normal w-128" x-ref="input">
</div>

       x-transition:enter="transition ease-in duration-200"
            x-transition:enter-start="transform opacity-0 translate-y-2"
            x-transition:enter-end="transform opacity-100"
            x-transition:leave="transition ease-out duration-500"
            x-transition:leave-start="transform translate-x-0 opacity-100"
            x-transition:leave-end="transform translate-x-full opacity-0"

    

:style="`background-color: ${bcolor}; color: ${tcolor}`  "

 :style="`opacity: ${opacidad};`"
   :class="{'hidden': ver_menu}"

 :style="`transition: all 1s ease-in-out; width:${ancho}px;background-color:yellow`"

         <div   :style="`transition: all 1s ease-in-out; width:${ancho}px;background-color:yellow`"
               class=" px-[50px] font-bold " :data-color="enviar">
          FICHAJE
        </div>
