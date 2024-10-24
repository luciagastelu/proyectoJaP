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