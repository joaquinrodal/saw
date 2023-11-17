
Un Array de minutos : 0 a 55 en intervalos de 5 minutos.
minutos: Array.from({ length: 12 }, (_, index) => (index * 5).toString().padStart(2, '0')),
horas:Array.from({ length: 24 }, (_, index) => (index * 1).toString().padStart(2, '0')),

Horas: 00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 
