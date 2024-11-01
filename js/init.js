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


document.addEventListener('DOMContentLoaded', function() {
  const toggleThemeBtn = document.getElementById('toggle-theme');
  const currentTheme = localStorage.getItem('theme') || 'day';  // Verificar el tema guardado o usar 'day' por defecto

  // Aplicar el tema guardado al cargar la página
  if (currentTheme === 'night') {
      document.body.classList.add('night-mode');
      if (toggleThemeBtn) {
          toggleThemeBtn.textContent = 'Modo Día';
      }
  }

  // Si hay un botón de alternancia de tema en la página
  if (toggleThemeBtn) {
      // Escuchar el clic en el botón para alternar el tema
      toggleThemeBtn.addEventListener('click', function() {
          document.body.classList.toggle('night-mode');

          if (document.body.classList.contains('night-mode')) {
              localStorage.setItem('theme', 'night');  // Guardar preferencia en localStorage
              toggleThemeBtn.textContent = 'Modo Día';  // Cambiar el texto del botón
          } else {
              localStorage.setItem('theme', 'day');
              toggleThemeBtn.textContent = 'Modo Noche';
          }
      });
  }
});

// cart.js

// Función para inicializar el carrito en localStorage si está vacío
function initializeCart() {
  if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
      console.log("Carrito inicializado en localStorage.");
  } else {
      console.log("Carrito ya existente en localStorage:", JSON.parse(localStorage.getItem('cart')));
  }
}

// Función para actualizar el contador de productos en el carrito
function updateCartCount() {
  initializeCart(); // Asegurarse de que el carrito esté inicializado
  
  // Obtener el carrito desde localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  console.log("Contenido actual del carrito:", cart);
  
  // Calcular la cantidad total de productos en el carrito
  const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
  console.log("Cantidad total de productos en el carrito:", cartCount);
  
  // Seleccionar el elemento del contador y actualizar el texto
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
      cartCountElement.innerText = cartCount;
      console.log("Contador de carrito actualizado a:", cartCount);
  } else {
      console.log("Elemento #cart-count no encontrado en la página.");
  }
}

// Llamar a updateCartCount al cargar cada página
document.addEventListener('DOMContentLoaded', updateCartCount);