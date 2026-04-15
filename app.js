let productos = [];

//API local de mis productos
const traerProductos = async () => {
try{
    const respuesta = await fetch("./productos.json");
    productos = await respuesta.json();
    renderizarProductosVisual()
}catch(error){
    console.log("Hubo un error trayendo los datos:", error);
}
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


const contenedor = document.getElementById("contenedor-productos");

const contenedorCarrito = document.getElementById("contenedor-carrito");

const mostrarNotificacion = () => {
    const toast = document.createElement("div");

    toast.textContent = "¡Producto agregado al carrito!";
    toast.className = "toast-notificacion";

    document.body.appendChild(toast)

    setTimeout(() => {
        toast.remove();
    }, 3000);
};


// Funcion del carrito de compras
const renderizarCarro = () => {

    // Total a pagar que tendra el usuario

    const total = carrito.reduce((acumulador, producto) => {
    return acumulador + (producto.precio * producto.cantidad);
    }, 0);

    //agrego el HTML al carro 
    const carritoHTML = carrito.map(producto => {
        return `
        <div class="item-carrito">
        <div>
        <h4>${producto.nombre}</h4>
        <p>Precio: $${producto.precio}</p>
        </div>
        <div class="controles-carrito">
        <button class="btn-restar" data-id="${producto.id}">-</button>
        <span class="cantidad-display">${producto.cantidad}</span>
        <button class="btn-sumar" data-id="${producto.id}">+</button>
        <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
        </div>
        </div>`
    });

    contenedorCarrito.innerHTML = `
    ${carritoHTML.join("")}
    <hr> <h3>Total a pagar: $${total}</h3>
    <button id="btn-vaciar">Vaciar carrito</button>
    <button id="btn-comprar" class="btn-agregar">Finalizar compra</button>
    `;

    // Boton eliminar

    const botonesEliminar = document.querySelectorAll(".btn-eliminar");

    // Recorren uno por uno los botones

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", () => {
            // ID del producto que vamos a eliminar

        const id = boton.dataset.id;
        const idNumero = parseInt(id);

        carrito = carrito.filter(producto => producto.id !== idNumero);

        renderizarCarro();
        });
    });

    // Boton sumar en el carrito

    const botonSumar = document.querySelectorAll(".btn-sumar");

    botonSumar.forEach(boton => {
        boton.addEventListener("click", () => {
             //ID del producto para sumar
        const id = boton.dataset.id;
        const idNumero = parseInt(id);

        const productoEnCarrito = carrito.find(producto => producto.id === idNumero);

        // Suma del boton a la cantidad
        if(productoEnCarrito.cantidad < productoEnCarrito.stock){
            // Si hay menos que el stock, le sumo 1
            productoEnCarrito.cantidad++;
            renderizarCarro();
        }else{
            Swal.fire({
                        icon: 'error',
                        title: '¡Oops!',
                        text: '¡No hay más stock disponible de este producto!',
                        confirmButtonColor: '#28a745'
});
        }
        });
    });

    // Boton restar en el carrito

    const botonRestar = document.querySelectorAll(".btn-restar");

    botonRestar.forEach(boton => {
        boton.addEventListener("click", () => {
            //ID del producto para restar
            const id = boton.dataset.id;
            const idNumero = parseInt(id);
            
            // Busco el producto en el carrito

            const productoEnCarrito = carrito.find(producto => producto.id === idNumero);

            if(productoEnCarrito.cantidad === 1){
                // Si solo hay uno, se filtra
                carrito = carrito.filter(producto => producto.id !== idNumero);
            }else{
                // Si hay mas de uno, se resta
                productoEnCarrito.cantidad--;
            }
            renderizarCarro();
        });
    });

    // Vaciar carrito

    const btnVaciar = document.getElementById("btn-vaciar");

    btnVaciar.addEventListener("click", () => {
        
        carrito = [];
        renderizarCarro();
    });

    // Finalizar compra 
    const btnComprar = document.getElementById("btn-comprar");

    btnComprar.addEventListener("click", () => {
        if(carrito.length === 0){
            // Si esta vacio, doy una alerta
            Swal.fire({
                icon: 'warning',
                title: 'Carrito vacío',
                text: '¡No tenés nada para comprar todavía!',
                confirmButtonColor: '#28a745'
            });
            return;
        }

        carrito = [];
        renderizarCarro();

        Swal.fire({
            icon: 'success',
            title: '¡Compra exitosa!',
            text: 'Tu pago se procesó correctamente. ¡Gracias!',
            confirmButtonColor: '#28a745'
        });
    });


    guardarEnStorage();
};


// Funcion para guardar en localStorage

const guardarEnStorage = () => {
    //localStorage va a guardar el item llamado carrito
    //le pasamos nuestro array traducido a texto gracias a la propiedad .stringify
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

const renderizarProductosVisual = () =>{
    const productosHTML = productos.map(producto =>{
    return `
    <div class="tarjeta-producto">
    <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto">
    <h2>${producto.nombre}</h2>
    <p>${producto.precio}</p>
    <button class="btn-agregar" data-id="${producto.id}">Agregar</button>
    </div>`;
});

contenedor.innerHTML = productosHTML.join("");

const botones = document.querySelectorAll(".btn-agregar");

botones.forEach(boton => {
    boton.addEventListener("click", () =>{
        
        const id = boton.dataset.id;

        const idNumero = parseInt(id)

        // Busco el producto en la base de datos (array original)
        const productoSeleccionado = productos.find(producto => producto.id === idNumero);

        // Busco si ese mismo ID ya existe dentro del carrito 
        const productoEnCarrito = carrito.find(producto => producto.id === idNumero);

        // Evaluo que accion se produce
        if(productoEnCarrito){
            if(productoEnCarrito.cantidad < productoEnCarrito.stock){
                productoEnCarrito.cantidad++
            }else{
                Swal.fire({
                            icon: 'error',
                            title: '¡Oops!',
                            text: '¡No hay más stock disponible de este producto!',
                            confirmButtonColor: '#28a745'
            });
            }
        }else {
            // Si no exite, lo añado por primera vez, pero le agrego la cantidad inicial
            carrito.push({
                ...productoSeleccionado,
                cantidad: 1
            });
        };

        renderizarCarro();
        mostrarNotificacion();
    });
});
} 

traerProductos();