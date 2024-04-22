/*alert("Bienvenido/a al parque de la costa!")

function Inicio(nom){
     return nom.toUpperCase()
     
}
let nombre = prompt ("ingrese su nombre")
let resultado = Inicio(nombre)
alert("Bienvenido/a" + " " + resultado)

function menuIncio() {
        let opcion
        let total = 0
        do {
            opcion = Number(prompt("Ingrese un numero \n1 menores de edad: valor 10$ \n2 mayores de edad: 20$ \n3 Edad avanzada: 5$ \n0 para salir "))
    
            if(opcion === 1) {
               total= agregadoAlCarrito("menor de Edad", 10, total)
            }  else if(opcion === 2) {
              total= agregadoAlCarrito("mayor de edad", 20, total)
            } else if(opcion === 3) {
              total= agregadoAlCarrito("edad avanzada", 5, total)
            }
        
        
        } while (opcion !== 0) 
        alert(" el total de su compra es " + total)

}
    
    
function agregadoAlCarrito(opcion, valor,total) {
    let cantidad = Number(prompt("Cuantas entradas quieres"))
    let subtotal = valor*cantidad 
    total= total + subtotal 
    alert("se agrego al carrito" + " " + cantidad + " entradas " +  " su valor es de " + " " + subtotal) 
    if (cantidad >=1 ) {
      let nombre = prompt ("ingrese nombre de la persona/s")
      
    }
    return total
}
menuIncio()*/

let productos = [
  {
    id: 5,
    nombre: "pelotda de futbol",
    categoria: "deportes",
    stock: 2,
    precio: 1000,
  },
  {
    id: 4,
    nombre: "gorra1",
    categoria: "indumentaria",
    stock: 1,
    precio: 1500,
  },
  {
    id: 6,
    nombre: "camisa",
    categoria: "indumentaria",
    stock: 7,
    precio: 3250,
  },
  {
    id: 8,
    nombre: "pantalon",
    categoria: "indumentaria",
    stock: 9,
    precio: 2500,
  },
  { id: 9, nombre: "buzo", categoria: "indumentaria", stock: 3, precio: 4000 },
  {
    id: 12,
    nombre: "short de basquet",
    categoria: "deportes",
    stock: 5,
    precio: 3000,
  },
  {
    id: 14,
    nombre: "short de basquet2",
    categoria: "deportes",
    stock: 5,
    precio: 3000,
  },
  {
    id: 2,
    nombre: "camisa manga larga",
    categoria: "indumentaria",
    stock: 5,
    precio: 4500,
  },
  {
    id: 15,
    nombre: "musculosa nike",
    categoria: "deportes",
    stock: 2,
    precio: 2000,
  },
  {
    id: 16,
    nombre: "chaqueta yankee",
    categoria: "indumentaria",
    stock: 6,
    precio: 3200,
  },
  {
    id: 18,
    nombre: "conjunto lacoste",
    categoria: "indumentaria",
    stock: 10,
    precio: 6000,
  },
  {
    id: 19,
    nombre: "camisa de boca",
    categoria: "deportes",
    stock: 10,
    precio: 3500,
  },
  {
    id: 20,
    nombre: "camisa de river",
    categoria: "deportes",
    stock: 10,
    precio: 3500,
  },
  {
    id: 21,
    nombre: "camisa de defensa y justicia",
    categoria: "deportes",
    stock: 10,
    precio: 3500,
  },
];

const listar = (lista, propiedad1, propiedad2, propiedad3) =>
  lista
    .map(
      (producto) =>
        producto[propiedad1] +
        " - " +
        producto[propiedad2] +
        " : " +
        producto[propiedad3]
    )
    .join("\n");

let inicio = prompt(
  "bienvenido a Arclots desearia ver nuestros productos (si-no)\n2 - para filtrar nuestros productos por categoria"
);
if (inicio === "si") {
  nuestrosProductos(productos);
} else if (inicio === "2") {
  filtrarProductos(productos);
} else if (inicio === "no") {
  alert("gracias por visitarnos");
}

function filtrarProductos(productos) {
  let categorias = [];
  let inicio;

  productos.forEach((producto) => {
    if (!categorias.includes(producto.categoria)) {
      categorias.push(producto.categoria);
    }
  });

  let categoriaIngresada = prompt(
    "ingresa una de las siguientes categorias: " +
      categorias.join(", ") +
      "\nsalir"
  ).toLocaleLowerCase();
  let categoriaFiltrada = productos.filter(
    (producto) => producto.categoria === categoriaIngresada
  );
  let salida = categoriaFiltrada.map((producto) => producto.nombre).join("\n");
  alert(salida);
}

function nuestrosProductos(productos) {
  let carrito = [];

  let productosVistos = productos.map((producto) => producto.nombre);
  alert(productosVistos.join(" - "));

  do {
    opcion = Number(
      prompt(
        "Elija el producto que desea e ingrese su id para ver su informacion " +
          " \n " +
          listar(productos, "id", "nombre", "precio")
      )
    );

    let porductoBuscado = productos.find((producto) => producto.id === opcion);

    console.log(porductoBuscado);

    carrito.push({
      id: porductoBuscado.id,
      nombre: porductoBuscado.nombre,
      stock: porductoBuscado.stock,
      precio: porductoBuscado.precio,
    });

    console.log(carrito);
  } while (opcion !== 0);
}
