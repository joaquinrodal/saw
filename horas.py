
    @property
    def horas(self):
        total = timedelta(days=0, seconds=0)
        for x in [0,1,2,3,4,5,6]:
            if self.horarios[x]['times']:
                print('dia',self.horarios[x]['day'])
                inicio = self.horarios[x]['times'][0][0]
                final = self.horarios[x]['times'][0][1]
                hora_inicio = datetime.strptime(inicio, "%H:%M")
                hora_final = datetime.strptime(final, "%H:%M")
                print('INICIO',hora_inicio)
                print('FINAL',hora_final)
                resta = hora_final - hora_inicio
                total = total + resta
                print('HORAS:--<',total)
        
        return str(total.seconds // 3600)
