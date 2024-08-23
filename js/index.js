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
});

document.addEventListener("DOMContentLoaded", function(){ //Verificamos si el usuario está autenticado
    let usuario = localStorage.getItem("user");
    if (usuario === null){ //Si no hay un usuario en el localStoragen nos manda a login.html
        window.location.href = "login.html";
        return; //sale de la función para que no se ejecute el resto del código
    }
})
