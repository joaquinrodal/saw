

facturas.sort((a, b) => a.cliente.nombre.localeCompare(b.cliente.nombre));

# prompt: en js en un array como ordenar por campos

const arr = [
  { name: "John", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 },
];

// Ordenar por edad (ascendente)
arr.sort((a, b) => a.age - b.age);

// Ordenar por nombre (alfabéticamente)
arr.sort((a, b) => a.name.localeCompare(b.name));

muy efectivo
