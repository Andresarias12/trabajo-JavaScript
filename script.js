alert("Bienvenido/a al parque de la costa!")

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
menuIncio()




