let productos = [
  { id: 5, nombre: "pelotda de futbol", categoria: "deportes", stock: 2, precio: 1000, rutaimagen: "pelota-de-futbol.jpeg" },
  { id: 4, nombre: "gorra1", categoria: "indumentaria", stock: 1, precio: 1500, rutaimagen: "gorra1.jpeg" },
  { id: 6, nombre: "camisa", categoria: "indumentaria", stock: 7, precio: 3250, rutaimagen: "camisa.jpeg" },
  { id: 8, nombre: "pantalon", categoria: "indumentaria", stock: 9, precio: 2500, rutaimagen: "pantalon.jpeg" },
  { id: 9, nombre: "buzo", categoria: "indumentaria", stock: 3, precio: 4000, rutaimagen: "buzo.jpeg" },
  { id: 12, nombre: "short de basquet", categoria: "deportes", stock: 5, precio: 3000, rutaimagen: "short-de-basquet.jpeg" },
  { id: 14, nombre: "short de basquet2", categoria: "deportes", stock: 5, precio: 3000, rutaimagen: "short-de-basquet-2.jpeg" },
  { id: 2, nombre: "camisa manga larga", categoria: "indumentaria", stock: 5, precio: 4500, rutaimagen: "camisa-manga-larga.jpeg" },
  { id: 15, nombre: "musculosa nike", categoria: "deportes", stock: 2, precio: 2000, rutaimagen: "musculosa-nike.jpeg" },
  { id: 16, nombre: "chaqueta yankee", categoria: "indumentaria", stock: 6, precio: 3200, rutaimagen: "chaqueta-yankee.jpeg" },
  { id: 18, nombre: "conjunto lacoste", categoria: "indumentaria", stock: 10, precio: 6000, rutaimagen: "conjunto-lacoste.jpeg" },
  { id: 19, nombre: "camisa de boca", categoria: "deportes", stock: 10, precio: 3500, rutaimagen: "camisa-de-boca.jpeg" },
  { id: 20, nombre: "camisa de river", categoria: "deportes", stock: 10, precio: 3500, rutaimagen: "camisa-de-river.jpeg" },
  { id: 21, nombre: "camisa de defensa", categoria: "deportes", stock: 10, precio: 3500, rutaimagen: "camisa-de-defensa.jpeg" },
]


principal(productos)

let carrito = []
  

function principal(productos) {

  let botonInicio = document.getElementById("boton")
  botonInicio.addEventListener("click", () => renderizarProductos(productos))
  tarjetasdelosproductos(productos)
}



function renderizarProductos(productos) {
  let productosFiltrados = filtrarProductos(productos)
  tarjetasdelosproductos(productosFiltrados)
}

function filtrarProductos(productos) {
  let inputInicio = document.getElementById("input")
  return productos.filter(producto => producto.nombre.includes(inputInicio.value))
}






function tarjetasdelosproductos(productos) {
  
 
  let nuestrosproductostarjeta = document.getElementById("nuestrosproductos")

  nuestrosproductostarjeta.innerHTML = ""

  productos.forEach(productos => {

      let { nombre, rutaimagen, precio, stock, id } = productos

      let tarjetasproductos = document.createElement("div")
      tarjetasproductos.className = "tarjetasproductos"
      tarjetasproductos.innerHTML = `
      <h3 class= "titulo" > ${nombre}</h3>
      <img id="imagenes" class="imagenes2" src=./images/${rutaimagen} /> 
      <h4 class="precio"> precio:${precio}</h4>
      <p class="stock">stock: ${stock}</p>
      <h4 class= "talles">talles: xs-s-m-l-x-xl-xxl</h4>
      <button  id=${id} class="boton">agregar al carrito</button>
      
    `
      nuestrosproductostarjeta.appendChild(tarjetasproductos)
      let agregarAlcarrito = document.getElementById(productos.id)
      agregarAlcarrito.addEventListener("click", agregarPrAlcarrito)

  });

}




function agregarPrAlcarrito(e) {
  
  let idDeproducto = Number(e.target.id)
  let productosEncarrito = carrito.findIndex(producto => producto.id === idDeproducto)
  let productoBuscado = productos.find(producto => producto.id === idDeproducto)

  if (productosEncarrito !== -1) {
      carrito[productosEncarrito].unidades++
      carrito[productosEncarrito].subtotal = carrito[productosEncarrito].precio * carrito[productosEncarrito].unidades
  } else {
      carrito.push({
          id: productoBuscado.id,
          nombre: productoBuscado.nombre,
          unidades: 1,
          precio: productoBuscado.precio,
          subtotal: productoBuscado.precio

      })
  }
  localStorage.setItem("carrito",JSON.stringify(carrito))
  carritoProductos(carrito, productos)


}

function carritoProductos(carrito) {

  
  let losProductosCarrito = document.getElementById("productoscarrito")
  losProductosCarrito.innerHTML = ""
  carrito.forEach(productos => {
      let tarjetaCarrito = document.createElement("div")
      tarjetaCarrito.innerHTML = productos.nombre
      losProductosCarrito.appendChild(tarjetaCarrito)
      tarjetaCarrito.className = "tarjetacarrito"
      tarjetaCarrito.innerHTML = `
       
       <p> ${productos.nombre}</p>
       <p>${productos.precio}</p>
       <p> ${productos.unidades}</p>
       <p> ${productos.subtotal}</p>
       <button id=eliminar${productos.id}>ELIMINAR</button>
     
      `
  })
}

let botonCarrito = document.getElementById("carrito")

botonCarrito.addEventListener("click", botonDeCarrito)

function botonDeCarrito(e) {

let carritoproductos = document.getElementById("nuestrosproductos")
let productocarrito =  document.getElementById("productoscarrito")

carritoproductos.classList.toggle("carrito")
productocarrito.classList.toggle("carrito")

 if (e.target.innerText === "carrito") {
  e.target.innerText = "productos"
  
 }else(
  e.target.innerText = "carrito"
 )
  

}

let botonOrdenar = document.getElementById("botonordenar")
botonOrdenar.addEventListener("click", () => ordenar(productos))


function ordenar(productos) {
 productos.sort((a,b) => {
  if (a.nombre > b.nombre) {
      return 1
  }else if (a.nombre < b.nombre){
      return -1
  }
  return 0
 })

 tarjetasdelosproductos(productos)

 
}