

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <script src="https://npmcdn.com/flatpickr/dist/l10n/es.js"></script>


        flatpickr('#fecha_alta_final', {
                    'locale': 'es', 
                    onChange: function(selectedDates, dateStr, instance) {
                            alta_final = dateStr
                        },
                        dateFormat: 'd-m-Y'
                    });

    <div class="border rounded-[5px] px-[10px] w-[70%] h-[40px] flex items-center"
                    x-text="alta_inicio?alta_inicio:'Comienzo'"
                    id="fecha_alta_inicio"></div>
    </div>
