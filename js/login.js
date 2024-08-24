
function showAlertError(){
    alert("Por favor, completa todos los campos antes de enviar el formulario.");
}

function showAlertSuccess(){
    alert("¡Inicio de sesión exitoso!");
}

//Event listener al botón de ingresar
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('boton_ingresar').addEventListener('click', validarForm);
});

function validarForm(event){
    // Prevenir el comportamiento por defecto del formulario
    event.preventDefault();
    
    const username = document.getElementById("usuario").value;
    const password = document.getElementById("contraseña").value;

    // Revisa que los campos no estan vacios
    if (username === "" || password === "") {

      function validarForm() {
    const username = document.getElementById("usuario").value;
    const password = document.getElementById("contraseña").value;
    
    // Revisa que los campos no están vacíos
    if (username === "" || password === "") {
        // Mostrar el error
        showAlertError();
    } else { 
        // Guardar la sesión
        localStorage.setItem('user', JSON.stringify({username: username }));
        // Mostrar alerta de éxito
        showAlertSuccess();
        
        // Redirigir después de 2 segundos
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000); 
    }
}

function showAlertError() {
    alert("Por favor, completa todos los campos antes de enviar el formulario.");
}

function showAlertSuccess() {
    alert("¡Inicio de sesión exitoso!");
}

// Event listener al botón de ingresar
document.getElementById('regBtn').addEventListener('click', validarForm);