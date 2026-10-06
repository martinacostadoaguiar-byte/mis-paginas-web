// ========================================
// MENÚ MOBILE
// ========================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {

    navMenu.classList.toggle("active");

});


// Cerrar menú al hacer click en un enlace

const enlacesMenu = document.querySelectorAll("#navMenu a");

enlacesMenu.forEach(function (enlace) {

    enlace.addEventListener("click", function () {

        navMenu.classList.remove("active");

    });

});


// ========================================
// CARRITO
// ========================================

let productos = [];

const carrito = document.getElementById("cart");
const abrirCarrito = document.getElementById("cartButton");
const cerrarCarrito = document.getElementById("closeCart");
const overlay = document.getElementById("cartOverlay");

const listaCarrito =
    document.getElementById("cartItems");

const contador =
    document.getElementById("cartCount");

const totalCarrito =
    document.getElementById("cartTotal");


// ========================================
// ABRIR CARRITO
// ========================================

abrirCarrito.addEventListener("click", function () {

    carrito.classList.add("active");

    overlay.classList.add("active");

});


// ========================================
// CERRAR CARRITO
// ========================================

cerrarCarrito.addEventListener("click", cerrarCarritoMenu);

overlay.addEventListener("click", cerrarCarritoMenu);


function cerrarCarritoMenu() {

    carrito.classList.remove("active");

    overlay.classList.remove("active");

}


// ========================================
// AGREGAR PRODUCTOS
// ========================================

const botonesAgregar =
    document.querySelectorAll(".add-button");


botonesAgregar.forEach(function (boton) {

    boton.addEventListener("click", function () {

        const producto =
            boton.closest(".product");

        const nombre =
            producto.dataset.name;

        const precio =
            Number(producto.dataset.price);

        agregarProducto(nombre, precio);

    });

});


// ========================================
// AGREGAR PRODUCTO
// ========================================

function agregarProducto(nombre, precio) {

    const productoExistente =
        productos.find(function (item) {

            return item.nombre === nombre;

        });


    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        productos.push({

            nombre: nombre,

            precio: precio,

            cantidad: 1

        });

    }


    actualizarCarrito();

    carrito.classList.add("active");

    overlay.classList.add("active");

}


// ========================================
// ACTUALIZAR CARRITO
// ========================================

function actualizarCarrito() {

    listaCarrito.innerHTML = "";

    let total = 0;

    let cantidadTotal = 0;


    if (productos.length === 0) {

        listaCarrito.innerHTML =
            '<p class="empty-cart">Tu carrito está vacío.</p>';

    }


    productos.forEach(function (producto, indice) {

        total +=
            producto.precio *
            producto.cantidad;


        cantidadTotal +=
            producto.cantidad;


        const elemento =
            document.createElement("div");


        elemento.classList.add("cart-item");


        elemento.innerHTML =

            '<div>' +

                '<h4>' +
                    producto.nombre +
                '</h4>' +

                '<p>$' +
                    formatearPrecio(producto.precio) +
                '</p>' +

                '<div class="cart-actions">' +

                    '<button class="quantity-button" onclick="cambiarCantidad(' +
                        indice +
                        ', -1)">−</button>' +

                    '<span>' +
                        producto.cantidad +
                    '</span>' +

                    '<button class="quantity-button" onclick="cambiarCantidad(' +
                        indice +
                        ', 1)">+</button>' +

                '</div>' +

            '</div>' +

            '<button class="remove-item" onclick="eliminarProducto(' +
                indice +
                ')">' +

                'Eliminar' +

            '</button>';


        listaCarrito.appendChild(elemento);

    });


    contador.textContent =
        cantidadTotal;


    totalCarrito.textContent =
        "$" +
        formatearPrecio(total);

}


// ========================================
// CAMBIAR CANTIDAD
// ========================================

function cambiarCantidad(indice, cambio) {

    productos[indice].cantidad += cambio;


    if (productos[indice].cantidad <= 0) {

        productos.splice(indice, 1);

    }


    actualizarCarrito();

}


// ========================================
// ELIMINAR PRODUCTO
// ========================================

function eliminarProducto(indice) {

    productos.splice(indice, 1);

    actualizarCarrito();

}


// ========================================
// FORMATEAR PRECIO
// ========================================

function formatearPrecio(numero) {

    return numero.toLocaleString("es-AR");

}


// ========================================
// BUSCADOR
// ========================================

const buscador =
    document.getElementById("searchInput");

const tarjetas =
    document.querySelectorAll(".product");

const mensajeSinResultados =
    document.getElementById("noResults");


buscador.addEventListener(
    "input",
    filtrarProductos
);


function filtrarProductos() {

    const texto =
        buscador.value
            .toLowerCase()
            .trim();


    let encontrados = 0;


    tarjetas.forEach(function (tarjeta) {

        const nombre =
            tarjeta.dataset.name
                .toLowerCase();


        const categoria =
            tarjeta.dataset.category
                .toLowerCase();


        const coincide =
            nombre.includes(texto) ||
            categoria.includes(texto);


        if (coincide) {

            tarjeta.style.display = "";

            encontrados++;

        } else {

            tarjeta.style.display = "none";

        }

    });


    mensajeSinResultados.style.display =
        encontrados === 0
            ? "block"
            : "none";

}


// ========================================
// FILTROS
// ========================================

const botonesCategoria =
    document.querySelectorAll(".category-button");


botonesCategoria.forEach(function (boton) {

    boton.addEventListener("click", function () {


        botonesCategoria.forEach(function (b) {

            b.classList.remove("active");

        });


        boton.classList.add("active");


        const categoria =
            boton.dataset.category;


        let encontrados = 0;


        tarjetas.forEach(function (tarjeta) {

            const categoriaProducto =
                tarjeta.dataset.category;


            if (
                categoria === "todos" ||
                categoriaProducto === categoria
            ) {

                tarjeta.style.display = "";

                encontrados++;

            } else {

                tarjeta.style.display = "none";

            }

        });


        mensajeSinResultados.style.display =
            encontrados === 0
                ? "block"
                : "none";


        buscador.value = "";

    });

});


// ========================================
// WHATSAPP
// ========================================

const botonCheckout =
    document.getElementById("checkout");


botonCheckout.addEventListener(
    "click",
    enviarPedidoWhatsApp
);


function enviarPedidoWhatsApp() {

    if (productos.length === 0) {

        alert("Tu carrito está vacío.");

        return;

    }


    let mensaje =
        "Hola Velvet Cafe! 👋\n\n";


    mensaje +=
        "Quiero hacer el siguiente pedido:\n\n";


    let total = 0;


    productos.forEach(function (producto) {

        const subtotal =
            producto.precio *
            producto.cantidad;


        total += subtotal;


        mensaje +=
            "- " +
            producto.nombre +
            " x" +
            producto.cantidad +
            " - $" +
            formatearPrecio(subtotal) +
            "\n";

    });


    mensaje +=
        "\nTotal: $" +
        formatearPrecio(total);


    mensaje +=
        "\n\nGracias!";


    // CAMBIÁ ESTE NÚMERO
    // POR EL WHATSAPP REAL DEL CLIENTE

    const numero =
        "5491112345678";


    const url =
        "https://wa.me/" +
        numero +
        "?text=" +
        encodeURIComponent(mensaje);


    window.open(url, "_blank");

}


// ========================================
// INICIO
// ========================================

actualizarCarrito();
