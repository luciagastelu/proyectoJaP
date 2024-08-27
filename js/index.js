//manejar los clicks en las categorías
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    // Verificamos si el usuario está autenticado
    
    
    let usuario = localStorage.getItem("userEmail");

    if (usuario === ""){ //Si no hay un usuario en el localStoragen nos manda a login.html
        window.location.href = "login.html";
        return; //sale de la función para que no se ejecute el resto del código
    }

    const loginLinkElement = document.getElementById('login-link'); 
    // Selecciona el enlace por su id

    if (usuario) { // Si hay un usuario en el localStorage
        // Cambiar el texto del enlace a mostrar el usuario
        loginLinkElement.textContent = usuario;
        loginLinkElement.href = "#";
    } else {
        // Si no hay un usuario en el localStorage, redirige a login.html
        window.location.href = "login.html";
        loginLinkElement.textContent = 'Iniciar Sesión'; 
        // Muestra "Iniciar Sesión" si no hay usuario
    }
});
