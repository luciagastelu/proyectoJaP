let selectedProductID;

document.addEventListener('DOMContentLoaded', function() {
    // Obtenemos del localStorage el ID del producto y el ID de la categoría
    const selectedProductID = localStorage.getItem('selectedProductID');
    const catID = localStorage.getItem('catID');

    // Verificamos que los dos ID existan
    if (selectedProductID && catID) {
    // Construimos una URL del JSON en función del ID del producto y otra en función del ID de la categoría
    const productUrl = `https://japceibal.github.io/emercado-api/products/${selectedProductID}.json`;
    const categoryUrl = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

    // Realizamos las solicitudes: una para el producto que elegimos y otra para obtener la categoría
    Promise.all([
        fetch(productUrl).then(response => response.json()),
        fetch(categoryUrl).then(response => response.json())
    ])
        .then(([selectedProduct, categoryData]) => {
    // Verificamos que el producto y la categoría existan
        if (selectedProduct && categoryData) {
            const categoryName = categoryData.catName;

    // Mostramos el producto actual que seleccionamos
        displayProduct(selectedProduct, categoryName);

    // Filtramos los productos con el mismos ID de la categoría(menos el producto actual)
        const relatedProducts = categoryData.products.filter(product => product.id != selectedProductID);

    // Mostramos los productos con el mismo ID de la categoría
        displayRelatedProducts(relatedProducts);
    // Solicitar comentarios aquí después de mostrar el producto
    const commentURL = `https://japceibal.github.io/emercado-api/products_comments/${selectedProductID}.json`; // Usar el ID correcto

    // Solicitud de API
    fetch(commentURL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }
        return response.json();
    })
    .then(data => {
        mostrarComentarios(data);
    })
    .catch(error => {
        console.error("Error al obtener los comentarios:", error);
    });
} else {
    console.error('Producto o categoría no encontrados');
}
})
.catch(error => console.error('Error fetching the product or category details:', error));
} else {
console.error('No se encontró un selectedProductID o catID en localStorage');
}


    // Función para mostrar el producto actual
        function displayProduct(selectedProduct, categoryName) {
          const images = selectedProduct.images.map((image, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${image}" class="d-block w-100" alt="${selectedProduct.name}">
            </div>
        `).join('');

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

        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = productHTML;
    }

    // Función para mostrar otros productos con el mismo ID de la categoría
        function displayRelatedProducts(relatedProducts) {
          const relatedProductsContainer = document.getElementById('related-products-container');
          relatedProductsContainer.innerHTML = ''; 
          relatedProducts.forEach(product => {
            const relatedProductHTML = `
                <div class="col-md-3 col-sm-6 mb-4">
                    <div class="card h-100 text-center related-product" data-product-id="${product.id}">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                        </div>
                    </div>
                </div>
            `;
    
          relatedProductsContainer.innerHTML += relatedProductHTML;
        });
    
    // Agregamos para que al hacer click nos muestre los datos del producto que seleccionamos
        document.querySelectorAll('.related-product').forEach(productCard => {
            productCard.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                localStorage.setItem('selectedProductID', productId); 
                window.location.href = 'product-info.html'; 
            });
        });
    
    }
});


const allStar = document.querySelectorAll('.rating .star')

allStar.forEach((item, idx)=> {
    item.addEventListener('click', function () {
        let click = 0
        allStar.forEach(i=> {
            i.classList.replace('bxs-star', 'bx-star')
            i.classList.remove('active')
        })
        for(let i=0; i<allStar.length; i++) {
            if(i <=idx) {
                allStar[i].classList.replace('bx-star', 'bxs-star')
                allStar[i].classList.add('active')
            } else {
                allStar[i].style.setProperty('--i', click)
            }
        }
    })
})

// Función para mostrar comentarios
function mostrarComentarios(comentarios) {
    const commentSection = document.getElementById("comment-section");
    commentSection.innerHTML = "";

    // Verifica si hay comentarios para mostrar
    if (comentarios.length === 0) {
        commentSection.innerHTML = "<p>No hay comentarios disponibles.</p>";
        return;
    }

    comentarios.forEach(comentario => {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comentario");

        // Calificación, Usuario, Comentario y Fecha
        const estrellas = Array.from({ length: 5 }, (_, index) => 
            `<i class='bx ${index < comentario.score ? 'bxs-star' : 'bx-star'}'></i>` // Aquí generamos las estrellas
        ).join(''); 
        const usuario = `<strong>${comentario.user}</strong>`;
        const fecha = `<em>${comentario.dateTime}</em>`;
        const textoComentario = `<p>${comentario.description}</p>`;

        commentElement.innerHTML = `
            <div class="calificacion">${estrellas}</div>
            <div class="usuario">${usuario}</div>
            <div class="fecha">${fecha}</div>
            <div class="texto-comentario">${textoComentario}</div>
        `;

        // Añadir el comentario al contenedor
        commentSection.appendChild(commentElement);
    });
}
