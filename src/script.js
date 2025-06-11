let form = document.getElementById("contact-form");
let lista = document.getElementById("lista-contactos");
let eliminarContacto = document.getElementById("eliminar");
let btnMostrarMas = document.getElementById("btn-mostrar-mas");

let cantidadMostrada = 0;
const cantidad_click = 5;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("email").value.trim();
    let telefono = document.getElementById("telefono").value.trim();
    if (nombre.length < 2) {
        alert("El nombre debe tener al menos dos caracteres.");
        return;
    }
    if (!/^\d+$/.test(telefono)) {
        alert("El teléfono solo debe contener números.");
        return;
    }
    let contact = { nombre, email, telefono };
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    contactos.push(contact);
    localStorage.setItem("contactos", JSON.stringify(contactos));
    form.reset();
    cantidadMostrada = 0;
    lista.innerHTML = "";
    mostrarMasContactos();
});

eliminarContacto.addEventListener("click", () => {
    eliminarContactos();
});

btnMostrarMas.addEventListener("click", () => {
    mostrarMasContactos();
});

function mostrarMasContactos() {
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    contactos.sort((a, b) => a.nombre.localeCompare(b.nombre));

    for (let i = cantidadMostrada; i < cantidadMostrada + cantidad_click && i < contactos.length; i++) {
        const c = contactos[i];
        const card = document.createElement("div");
        card.classList.add("info-contacto");
        card.innerHTML = `
            <strong>${c.nombre}</strong><br>
            ${c.email} - ${c.telefono}<br>
            <button onclick="editarContacto(${i})">Editar</button>`;
        lista.appendChild(card);
    }

    cantidadMostrada += cantidad_click;
}

function eliminarContactos() {
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    contactos.pop();
    localStorage.setItem("contactos", JSON.stringify(contactos));
    lista.innerHTML = "";
    cantidadMostrada = 0;
    mostrarMasContactos();
}

function editarContacto(index) {
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    let contacto = contactos[index];

    let nuevoNombre = prompt("Editar nombre:", contacto.nombre);
    if (!nuevoNombre || nuevoNombre.trim().length < 2) {
        alert("El nombre debe tener al menos dos caracteres.");
        return;
    }

    let nuevoEmail = prompt("Editar correo:", contacto.email);
    let nuevoTelefono = prompt("Editar teléfono:", contacto.telefono);
    if (!/^\d+$/.test(nuevoTelefono)) {
        alert("El teléfono solo debe contener números.");
        return;
    }

    contacto.nombre = nuevoNombre.trim();
    contacto.email = nuevoEmail.trim();
    contacto.telefono = nuevoTelefono.trim();

    contactos[index] = contacto;
    localStorage.setItem("contactos", JSON.stringify(contactos));
    lista.innerHTML = "";
    cantidadMostrada = 0;
    mostrarMasContactos();
}

// Mostrar los primeros al cargar
mostrarMasContactos();

//eliminar una contacto,
// validaciondes de numero de telefono debe contener numeros,
// el nombre debe tener al menos dos caracteres,
// fucnionalidad de ordenar los contactos alfabeticamente por su nombre, //
// opcion de mostrar 5  o 10 contactos  //
//Editar contacto//