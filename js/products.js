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
        const img = document.createElement('img'); 
        img.src = producto.image; //Esta es la URL de la imagen del producto 
        img.alt = producto.name; //Nos proporciona una descripción textual para la imágen salida de acá, por ejemplo: <img src="imagen.jpg" alt="Descripción de la imagen"> 
        img.width = 100; //Es para el ancho de la imágen, sino se ve muy grande
        celdaImagen.appendChild(img); //Hace que la imégen quede como un hijo de la celdaImagen(es decir que agrega la imagen a la celda de la tabla)
  
        const celdaNombre = document.createElement('td'); //Crea una celda td
        celdaNombre.textContent = producto.name; //pone el nombre del producto adentro de la celda de la tabla
  
        const celdaDescripcion = document.createElement('td');
        celdaDescripcion.textContent = producto.description; //crea una celda para la descripción del producto y le asigna el texto que aparece en la descripción 
  
        const celdaPrecio = document.createElement('td');
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

