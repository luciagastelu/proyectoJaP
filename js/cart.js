// Genera y muestra una lista de productos en un contenedor
/*function displayItems(items) {
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
    }*/
    //CARRITO
   // Muestra los elementos del carrito de compras y el subtotal
/*function displayCart() {
    const cartContainer = document.getElementById('cart-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0; //Declara una variable subtotal e inicializa su valor en 0

    // Si el carrito está vacío, muestra un mensaje
    /*if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="alert alert-info text-center empty-cart">
                <h4 class="alert-heading">Tu carrito está vacío</h4>
                <p>¡Añade productos para comenzar a comprar!</p>
            </div>
        `;
        document.querySelector('.cart-total').style.display = 'none';
        return;
    }*/

    // Limpia contenido del contenedor para que se le pueda agregar información nueva
    /*cartContainer.innerHTML = '';

    // Recorre el carrito
    /*cart.forEach((product, index) => {
        const priceInPESOS = convertToPESOS(product.cost);  // Converte el precio del producto a pesos
        const itemSubtotal = priceInPESOS * product.quantity; //Calcula el subtotal para el producto, multiplicando el precio convertido por la cantidad 
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
    });*/

    // Muestra el total en PESOS
    /*document.querySelector('.total').innerText = `$ ${subtotal.toLocaleString()}`;

    // Configura los eventos "Eliminar" para los productos del carrito 
    /*document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', removeItem);
    });*/
//}

// Actualizar la cantidad de un producto en el carrito de compras cuando el usuario 
//cambia el valor del campo de entrada de cantidad
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

// Función para eliminar producto del carrito
function removeItem(event) {
    const index = event.target.dataset.index;

    const items = JSON.parse(localStorage.getItem('cart')) || [];
    items.splice(index, 1); // Eliminar producto del array

    localStorage.setItem('cart', JSON.stringify(items)); 
    displayCart(); 
}

// Llamar a displayCart al cargar la página
document.addEventListener('DOMContentLoaded', displayCart);


// Función para convertir de USD a UYU
function convertToPESOS(usdAmount) {
    const exchangeRate = 40; // Tipo de cambio de USD a UYU
    return usdAmount * exchangeRate;
}

// Genera y muestra una lista de productos en un contenedor
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
// Muestra los elementos del carrito de compras y el subtotal
function displayCart() {
    const cartContainer = document.getElementById('cart-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;//Declara una variable subtotal e inicializa su valor en 0

    // Muestra un mensaje si el carrito esta vacío
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="alert alert-info text-center empty-cart">
                <h4 class="alert-heading">Tu carrito está vacío</h4>
                <p>¡Añade productos para comenzar a comprar!</p>
            </div>
        `;
        document.querySelector('.cart-total').style.display = 'none';

        toggleTabs(cart);
        return;
    }

    // Limpia contenido del contenedor para que se le pueda agregar información 
    //nueva
    cartContainer.innerHTML = '';

    // Recorre el carrito
    cart.forEach((product, index) => {
        const priceInPESOS = convertToPESOS(product.cost);
        const itemSubtotal = priceInPESOS * product.quantity;//Calcula el subtotal 
        //para el producto, multiplicando el precio convertido por la cantidad 
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

    // Muestra el total en pesos
    document.querySelector('.total').innerText = `$ ${subtotal.toLocaleString()}`;

    // Configura los eventos "Eliminar" para los productos del carrito 
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

//Muestra pestañas en función del carrito
function toggleTabs(cart) {
    const costosTab = document.getElementById('costos-tab');
    const direccionTab = document.getElementById('direccion-tab');
    const direccion = document.getElementById('direccion');
    const cartContainer = document.getElementById('cart-container');
    if (cart.length === 0) {
        // Oculta las pestañas si el carrito está vacío
        costosTab.style.display = 'none';
        direccionTab.style.display = 'none';
        direccion.style.display = 'none';

    } else {
        // Muestra las pestañas si el carrito tiene productos
        costosTab.style.display = 'block';
        direccionTab.style.display = 'block';
        direccion.style.display = 'none';
    }
}

//Botón siguiete que valida campos de dirección completos
/*function validateDireccion() {
    // Obtiene los valores de los campos de dirección
    /*const departamento = document.getElementById("departamento").value;
    const localidad = document.getElementById("localidad").value;
    const calle = document.getElementById("calle").value;
    const numero = document.getElementById("numero").value;
    const esquina = document.getElementById("esquina").value;/*
  
    // Comprueba si todos los campos están completos
    if (departamento && localidad && calle && numero && esquina) {
      return true;  // Todos los campos están completos
    } else {
      alert("Por favor complete todos los campos obligatorios.");
      return false;  // Hay campos vacíos
    }
  }
  document.getElementById("nextButton").addEventListener("click", function () {
    // Valida la dirección
   /* if (validateDireccion()) {
      // Si es válido, cambia a la pestaña de "Costos"
      const costosTab = new bootstrap.Tab(document.getElementById('costos-tab'));
      costosTab.show();  // Cambia a la pestaña "Costos"
    }
  });*/
  
// Desactiva la pestaña Costos si no se completo antes la pestaña "Dirección 
  //de envío"
  document.getElementById('costos-tab').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el cambio de pestaña si no ha pasado por la validación
  });

  // Activa la pestaña Costos al hacer clic en el botón "Siguiente"
  document.getElementById('nextButton').addEventListener('click', function() {
    // Validación de los campos de la dirección
    const departamento = document.getElementById('departamento').value;
    const localidad = document.getElementById('localidad').value;
    const calle = document.getElementById('calle').value;
    const numero = document.getElementById('numero').value;
    const esquina = document.getElementById('esquina').value;

    if (departamento && localidad && calle && numero && esquina) {
      // Si todos los campos están completos, permite cambiar a la pestaña "Costos"
      const costosTab = document.getElementById('costos-tab');
      costosTab.classList.remove('disabled');
      costosTab.removeAttribute('disabled');
      
      // Cambia a la pestaña "Costos"
      const costosTabElement = new bootstrap.Tab(costosTab);
      costosTabElement.show();
    } else {
      alert('Por favor, complete todos los campos obligatorios.');
    }
  });

  
// Función para actualizar los costos en la pestaña "Costos"
function updateCosts() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;

    // Calcula el subtotal sumando el costo de todos los productos en el carrito
    cart.forEach(product => {
        const itemSubtotal = convertToPESOS(product.cost) * product.quantity;  // Convertir a pesos
        subtotal += itemSubtotal;
    });

    // Muestra el subtotal en la sección de costos
    document.getElementById('subtotal').innerText = `$ ${subtotal.toLocaleString()}`;

    // Obtiene el tipo de envío seleccionado y calcula el costo de envío
    const tipoEnvio = document.getElementById('tipoEnvio').value;
    let shippingCost = 0;

    if (tipoEnvio === 'premium') {
        shippingCost = subtotal * 0.15;
    } else if (tipoEnvio === 'express') {
        shippingCost = subtotal * 0.07;
    } else if (tipoEnvio === 'standard') {
        shippingCost = subtotal * 0.05;
    }

    // Muestra el costo de envío
    document.getElementById('shippingCost').innerText = `$ ${shippingCost.toLocaleString()}`;

    // Calcula el total
    const totalCost = subtotal + shippingCost;

    // Mostra el total
    document.getElementById('totalCost').innerText = `$ ${totalCost.toLocaleString()}`;
}


// Actualiza los costos cada vez que se cambia el tipo de envío
document.getElementById('tipoEnvio').addEventListener('change', updateCosts);

// Actualiza los costos cuando el carrito se carga o se modifica
document.addEventListener('DOMContentLoaded', updateCosts);
document.getElementById('cart-container').addEventListener('change', function(event) {
    if (event.target && event.target.matches('.quantity-input')) {
        updateCosts();
    }
});

//Validaciones al hacer click en finalizar compra
  function validateFinalizarCompra() {
    // Valida forma de envío seleccionada
    const tipoEnvio = document.getElementById("tipoEnvio").value;
    if (!tipoEnvio) {
      alert("Por favor, complete todos los datos obligatorios.");
      return false;
    }
  
    // Valida forma de pago seleccionada
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
  
    // Valida los campos
    if (validateFinalizarCompra()) {
      // Si la validación es exitosa, proceder con la compra o el siguiente paso
      alert("Felicidades! Sólo resta esperar que llegue tú compra.");
     
    }
  });

  