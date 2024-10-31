/* JSON ANTERIOR

// Comenzamos a hacer uso de fetch para importar y mostrar los productos 

document.addEventListener("DOMContentLoaded", function() {   //document.addEventListener[...] hace que el código no se ejecute hasta que la página html se haya cargado 

    const jsonUrl='https://japceibal.github.io/emercado-api/cats_products/101.json' //este código contiene la URL (donde está el JSON) donde vamos a hacr la solicitud y obtener los datos 
  
     
    fetch(jsonUrl) //Este código va a iniciar una solicitud para obtener los datos de la URL de jsonUrl 
     .then(response => { //Completada la solicitud, fetch nos da una "response"(respuesta) y si esta está correcta .then se ejecuta 
       if(!response.ok) {  
         throw new Error ('Error al obtener los datos del JSON') //si la solicitud no funciona, se muestra un mensaje de error 
       } 
       return response.json(); //Si la respuesta es exitosa, esta se convierte en un objeto JSOn que podemos utilizar en el código (un objeto JSOn en una forma de organizar datos de texto de forma que los programas puedan leerlo fácilmente) 
     }) 
  
    .then(data => { 
      mostrarProductos(data.products); 
    }) //Luego de que seconvierte la respuesta en un objeto JSOn (que ahora lo indicamos como "data"), usamos "mostrarProductos" para que estos se muestren en la página 
  
    .catch(error => { 
      console.error('Problema con la petición fetch', error); // 
    }); //Si algo falla en cualquier parte del código, se va a mostrar un mensaje de error. 
  
    
    //Acá vamos a hacer una función para que se muestren los productos 
  
    function mostrarProductos(productos){ 
      const tbody = document.querySelector('tbody'); //Nos seleciona el elemento "<tbody>" en el html 
      productos.forEach(producto => { 
        const fila = document.createElement('tr'); //Este código nos va a crear una fila por cada producto 
  
        //Ahora procedemos a crear las celdas para cada uno de los datos del producto 
        const celdaImagen = document.createElement('td'); 
        celdaImagen.setAttribute('data-label', 'Imagen');
        const img = document.createElement('img'); 
        img.src = producto.image; //Esta es la URL de la imagen del producto 
        img.alt = producto.name; //Nos proporciona una descripción textual para la imágen salida de acá, por ejemplo: <img src="imagen.jpg" alt="Descripción de la imagen"> 
        img.width = 100; //Es para el ancho de la imágen, sino se ve muy grande
        celdaImagen.appendChild(img); //Hace que la imégen quede como un hijo de la celdaImagen(es decir que agrega la imagen a la celda de la tabla)
  
        const celdaNombre = document.createElement('td'); //Crea una celda td
        celdaNombre.setAttribute('data-label', 'Nombre');
        celdaNombre.textContent = producto.name; //pone el nombre del producto adentro de la celda de la tabla
  
        const celdaDescripcion = document.createElement('td');
        celdaDescripcion.setAttribute('data-label', 'Descripción');
        celdaDescripcion.textContent = producto.description; //crea una celda para la descripción del producto y le asigna el texto que aparece en la descripción 
  
        const celdaPrecio = document.createElement('td');
        celdaPrecio.setAttribute('data-label', 'Precio');
        celdaPrecio.textContent = `${producto.currency} ${producto.cost}`; //crea una celda para los precios del producto y le asigna el texto correspondiente (el precio)
  
        const celdaCantidadVendidos = document.createElement('td');
        celdaCantidadVendidos.textContent = producto.soldCount; //crea una celda para la cantidad de productos vendidos y le asigna su texto correspondiene (cantidad de vendidos)
  
        // Agrega las celdas a la fila
        fila.appendChild(celdaImagen); //agrega la celda de imágenes a la fila
        fila.appendChild(celdaNombre); //agrega la celda de nombres a la fila
        fila.appendChild(celdaDescripcion); //agrega la celda de descripción a la fila
        fila.appendChild(celdaPrecio); //agrega la celda de precios a la fila
        fila.appendChild(celdaCantidadVendidos); //Y agrega la celda de cantidad de vendidos a la fila
  
        // Agrega la fila al cuerpo de la tabla
        tbody.appendChild(fila); //esta básicamente agrega toda la fila con cada uno de sus componentes a la tabla "tbody" para que se muestren los productos (En mi rama tuve que aagregarle  products.html la tambla y su tbody para que me mostrara)
    });
  }
})

FIN DE CODIGO JSON ANTERIOR */




/* comentado por lu.b para que ahora nos guarde el id del producto cuando hago click en el nombre del producto
// JSON NUEVA TABLA

document.addEventListener('DOMContentLoaded', function() {
// Obtén el catID del localStorage
const catID = localStorage.getItem('catID');
// Verifica si catID está disponible
if (catID) {
  const url =  `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`; // URL del JSON
  fetch(url)
      .then(response => response.json()) // Convierte la respuesta a JSON
      .then(data => {

    // Función para aplicar filtros y ordenación
    const applyFiltersAndSorting = () => {
        const minPrice = parseFloat(document.getElementById('rangeFilterCountMin').value) || 0;
        const maxPrice = parseFloat(document.getElementById('rangeFilterCountMax').value) || Infinity;
        const sortOrder = document.getElementById('sortSelect').value;

        // Filtra los productos
        const filteredProducts = data.products.filter(product =>
          product.cost >= minPrice && product.cost <= maxPrice
        );

        // Ordena los productos
        const sortedProducts = filteredProducts.sort((a, b) => {
          if (sortOrder === '2') { // Precio ascendente
            return a.cost - b.cost;
          } else if (sortOrder === '3') { // Precio descendente
            return b.cost - a.cost;
          } else { // Relevancia (artículos vendidos descendentes)
            return b.soldCount - a.soldCount;
          }
        });
          const container = document.getElementById('products-container'); // Selecciona el contenedor
          container.innerHTML = ''; // Limpiar el contenedor actual

          // Añade los productos filtrados y ordenados al contenedor
          sortedProducts.forEach(product => {
          const productHTML = `
                  <div class="row justify-content-center mb-3">
                      <div class="col-md-12">
                          <div class="card shadow-0 border rounded-3">
                              <div class="card-body">
                                  <div class="row g-0">
                                      <div class="col-xl-3 col-md-4 d-flex justify-content-center">
                                          <div class="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                                              <img src="${product.image}" class="w-100" alt="${product.name}" />
                                              <a href="#!">
                                                  <div class="hover-overlay">
                                                      <div class="mask" style="background-color: rgba(253, 253, 253, 0.15);"></div>
                                                  </div>
                                              </a>
                                          </div>
                                      </div>
                                      <div class="col-xl-6 col-md-5 col-sm-7">
                                          <h5>${product.name}</h5>
                                          <div class="d-flex flex-row">
                                              <div class="text-warning mb-1 me-2">
                                                  <span class="ms-1"></span>
                                              </div>
                                              <span class="text-muted">${product.soldCount} vendidos</span>
                                          </div>
                                          <p class="text mb-4 mb-md-0">${product.description}</p>
                                      </div>
                                      <div class="col-xl-3 col-md-3 col-sm-5">
                                          <div class="d-flex flex-row align-items-center mb-1">
                                              <h4 class="mb-1 me-1">USD ${product.cost}</h4>
                                          </div>
                                          <div class="mt-4">
                                              <button class="btn btn-primary shadow-0" type="button">Comprar</button>
                                              <a href="#!" class="btn btn-light border px-2 pt-2 icon-hover">
                                                  <i class="fas fa-heart fa-lg px-1"></i>
                                              </a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              `;
              container.innerHTML += productHTML; // Añade el HTML generado al contenedor
          });
      };
      // Aplica filtros y ordenación al cargar
      applyFiltersAndSorting();

      // Maneja los eventos
      document.getElementById('rangeFilterCount').addEventListener('click', applyFiltersAndSorting);
      document.getElementById('clearRangeFilter').addEventListener('click', function() {
        document.getElementById('rangeFilterCountMin').value = '';
        document.getElementById('rangeFilterCountMax').value = '';
        applyFiltersAndSorting();
      });
      document.getElementById('sortSelect').addEventListener('change', applyFiltersAndSorting);
    })
      
      .catch(error => console.error('Error fetching the data:', error)); // Manejo de errores
    } else {
        console.error('catID no encontrado en localStorage');
    }
}); 
*/



//Nuevo código que se le agrega al que teniamos, ahora cuando se hace click en el nombre del producto
//se guarda el id del producto además del de la categoría y te redirije a product-info.html
document.addEventListener('DOMContentLoaded', function() {
    const catID = localStorage.getItem('catID');
    if (catID) {
        const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('products-container');
                const products = data.products;

                // Función para mostrar productos
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        container.innerHTML += productHTML;
                    });

                    // Agregar el event listener para los clics en productos
                    document.querySelectorAll('.product-clickable').forEach(item => {
                        item.addEventListener('click', function() {
                            const selectedProductID = this.getAttribute('data-product-id');
                            localStorage.setItem('selectedProductID', selectedProductID);
                            window.location.href = 'product-info.html';
                        });
                    });
                }

                // Función para aplicar filtros y ordenación
                function applyFiltersAndSorting() {
                    const minPrice = parseFloat(document.getElementById('rangeFilterCountMin').value) || 0;
                    const maxPrice = parseFloat(document.getElementById('rangeFilterCountMax').value) || Infinity;
                    const sortOrder = document.getElementById('sortSelect').value;

                    // Filtrar productos
                    const filteredProducts = products.filter(product =>
                        product.cost >= minPrice && product.cost <= maxPrice
                    );

                    // Ordenar productos
                    const sortedProducts = filteredProducts.sort((a, b) => {
                        if (sortOrder === '2') { // Precio ascendente
                            return a.cost - b.cost;
                        } else if (sortOrder === '3') { // Precio descendente
                            return b.cost - a.cost;
                        } else { // Relevancia (vendidos descendentes)
                            return b.soldCount - a.soldCount;
                        }
                    });

                    // Mostrar productos
                    displayItems(sortedProducts);
                }

                // Mostrar productos inicialmente
                displayItems(products);

                // Configurar eventos
                document.getElementById('searchBar').addEventListener('keyup', (e) => {
                    const searchData = e.target.value.toLowerCase();
                    const filteredData = products.filter(item => item.name.toLowerCase().includes(searchData));
                    displayItems(filteredData);
                });

                document.getElementById('rangeFilterCount').addEventListener('click', applyFiltersAndSorting);
                document.getElementById('clearRangeFilter').addEventListener('click', function() {
                    document.getElementById('rangeFilterCountMin').value = '';
                    document.getElementById('rangeFilterCountMax').value = '';
                    applyFiltersAndSorting();
                });
                document.getElementById('sortSelect').addEventListener('change', applyFiltersAndSorting);

            })
            .catch(error => console.error('Error fetching the data:', error));
    } else {
        console.error('catID no encontrado en localStorage');
    }
});

//CARRITO
// Agrega un listener a cada botón de comprar
document.addEventListener('click', function(event) {
    if (event.target && event.target.matches('.btn-primary')) {
        const productElement = event.target.closest('.row');
        const product = {
            id: productElement.querySelector('.product-clickable').getAttribute('data-product-id'),
            name: productElement.querySelector('h5').innerText,
            cost: parseFloat(productElement.querySelector('h4').innerText.replace('USD ', '')),
            currency: 'USD',
            image: productElement.querySelector('img').src,
            quantity: 1
        };

        // Obtener el carrito actual de localStorage o inicializar uno vacío
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Verificar si el producto ya está en el carrito y actualizar cantidad
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push(product);
        }

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
});
