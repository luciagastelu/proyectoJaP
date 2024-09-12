
document.addEventListener('DOMContentLoaded', function() {
    // Obtenemos del localStorage el ID del producto y el ID de la categoría 
    const selectedProductID = localStorage.getItem('selectedProductID');
    const catID = localStorage.getItem('catID');
    // Verificamos que los dos ID existan 
    if (selectedProductID && catID) {
        // Construimos una URL del JSON en función del ID del producto y una en función del ID de la categoría
        const productUrl = `https://japceibal.github.io/emercado-api/products/${selectedProductID}.json`;
        const categoryUrl = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

        // Realizamos las solicitudes: una para el producto que elegimos y otra saber su categoría
        Promise.all([
            fetch(productUrl).then(response => response.json()),
            fetch(categoryUrl).then(response => response.json())
        ])
        .then(([selectedProduct, categoryData]) => {
            // Encontramos la categoría
            const categoryName = categoryData.catName;
            // Verificamos que los dos ID existan
            if (selectedProduct && categoryName) {
                // Creamos el HTML para mostrar las imágenes del producto en un carrusel
                const images = selectedProduct.images.map((image, index) => `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${image}" class="d-block w-100" alt="${selectedProduct.name}">
                    </div>
                `).join('');

                // Creamos el HTML del producto incluyendo el carrusel para definir como mostrarlo
                const productHTML = `
                    <div class="container mt-5">
                        <div class="card mb-3" style="max-width: 900px;">
                            <div class="row g-0">
                                <!-- Columna para el carrusel de imágenes -->
                                <div class="col-md-4">
                                    <div id="productImagesCarousel" class="carousel slide" data-bs-ride="carousel">
                                        <div class="carousel-inner">
                                            ${images}
                                        </div>
                                        <button class="carousel-control-prev" type="button" data-bs-target="#productImagesCarousel" data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Anterior</span>
                                        </button>
                                        <button class="carousel-control-next" type="button" data-bs-target="#productImagesCarousel" data-bs-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Siguiente</span>
                                        </button>
                                    </div>
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
                                            <p class="card-text mb-0">Categoria: ${categoryName}</p>
                                            <p class="card-text mb-0"><strong>Precio: USD ${selectedProduct.cost}</strong></p>
                                            <a href="#" class="btn btn-primary">Comprar</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                // Agregamos el HTML del producto en el contenedor que va a mostrarlo
                const productsContainer = document.getElementById('products-container');
                productsContainer.innerHTML = productHTML;
            } else {
                console.error('Producto o categoría no encontrados');
            }
        })
        .catch(error => console.error('Error fetching the product or category details:', error));
    } else {
        console.error('No se encontró un selectedProductID o catID en localStorage');
    }
});