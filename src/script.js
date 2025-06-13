let form = document.getElementById("contact-form");
let lista = document.getElementById("lista-contactos");
let eliminarContacto = document.getElementById("eliminar");
let aceptarEdicion = document.getElementById("aceptar-edicion");
let cantidadMostrar = document.getElementById("cantidad-mostrar");
let botonOrdenar = document.getElementById("ordenar-nombre");
let indiceEdicion = -1;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;

    if (nombre.length <= 2) {
        alert("El nombre debe tener más de 2 caracteres.");
        return;
    }

    if (!/^\d+$/.test(telefono)) {
        alert("El número de teléfono solo debe tener números.");
        return;
    }

    if (indiceEdicion === -1) {
        let contacto = { nombre, email, telefono };
        let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
        contactos.push(contacto);
        localStorage.setItem("contactos", JSON.stringify(contactos));
        form.reset();
        mostrarContactos();
    }
});

aceptarEdicion.addEventListener("click", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;

    if (nombre.length <= 2) {
        alert("El nombre debe tener más de 2 caracteres.");
        return;
    }

    if (!/^\d+$/.test(telefono)) {
        alert("El número de teléfono solo debe tener números.");
        return;
    }

    if (indiceEdicion !== -1) {
        let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
        contactos[indiceEdicion] = { nombre, email, telefono };
        localStorage.setItem("contactos", JSON.stringify(contactos));
        indiceEdicion = -1;
        form.reset();
        aceptarEdicion.style.display = "none";
        mostrarContactos();
    }
});

eliminarContacto.addEventListener("click", () => {
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    if (contactos.length > 0) {
        contactos.pop();
        localStorage.setItem("contactos", JSON.stringify(contactos));
        mostrarContactos();
    }
});

function mostrarContactos() {
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    lista.innerHTML = "";
    let cantidadSeleccionada = cantidadMostrar?.value || "todos";
    let contactosAMostrar = (cantidadSeleccionada === "todos")
        ? contactos
        : contactos.slice(0, parseInt(cantidadSeleccionada));

    contactosAMostrar.forEach((c, i) => {
        const card = document.createElement("div");
        card.classList.add("info-contacto");
        card.innerHTML = `
            <div class="contenido-contacto">
                <strong>${c.nombre}</strong><br>
                ${c.email} - ${c.telefono}<br><br>
                <button onclick="editarContacto(${i})" title="Editar">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
            </div>`;

        lista.appendChild(card);
    });
}

cantidadMostrar.addEventListener("change", mostrarContactos);

botonOrdenar.addEventListener("click", (e) => {
    e.preventDefault();
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    contactos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    localStorage.setItem("contactos", JSON.stringify(contactos));
    mostrarContactos();
});

window.editarContacto = function (indice) {
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    let contacto = contactos[indice];
    document.getElementById("nombre").value = contacto.nombre;
    document.getElementById("email").value = contacto.email;
    document.getElementById("telefono").value = contacto.telefono;

    indiceEdicion = indice;
    aceptarEdicion.style.display = "inline-block";
};

aceptarEdicion.style.display = "none";
mostrarContactos();

//eliminar una contacto,
// validaciondes de numero de telefono debe contener numeros,
// el nombre debe tener al menos dos caracteres,
// fucnionalidad de ordenar los contactos alfabeticamente por su nombre, //
// opcion de mostrar 5  o 10 contactos  //
//Editar contacto//