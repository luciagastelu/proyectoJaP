document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('profileForm');
    const modoNocheSwitch = document.getElementById('modoNoche');

    // Verificar si el usuario está logueado
    if (!localStorage.getItem('userEmail')) {
        alert('Debe iniciar sesión para acceder a esta página');
        window.location.href = 'login.html'; // Redirigir a la página de login
        return;
    }

    // Cargar los datos del perfil si existen
    loadProfileData();

    // Manejar el envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            saveProfileData(); // Guardamos los datos cuando se guarda el formulario
            alert('Datos guardados correctamente');
        }
    });

    // Manejar el cambio de modo noche/día
    modoNocheSwitch.addEventListener('change', function() {
        document.body.classList.toggle('night-mode');
    });

    // Cargar el estado del modo noche al cargar la página
    if (localStorage.getItem('nightMode') === 'true') {
        modoNocheSwitch.checked = true;
        document.body.classList.add('night-mode');
    }
});

// Función para cargar los datos del perfil desde localStorage
function loadProfileData() {
    const profileData = JSON.parse(localStorage.getItem('profileData')); // Cargamos los datos del localStorage
    if (profileData) {
        // Cargamos los campos con los datos del perfil
        document.getElementById('nombre').value = profileData.nombre || '';
        document.getElementById('segundoNombre').value = profileData.segundoNombre || '';
        document.getElementById('apellido').value = profileData.apellido || '';
        document.getElementById('segundoApellido').value = profileData.segundoApellido || '';
        document.getElementById('email').value = profileData.email || '';
        document.getElementById('telefono').value = profileData.telefono || '';
        document.getElementById('avatar-img').src = profileData.avatar || ''; // Cargar la imagen del avatar si está disponible

        // Actualizar el nombre completo en la interfaz de usuario
        const nombreCompleto = `${profileData.nombre} ${profileData.apellido}`;
        document.getElementById('nombre-usuario').textContent = nombreCompleto;
    }

    // Cargar el estado del modo noche
    const nightMode = localStorage.getItem('nightMode');
    if (nightMode === 'true') {
        document.getElementById('modoNoche').checked = true;
        document.body.classList.add('night-mode');
    }
}

// Función para guardar los datos del perfil en localStorage
function saveProfileData() {
    const profileData = {
        nombre: document.getElementById('nombre').value,
        segundoNombre: document.getElementById('segundoNombre').value,
        apellido: document.getElementById('apellido').value,
        segundoApellido: document.getElementById('segundoApellido').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        avatar: document.getElementById('avatar-img').src // Guardamos también la imagen del avatar
    };

    localStorage.setItem('profileData', JSON.stringify(profileData)); // Guardamos los datos del perfil
    localStorage.setItem('nightMode', document.getElementById('modoNoche').checked); // Guardamos el estado del modo noche
}

// Validar que los campos obligatorios estén completos
function validateForm() {
    const requiredFields = ['nombre', 'apellido', 'email'];
    for (let field of requiredFields) {
        if (!document.getElementById(field).value) {
            alert(`El campo ${field} es obligatorio`);
            return false;
        }
    }
    return true;
}

// Para actualizar la imagen del avatar y guardarla en localStorage
const avatarInput = document.getElementById('avatar-input');
avatarInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = function() {
        const avatarImg = document.getElementById('avatar-img');
        avatarImg.src = reader.result; // Asignar la imagen al elemento <img>
        saveProfileData(); // Guardar los datos del perfil con la imagen actualizada
    }

    if (file) {
        reader.readAsDataURL(file); // Convertir el archivo en una URL de datos (base64)
    }
});
