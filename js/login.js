function showAlertError(){
    alert("Por favor, completa todos los campos antes de enviar el formulario.");
}

function showAlertSuccess(){
    alert("¡Inicio de sesión exitoso!");
}

//Event listener al botón de ingresar
document.getElementById('regBtn').addEventListener('click', validarForm);

function validarForm(){
    const username = document.getElementById("usuario").value;
    const password = document.getElementById("contraseña").value;
    // Revisa que los campos no estan vacios
    if (username === "" || password === "") {
        //Mostrar el error
        showAlertError();
    } else {
        showAlertSuccess();
        setTimeout(() => {
            window.location.href = "index.html";
        }, 10000); 
        //10000 hace que espere 10 segundos así ve el alertsuccess, sino lo saco 
    }
}