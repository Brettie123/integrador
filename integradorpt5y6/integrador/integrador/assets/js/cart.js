
const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");
const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");
const carritoContainer = document.getElementById("carrito-container");
let insertUser = document.getElementById("user-profile");

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



















let adminLog = JSON.parse(localStorage.getItem("adminLogin"));
let navLogin = document.getElementById("nav-login");

if (adminLog.admin) {
  insertUser.innerHTML = `
                <p id="user-name" style="margin: 0">Hola, Administrador</p>
                <img src="../images/adminUser.png" id="user-pic">
                `;
  navLogin.innerText = "Cerrar Sesión";
  login.innerHTML = "";
  login.innerHTML = `
  <h1>Hola, admin</h1>
  <button type="submit" class="btn btn-outline-secondary" id="btn-unlog">Cerrar Sesión</button>
  `;
  let btnUnlog = document.getElementById("btn-unlog");
  btnUnlog.onclick = (e) => {
    e.preventDefault();
    adminLog.admin = false;
    localStorage.setItem("adminLogin", JSON.stringify(adminLog));
    Swal.fire({
      position: "med",
      icon: "success",
      title: "Cerrando Sesion...",
      showConfirmButton: false,
      timer: 2000,
    });
    setTimeout(function () {
      window.location.reload();
    }, 2125);
  };
} else {
  const crearUsuario = () => {
    let nombreUser = JSON.parse(sessionStorage.getItem("nombreUser"));
    let apellidoUser = JSON.parse(sessionStorage.getItem("apellidoUser"));
    let fotoUser = JSON.parse(sessionStorage.getItem("fotoUser"));
    insertUser.innerHTML = `
                <p id="user-name" style="margin:0">Hola, ${nombreUser} ${apellidoUser}</p>
                <img src="${fotoUser}" id="user-pic">
                `;
  };
  if (sessionStorage.getItem("nombreUser") != null) {
    crearUsuario();
  } else {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((resultado) => {
        let apiNombre = resultado.results[0].name.first;
        let apiApellido = resultado.results[0].name.last;
        let apiFoto = resultado.results[0].picture.medium;
        sessionStorage.setItem("nombreUser", JSON.stringify(apiNombre));
        sessionStorage.setItem("apellidoUser", JSON.stringify(apiApellido));
        sessionStorage.setItem("fotoUser", JSON.stringify(apiFoto));
        insertUser.innerHTML = `
                <p id="user-name" style="margin: 0">Hola, ${apiNombre} ${apiApellido}</p>
                <img src="${apiFoto}" id="user-pic">
                `;
      })
      .catch(
        (error) => console.log(error),
        (insertUser.innerHTML = `
            <p id="user-name">Cargando usuario...</p>
            <img src="./assets/img/default-user-img.png" id="user-pic">
            `)
      );
  }
}