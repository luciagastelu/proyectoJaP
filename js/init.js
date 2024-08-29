const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  
document.getElementById("spinner-wrapper").style.display = "none";}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function verificarAutenticacion() {
    let usuario = localStorage.getItem("userEmail");
    const loginLinkElement = document.getElementById('login-link'); // Selecciona el enlace por su id

    if (usuario === null || usuario === "") { 
        // Si no hay un usuario en el localStorage, redirige a login.html
        window.location.href = "login.html";
        return; // Sale de la función para que no se ejecute el resto del código
    } else {
        // Si hay un usuario en el localStorage, muestra el usuario y ajusta el enlace
        loginLinkElement.textContent = usuario;
        loginLinkElement.href = "#";
    }
}


document.addEventListener('DOMContentLoaded', function () {
  verificarAutenticacion();
})
