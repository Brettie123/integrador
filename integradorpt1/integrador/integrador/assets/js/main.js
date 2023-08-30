
class Producto {
    constructor(nombre, precio, imagen) {
  
      this.nombre = nombre;
      this.precio = precio;
      this.imagen = imagen
    }
  }
  
  let listaProductos = [];

  const nombreProductoInput = document.getElementById('input-NombreP');
  const precioProductoInput = document.getElementById('input-PrecioP');
  const imagenProductoInput = document.getElementById('input-imagenP')
  const btnAgregarProd = document.getElementById('btnAgregarP');
  const productosContainer = document.getElementById('contP');
  
  document.getElementById('form-AgregP').addEventListener('submit', function(event) {
    event.preventDefault();
    AgregarProducto();
  });

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
        { nombre: 'WebShooter"', precio: 80000 , imagen:'https://i.pinimg.com/564x/df/b2/8a/dfb28aa35e860f184557027a1c00305d.jpg'},
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
  let insertUser = document.getElementById("user-profile");
  cargarProductos();
  function AgregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('AlCarrito')) || [];
    carrito.push(producto);
    localStorage.setItem('AlCarrito', JSON.stringify(carrito));
  }

  let SoyAdmin = document.getElementById("vistaAdmin");
  let vistaañadir = document.getElementById("vistaañadir")
  let navLogin = document.getElementById("nav-login");
  let formulario = document.getElementById("form-AgregP");
  let adminLog = JSON.parse(localStorage.getItem("adminLogin"));

  if (adminLog.admin) {
    vistaañadir.innerHTML="Añadir un nuevo Producto"
    SoyAdmin.innerHTML = "";
    navLogin.innerText = "Cerrar Sesión";
    insertUser.innerHTML = `
                  <p id="user-name" style="margin: 0">Hola, Administrador</p>
                  <img src="./assets/images/adminUser.png" id="user-pic">
                  `;
  } else {
    formulario.style.display = "none";
  
    //aca
    const crearUsuario = () => {
      let nombreUser = JSON.parse(sessionStorage.getItem("nombreUser"));
      let apellidoUser = JSON.parse(sessionStorage.getItem("apellidoUser"));
      let fotoUser = JSON.parse(sessionStorage.getItem("fotoUser"));
      insertUser.innerHTML = `
                    <p id="user-name" style="margin: 0">Hola, ${nombreUser} ${apellidoUser}</p>
                    <img src="${fotoUser}" id="user-pic">
                    `;
    };
    if (sessionStorage.getItem("nombreUser") != null) {
      crearUsuario();
    } else {
      fetch("https://randomuser.me/api/")
        .then((response) => response.json())
        .then((resultado) => {
          // manda perfil a sessionStorage
          let apiNombre = resultado.results[0].name.first;
          let apiApellido = resultado.results[0].name.last;
          let apiFoto = resultado.results[0].picture.medium;
          sessionStorage.setItem("nombreUser", JSON.stringify(apiNombre));
          sessionStorage.setItem("apellidoUser", JSON.stringify(apiApellido));
          sessionStorage.setItem("fotoUser", JSON.stringify(apiFoto));
          // generar html con API
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