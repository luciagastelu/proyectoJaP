function displayItems(items) {
    container.innerHTML = '';
    items.forEach(product => {
        const productHTML = `
            <div class="row justify-content-center mb-3">
                <div class="col-md-12">
                    <div class="card shadow-0 border rounded-3">
                        <div class="card-body">
                            <div class="row g-0">
                                <div class="col-xl-3 col-md-4 d-flex justify-content-center">
                                    <div class="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                                        <img src="${product.image}" class="w-100" alt="${product.name}" />
                                    </div>
                                </div>
                                <div class="col-xl-6 col-md-5 col-sm-7">
                                    <h5 class="product-clickable" data-product-id="${product.id}" style="cursor:pointer;">${product.name}</h5>
                                    <div class="d-flex flex-row">
                                        <span class="text-muted">${product.soldCount} vendidos</span>
                                    </div>
                                    <p class="text mb-4 mb-md-0">${product.description}</p>
                                </div>
                                <div class="col-xl-3 col-md-3 col-sm-5">
                                    <div class="d-flex flex-row align-items-center mb-1">
                                        <h4 class="mb-1 me-1">USD ${product.cost}</h4>
                                    </div>
                                    <div class="mt-4">
                                        <a href="cart.html" class="btn btn-light border px-2 pt-2 icon-hover"> <i class="fas fa-heart fa-lg px-1"></i> <button class="btn btn-primary shadow-0" type="button">Comprar</button></a>
                                    </div>
                                    <div class="col-3">
                    <button class="btn btn-danger btn-sm remove-btn" data-index="${index}">Eliminar</button>
                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += productHTML;
    });
    }
    //cARRITO
    function displayCart() {
        const cartContainer = document.getElementById('cart-container');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let subtotal = 0;
    
        // Si el carrito está vacío, mostrar un mensaje
        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="alert alert-info text-center empty-cart">
                    <h4 class="alert-heading">Tu carrito está vacío</h4>
                    <p>¡Añade productos para comenzar a comprar!</p>
                </div>
            `;
            //ocultar la sección del subtotal y botón de compra
        document.querySelector('.cart-total').style.display = 'none'; // Oculta el subtotal y botón de compra
            return;
            return;
        }
    
        // Limpiar contenido del contenedor
        cartContainer.innerHTML = '';
    
        // Mostrar cada producto en el carrito
        cart.forEach((product, index) => {
            const itemSubtotal = product.cost * product.quantity;
            subtotal += itemSubtotal;
    
            const productHTML = `
                <div class="cart-item">
        <img src="${product.image}" alt="${product.name}" class="product-image" />
        
        <div class="product-info">
            <h5 class="product-name">${product.name}</h5>
            <div class="product-quantity">
                <label>Cantidad:
                    <input type="number" value="${product.quantity}" min="1" data-product-id="${product.id}" class="quantity-input" style="width: 50px;" color="gray" />
                </label>
            </div>
        </div>

        <div class="product-price-info">
            <p class="product-price">${product.currency} ${product.cost}</p>
            <p class="product-subtotal">Subtotal: ${product.currency} ${itemSubtotal}</p>
            <span class="remove-btn" data-index="${index}">Eliminar</span>
        </div>
    </div>
            `;
            cartContainer.innerHTML += productHTML;
        });
    
        // Mostrar el subtotal general
    document.querySelector('.subtotal').innerText = `USD ${subtotal}`;

    // Configurar los eventos de "Eliminar" nuevamente después de renderizar el carrito
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

// Actualizar la cantidad del producto y recalcular el subtotal
document.getElementById('cart-container').addEventListener('change', function(event) {
    if (event.target && event.target.matches('.quantity-input')) {
        const productId = event.target.getAttribute('data-product-id');
        const newQuantity = parseInt(event.target.value);
        const cart = JSON.parse(localStorage.getItem('cart'));

        const product = cart.find(item => item.id === productId);
        if (product) {
            product.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        }
    }
});

// Función para eliminar producto
function removeItem(event) {
    const index = event.target.dataset.index;

    const items = JSON.parse(localStorage.getItem('cart')) || [];
    items.splice(index, 1); // Eliminar producto del array

    localStorage.setItem('cart', JSON.stringify(items)); 
    displayCart(); 
}

// Llamar a displayCart al cargar la página
document.addEventListener('DOMContentLoaded', displayCart);

//Agregar para que cambie de USD a $
// Función para convertir de USD a $
function convertToPESOS(usdAmount) {
    const exchangeRate = 40; // Tipo de cambio de USD a $
    return usdAmount * exchangeRate;
}

function displayItems(items) {
    container.innerHTML = '';
    items.forEach(product => {
        const priceInCOP = convertToPESOS(product.cost).toLocaleString(); // Convertir a $ y formatear con separador de miles
        const productHTML = `
            <div class="row justify-content-center mb-3">
                <div class="col-md-12">
                    <div class="card shadow-0 border rounded-3">
                        <div class="card-body">
                            <div class="row g-0">
                                <div class="col-xl-3 col-md-4 d-flex justify-content-center">
                                    <div class="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                                        <img src="${product.image}" class="w-100" alt="${product.name}" />
                                    </div>
                                </div>
                                <div class="col-xl-6 col-md-5 col-sm-7">
                                    <h5 class="product-clickable" data-product-id="${product.id}" style="cursor:pointer;">${product.name}</h5>
                                    <div class="d-flex flex-row">
                                        <span class="text-muted">${product.soldCount} vendidos</span>
                                    </div>
                                    <p class="text mb-4 mb-md-0">${product.description}</p>
                                </div>
                                <div class="col-xl-3 col-md-3 col-sm-5">
                                    <div class="d-flex flex-row align-items-center mb-1">
                                        <h4 class="mb-1 me-1">$ ${priceInPESOS}</h4>
                                    </div>
                                    <div class="mt-4">
                                        <a href="cart.html" class="btn btn-light border px-2 pt-2 icon-hover"> <i class="fas fa-heart fa-lg px-1"></i> <button class="btn btn-primary shadow-0" type="button">Comprar</button></a>
                                    </div>
                                    <div class="col-3">
                                        <button class="btn btn-danger btn-sm remove-btn" data-index="${index}">Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += productHTML;
    });
}

function displayCart() {
    const cartContainer = document.getElementById('cart-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;

    // Si el carrito está vacío, mostramos un mensaje
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="alert alert-info text-center empty-cart">
                <h4 class="alert-heading">Tu carrito está vacío</h4>
                <p>¡Añade productos para comenzar a comprar!</p>
            </div>
        `;
        document.querySelector('.cart-total').style.display = 'none';
        return;
    }

    // Limpiamos el contenido del contenedor
    cartContainer.innerHTML = '';

    // Mostramos cada producto en el carrito
    cart.forEach((product, index) => {
        const priceInPESOS = convertToPESOS(product.cost);
        const itemSubtotal = priceInPESOS * product.quantity;
        subtotal += itemSubtotal;

        const productHTML = `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}" class="product-image" />
                <div class="product-info">
                    <h5 class="product-name">${product.name}</h5>
                    <div class="product-quantity">
                        <label>Cantidad:
                            <input type="number" value="${product.quantity}" min="1" data-product-id="${product.id}" class="quantity-input" style="width: 50px;" color="gray" />
                        </label>
                    </div>
                </div>
                <div class="product-price-info">
                    <p class="product-price">$ ${priceInPESOS.toLocaleString()}</p>
                    <p class="product-subtotal">Subtotal: $ ${itemSubtotal.toLocaleString()}</p>
                    <span class="remove-btn" data-index="${index}">Eliminar</span>
                </div>
            </div>
        `;
        cartContainer.innerHTML += productHTML;
    });

    // Mostramos el subtotal general en PESOS
    document.querySelector('.total').innerText = `$ ${subtotal.toLocaleString()}`;

    // Configuramos los eventos "Eliminar" nuevamente después de renderizar el carrito
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

//Botón siguiete que valida campos de dirección completos
function validateDireccion() {
    // Obtener los valores de los campos de dirección
    const departamento = document.getElementById("departamento").value;
    const localidad = document.getElementById("localidad").value;
    const calle = document.getElementById("calle").value;
    const numero = document.getElementById("numero").value;
    const esquina = document.getElementById("esquina").value;
  
    // Comprobar si todos los campos están completos
    if (departamento && localidad && calle && numero && esquina) {
      return true;  // Todos los campos están completos
    } else {
      alert("Por favor complete todos los campos obligatorios.");
      return false;  // Hay campos vacíos
    }
  }
  document.getElementById("nextButton").addEventListener("click", function () {
    // Validar la dirección
    if (validateDireccion()) {
      // Si es válido, cambiar a la pestaña de "Costos"
      const costosTab = new bootstrap.Tab(document.getElementById('costos-tab'));
      costosTab.show();  // Cambiar a la pestaña "Costos"
    }
  });

//Validaciones al hacer click en finalizar compra
  function validateFinalizarCompra() {
    // Validar forma de envío seleccionada
    const tipoEnvio = document.getElementById("tipoEnvio").value;
    if (!tipoEnvio) {
      alert("Por favor, complete todos los datos obligatorios.");
      return false;
    }
  
    // Validar forma de pago seleccionada
    const formaDePago = document.getElementById("formaDePago").value;
    if (!formaDePago) {
      alert("Por favor, complete todos los datos obligatorios.");
      return false;
    }
  
    return true; // Si pasa todas las validaciones, permite continuar
  }

  document.querySelector(".purchase-btn").addEventListener("click", function(event) {
    // Prevenir la acción predeterminada del botón (si se desea evitar un submit inmediato)
    event.preventDefault();
  
    // Validar los campos
    if (validateFinalizarCompra()) {
      // Si la validación es exitosa, proceder con la compra o el siguiente paso
      alert("Felicidades! Sólo resta esperar que llegue tú compra.");
     
    }
  });

  // Desactivar la pestaña Costos
  document.getElementById('costos-tab').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el cambio de pestaña si no ha pasado por la validación
  });

  // Activar la pestaña Costos al hacer clic en el botón "Siguiente"
  document.getElementById('nextButton').addEventListener('click', function() {
    // Validación de los campos de la dirección
    const departamento = document.getElementById('departamento').value;
    const localidad = document.getElementById('localidad').value;
    const calle = document.getElementById('calle').value;
    const numero = document.getElementById('numero').value;
    const esquina = document.getElementById('esquina').value;

    if (departamento && localidad && calle && numero && esquina) {
      // Si todos los campos están completos, permitir cambiar a la pestaña "Costos"
      const costosTab = document.getElementById('costos-tab');
      costosTab.classList.remove('disabled');
      costosTab.removeAttribute('disabled');
      
      // Cambiar a la pestaña "Costos"
      const costosTabElement = new bootstrap.Tab(costosTab);
      costosTabElement.show();
    } else {
      alert('Por favor, complete todos los campos obligatorios.');
    }
  });

