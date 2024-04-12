

const persona = {
  nombre: "Juan",
  edad: 30,
  ciudad: "Madrid" // propiedad agregada para mostrar que no siempre sigue el orden de creación
};

for (const propiedad in persona) {
  console.log(`${propiedad}: ${persona[propiedad]}`);
}

esto es interesante ....

probar este ejemplo
