
// POR FAVOR poner las alertas de success y de error; mi parte depende de las alertas tambien 

function validarForm(){
    const username = document.getElementById("usuario").value;
    const password = document.getElementById("contraseña").value;
    // Revisa que los campos no estan vacios
    if (username === "" || password === "") {
        //Mostrar el error
        showAlertError();
    } else { 
        //Guardar la sesión.
        localStorage.setItem('user', JSON.stringify({username: username }));
        // No se si index es la portada
        showAlertSuccess();
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000); 
        //10000 hace que espere 10 segundos así ve el alertsuccess sino lo saco 
        // Lo de windows location etc en lugar de href lo obtuve del punto 4 de la entrega
        //Baje a 2000 porque me pareció que tal vez era media larga la espera
    }
}
function showAlertError(){
    alert("Por favor, completa todos los campos antes de enviar el formulario.");
}

function showAlertSuccess(){
    alert("¡Inicio de sesión exitoso!");
}

//Event listener al botón de ingresar
document.getElementById('regBtn').addEventListener('click', validarForm);
