const carritoLS = () => JSON.parse(localStorage.getItem("carrito")) || []

principal()

async function principal() {

    const response = await fetch("./productos.json")
    const productos = await response.json()

    carritoProductos(productos)


    let botonInicio = document.getElementById("boton")
    botonInicio.addEventListener("click", () => renderizarProductos(productos))
    tarjetasdelosproductos(productos, carrito)

    let fianlizarCompra = document.getElementById("comprar")
    fianlizarCompra.addEventListener("click", botonFinalizaCom)

    tarjetasdelosproductos(productos)

    let botonOedarPr = document.getElementById("botonordenarPr")
    botonOedarPr.addEventListener("click", () => ordenarPrecio(productos))

    let botonOedarPr2 = document.getElementById("botonordenarPr2")
    botonOedarPr2.addEventListener("click", () => ordenarPrecio2(productos))

    let botonOrdenar = document.getElementById("botonordenar")
    botonOrdenar.addEventListener("click", () => ordenar(productos))

    let botonOrdenar2 = document.getElementById("botonordenar2")
    botonOrdenar2.addEventListener("click", () => ordenar2(productos))


    let botonCarrito = document.getElementById("carrito")
    botonCarrito.addEventListener("click", botonDeCarrito)



    function renderizarProductos(productos) {
        let productosFiltrados = filtrarProductos(productos)
        tarjetasdelosproductos(productosFiltrados)
    }

    function filtrarProductos(productos) {
        let inputInicio = document.getElementById("input")
        return productos.filter(producto => producto.nombre.includes(inputInicio.value) || producto.categoria.includes(inputInicio.value))

    }


    function botonFinalizaCom() {

        localStorage.removeItem("carrito")
        carritoProductos([])
        sweetalert("Compra finalizada", "Muchas gracias por su compra", "success", 2000)

    }

    function tarjetasdelosproductos(productos) {


        let nuestrosproductostarjeta = document.getElementById("nuestrosproductos")

        nuestrosproductostarjeta.innerHTML = ""

        productos.forEach(({ nombre, rutaimagen, precio, stock, id }) => {

            let tarjetasproductos = document.createElement("div")
            tarjetasproductos.className = "tarjetasproductos"
            tarjetasproductos.innerHTML = `
        <h3 class= "titulo" > ${nombre}</h3>
        <img id="imagenes" class=" imagenes2 m-5" src=./images/${rutaimagen} /> 
        <h3 class="precio"> $ ${precio}</h3>
        <p class="stock">stock: ${stock}</p>
        <h5 class= "talles">Talles: xs-s-m-l-x-xl-xxl</h5>
        <div class="color4">
            <button class="color"></button>
            <button class="color2"></button>
            <button class="color3"></button>
            <button class="color5"></button>
        </div>
        <button  id=botonCarrito${id} class="boton2 ">agregar al carrito</button>
        

        
      `
            nuestrosproductostarjeta.appendChild(tarjetasproductos)
            let agregarAlcarrito = document.getElementById("botonCarrito" + id)
            agregarAlcarrito.onclick = (e) => { agregarPrAlcarrito(e, productos) }


        });

    }



    function agregarPrAlcarrito(e, productos) {

        let carrito = carritoLS()
        let idDeproducto = Number(e.target.id.substring(12))

        let productosEncarrito = carrito.findIndex(producto => producto.id === idDeproducto)
        let productoBuscado = productos.find(producto => producto.id === idDeproducto)

        toast("Producto agregado", "top", 2000)


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
        localStorage.setItem("carrito", JSON.stringify(carrito))
        carritoProductos()


    }

    function carritoProductos() {
        let carrito = carritoLS()
        let losProductosCarrito = document.getElementById("productoscarrito")
        losProductosCarrito.innerHTML = ""
        carrito.forEach(productos => {
            let tarjetaCarrito = document.createElement("div")


            tarjetaCarrito.className = "tarjetacarrito"
            tarjetaCarrito.innerHTML = `
        
         <p> ${productos.nombre}</p>
         <p>${productos.precio}</p>
         <p> ${productos.unidades}</p>
         <p> ${productos.subtotal}</p>
         <button id=eliminar2${productos.id}>ELIMINAR</button>
         <br>
         
       
        `
            losProductosCarrito.appendChild(tarjetaCarrito)

            let botonEliminar = document.getElementById("eliminar2" + productos.id)
            botonEliminar.onclick = (e) => { eliminarProductoDelCarrito(e) }

        })
    }


    function eliminarProductoDelCarrito(e) {
        let carrito = carritoLS()
        let id = Number(e.target.id.substring(8))
        carrito = carrito.filter(producto => producto.id !== id)
        localStorage.setItem("carrito", JSON.stringify(carrito))
        e.target.parentElement.remove()
    }


    function botonDeCarrito(e) {

        let carritoproductos = document.getElementById("nuestrosproductos")
        let productocarrito = document.getElementById("productoscarrito")
        let orden = document.getElementById("botonordenar4")
        let boton = document.getElementById("boton")
        let input = document.getElementById("input")

        carritoproductos.classList.toggle("carrito")
        productocarrito.classList.toggle("carrito")
        orden.classList.toggle("carrito")
        boton.classList.toggle("carrito")
        input.classList.toggle("carrito")

        if (e.target.innerText === "carrito") {
            e.target.innerText = "productos"

        } else (
            e.target.innerText = "carrito"
        )


    }


    function ordenarPrecio(productos) {
        productos.sort((a, b) => {
            if (a.precio > b.precio) {
                return 1
            } else if (a.precio < b.precio) {
                return -1
            }
            return 0
        })

        tarjetasdelosproductos(productos)
    }

    function ordenar(productos) {
        productos.sort((a, b) => {
            if (a.nombre > b.nombre) {
                return 1
            } else if (a.nombre < b.nombre) {
                return -1
            }
            return 0
        })

        tarjetasdelosproductos(productos)


    }

    function ordenarPrecio2(productos) {
        productos.sort((a, b) => {
            if (a.precio < b.precio) {
                return 1
            } else if (a.precio > b.precio) {
                return -1
            }
            return 0
        })

        tarjetasdelosproductos(productos)
    }

    function ordenar2(productos) {
        productos.sort((a, b) => {
            if (a.nombre < b.nombre) {
                return 1
            } else if (a.nombre > b.nombre) {
                return -1
            }
            return 0
        })

        tarjetasdelosproductos(productos)
    }

    function toast(text, gravity, duration) {
        Toastify({
            text,
            gravity,
            duration,
            style: {
                background: "#ffe4c4",
                color: "#000000"
            },
            close: true,
        }).showToast();
    }

    function sweetalert(title, text, icon, timer) {
        Swal.fire({
            title,
            text,
            icon,
            confirmButtonText: 'cerrar',
            timer,
        })
    }

}