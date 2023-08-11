
const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");
const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");
const carritoContainer = document.getElementById("carrito-container");

cargarProductosCarrito();

function cargarProductosCarrito() {
  const carrito = JSON.parse(localStorage.getItem("AlCarrito")) || [];
  const cantComprados = document.getElementById("cant-comprados");

  carrito.forEach(function(producto) {
    CrearHTMLProducto(producto);
  });

  if (carrito.length === 0) {
    btnFinalizarCompra.disabled = true;
    btnVaciarCarrito.disabled = true;
  } else {
    btnFinalizarCompra.disabled = false;
    btnVaciarCarrito.disabled = false;
  }
}

btnFinalizarCompra.addEventListener('click', function() {
  FinalizarCompra();
});

document.getElementById('btnFinalizarCompra').addEventListener('click', function () {

  localStorage.removeItem('AlCarrito');
  ActualizarCarrito();
});

function FinalizarCompra() {
  Swal.fire("¡Compra realizada con éxito!")

  VaciarCarrito();
  cargarProductosCarrito();
}

btnVaciarCarrito.addEventListener('click', function() {
  VaciarCarrito();
  Swal.fire("Todo limpio, has vaciado el carrito!!")
});

document.getElementById('btnVaciarCarrito').addEventListener('click', function () {
  localStorage.removeItem('AlCarrito');
  ActualizarCarrito();
});

function VaciarCarrito() {
  localStorage.removeItem("AlCarrito");

  cargarProductosCarrito();
}

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

  carritoContainer.appendChild(card);
}

function ActualizarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('AlCarrito')) || [];
  const cantComprados = document.getElementById('cant-comprados');

  carritoContainer.innerHTML = '';

  carrito.forEach(function (producto) {
    CrearHTMLProducto(producto);
  });

  const btnFinalizarCompra = document.getElementById('btnFinalizarCompra');
  const btnVaciarCarrito = document.getElementById('btnVaciarCarrito');

  if (carrito.length === 0) {
    btnFinalizarCompra.disabled = true;
    btnVaciarCarrito.disabled = true;

  } else {
    btnFinalizarCompra.disabled = false;
    btnVaciarCarrito.disabled = false;
  }
}
function AgregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem('AlCarrito')) || [];
  carrito.push(producto);
  localStorage.setItem('AlCarrito', JSON.stringify(carrito));
}

