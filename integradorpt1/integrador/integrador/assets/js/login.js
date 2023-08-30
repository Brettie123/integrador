


/* window.addEventListener("load", function () {
    document.getElementById("loader").classList.toggle("loader2");
  });
   */

  
  let btnLogin = document.getElementById("btnLogin");
  let login = document.getElementById("login");
  let navLogin = document.getElementById("nav-login");
  let insertUser = document.getElementById("user-profile");
  
  const adminLog = JSON.parse(localStorage.getItem("adminLogin")) || {
    admin: false,
  };
  
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


  
  btnLogin.onclick = (e) => {
    let username = document.getElementById("usser").value;
    let password = document.getElementById("password").value;
  
    e.preventDefault();
  
    if (username === "Brettie123" && password === "Wandavision") {
      Swal.fire({
        position: "med",
        icon: "success",
        title: "Ingreso exitoso!!!",
        text: "Redireccionando...",
        showConfirmButton: false,
        timer: 2000,
      });
      adminLog.admin = true;
      console.log(adminLog.admin);
      setTimeout(function () {
        window.location.href = "../../index.html";
      }, 2125);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario o contraseña son incorrectos.",
      });
    }
    localStorage.setItem("adminLogin", JSON.stringify(adminLog));
  };

