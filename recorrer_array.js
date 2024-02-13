

quiero recorrer un array y poner todos los elementos a un valor

recorrer un array
[].map((el)=>el.bit=false)

tenemos un array 
y queremos un array donde cada elemento cumpla una condicion
[].filter((el)=>{return el > 5}) 

queremos sumar todos los items de un array..
[1,2,3,4,5,6,7,8]

[1,2,3,4,5].reduce((ac,nu)=>{return ac + nu}) --> resultado = 15 
es la suma de todos los items.

crear un array de n items
array = Array.from({ length: 86 }, () => false);
const array = new Array(86).fill(false);
const array = Array(86).fill().map(() => false);


