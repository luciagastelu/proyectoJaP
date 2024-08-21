
// POR FAVOR poner las alertas de success y de error; mi parte depende de las alertas tambien 

function validarForm(){
    const username = document.getElementById("usuario").value;
    const password = document.getElementById("contraseña").value;
    // Revisa que los campos no estan vacios
    if (username === "" || password === "") {
        //Mostrar el error
        showAlertError();
    } else {
        // No se si index es la portada
        showAlertSuccess();
        setTimeout(() => {
            window.location.href = "index.html";
        }, 10000); 
        //10000 hace que espere 10 segundos así ve el alertsuccess sino lo saco 
        // Lo de windows location etc en lugar de href lo obtuve del punto 4 de la entrega
    }
}