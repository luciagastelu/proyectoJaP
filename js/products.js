// Comenzamos a hacer uso de fetch para importar y mostrar los productos
  
document.addEventListener("DOMcontentLoaded", function() { //document.addEventListener[...] hace que el código no se ejecute hasta que la página html se haya cargado
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
      const celdaImagen = document.create.Element('td');
      const img = document.createElement('img');
      img.src = producto.image; //Esta es la URL de la imagen del producto
      img.alt = producto.name; //Nos proporciona una descripción textual para la imágen salida de acá, por ejemplo: <img src="imagen.jpg" alt="Descripción de la imagen">
    })
  }
  
})
