
document.addEventListener('DOMContentLoaded', function() {
    // Obtener desde el localStorage el ID del producto y el ID de la categoría 
    const selectedProductID = localStorage.getItem('selectedProductID');
    const catID = localStorage.getItem('catID');

    if (selectedProductID && catID) {
        // Construir la URL del JSON en función del ID de la categoría
        const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

        fetch(url)
        // Conviertir la respuesta a JSON
            .then(response => response.json())  
            .then(data => {
                // Datos de la categoría
                const category = data;  
                // Buscar el producto que fue seleccionado en el arreglo de productos
                const selectedProduct = category.products.find(product => product.id == selectedProductID);

                if (selectedProduct) {
                    // Mostrar el nombre y la descripción de la categoría
                    document.getElementById('categoryName').innerText = category.catName;
                    document.getElementById('categoryDescription').innerText = category.description;

                    // Crear el HTML para mostrar los detalles del producto que fue seleccionado
                    const productHTML = `
                       <div class="container mt-5">
                         <div class="card mb-3" style="max-width: 900px;">
                        <div class="row g-0">
                    <!-- Columna para la imagen -->
                        <div class="col-md-4">
                        <img src="${selectedProduct.image}" class="img-fluid card-img rounded-start" alt="${selectedProduct.name}">
                        </div>
                    <!-- Columna para el contenido -->
                        <div class="col-md-8">
                        <div class="card-body d-flex flex-column">
                    <!-- Título -->
                        <h1 class="card-title">${selectedProduct.name}</h1>
                    <!-- Descripción -->
                        <p class="card-text">${selectedProduct.description}</p>
                        <br>
                    <!-- Contenedor para el precio y botón Comprar -->
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <p class="card-text mb-0">Categoria: ${category.catName}</p>
                            <p class="card-text mb-0"><strong>Precio: USD ${selectedProduct.cost}</strong></p>
                            <a href="#" class="btn btn-primary">Comprar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
                    `;

// Insertar el HTML del producto en el contenedor
    const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = productHTML;
    } else {
        console.error('Producto no encontrado');
    }
 })
         .catch(error => console.error('Error fetching the product details:', error));
    } else {
         console.error('No se encontró un selectedProductID o catID en localStorage');
    }
});





