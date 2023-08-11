// Clase Producto y constructor
class Producto {
    constructor(nombre, precio, imagen) {
  
      this.nombre = nombre;
      this.precio = precio;
      this.imagen = imagen
    }
  }
  
  // Lista para almacenar los productos
  let listaProductos = [];
  
  // Obtener referencias a los elementos del formulario
  const nombreProductoInput = document.getElementById('input-NombreP');
  const precioProductoInput = document.getElementById('input-PrecioP');
  const imagenProductoInput = document.getElementById('input-imagenP')
  const btnAgregarProd = document.getElementById('btnAgregarP');
  const productosContainer = document.getElementById('contP');
  
  // Agregar un evento al formulario para la validación
  document.getElementById('form-AgregP').addEventListener('submit', function(event) {
    event.preventDefault();
    AgregarProducto();
  });
  
  // Función para validar que los inputs estén completos y agregar el producto
  function AgregarProducto() {
    const nombrePr = nombreProductoInput.value.trim();
    const precioPr = parseFloat(precioProductoInput.value);
    const imagenPr = imagenProductoInput.value.trim();
  
    if (nombrePr !== '' && imagenPr!=='' && !isNaN(precioPr) && precioPr >= 0) {
      const producto = new Producto(nombrePr, precioPr, imagenPr);
      listaProductos.push(producto);
      CrearHTMLProducto(producto);
      nombreProductoInput.value = '';
      precioProductoInput.value = '';
      imagenProductoInput.value='';
  
      guardarProductos();
  
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, complete de manera correcta todos los campos del formulario.',
      })
  
      nombreProductoInput.value = '';
      precioProductoInput.value = '';
      imagenProductoInput.value='';
    }
  }
  
  // Función para crear el HTML de un producto y mostrarlo en la página
  function CrearHTMLProducto(producto) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.width = '18rem';
  
    const img = document.createElement('img');
    img.src = producto.imagen;
    img.className = 'card-img-top';
    img.alt = '...';
    card.appendChild(img);
  
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    card.appendChild(cardBody);
  
    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = producto.nombre;
    cardBody.appendChild(title);
  
    const price = document.createElement('p');
    price.className = 'card-text';
    price.textContent = `$ ${producto.precio.toFixed(2)}`;
    cardBody.appendChild(price);
  
    const addToCartButton = document.createElement('button');
    addToCartButton.type = 'button';
    addToCartButton.className = 'btn btn-primary';
    addToCartButton.textContent = 'Añadir al carrito';
    cardBody.appendChild(addToCartButton);
  
    addToCartButton.addEventListener('click', function () {
      AgregarAlCarrito(producto);
    });
  
    productosContainer.appendChild(card);
  }
  
  function cargarProductos() {
    const productosGuardados = localStorage.getItem('productos');
    if (productosGuardados !== '[]' && productosGuardados !== null) {
      listaProductos = JSON.parse(productosGuardados);
      listaProductos.forEach(function (producto) {
        CrearHTMLProducto(producto);
      });
    } else {
      listaProductos = [
        { nombre: 'WebShooter"', precio: 80000 , imagen:'https://i.pinimg.com/236x/74/80/02/74800204d0c980381aad055b26e3c8f7.jpg'},
        { nombre: 'SpiderMask', precio: 83599, imagen:'https://i.pinimg.com/564x/e4/ca/24/e4ca24d9486cb4fd18132bab86bc702c.jpg'},
        { nombre: 'Hobbie`s guittar', precio: 64000, imagen:'https://i.pinimg.com/236x/27/9a/41/279a41d83073f035cedacebc77c92405.jpg'},
        { nombre: 'miles` jordans', precio: 7300, imagen:'https://i.pinimg.com/236x/73/92/0b/73920b50e9ce48bbf56b1237b97cce73.jpg'},
      ];
      listaProductos.forEach(function (producto) {
        CrearHTMLProducto(producto);
      });
      guardarProductos();
    }
  }
  function guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(listaProductos));
  }
  
  // Llamar a la función para cargar los productos al abrir la página
  cargarProductos();
  
  // Manejar evento de clic en el botón "Añadir al carrito"
  function AgregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('AlCarrito')) || [];
    carrito.push(producto);
    localStorage.setItem('AlCarrito', JSON.stringify(carrito));
  }