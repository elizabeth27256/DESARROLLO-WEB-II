let form = document.getElementById("contact-form");
let lista = document.getElementById("lista-contactos");

form.addEventListener("submit",(e) =>{
    e.preventDefault();
    let contact = {
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value

    }
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    contactos.push(contact);
    localStorage.setItem("contactos", JSON.stringify(contactos));
    form.reset();
    mostrarContactos();
});

function mostrarContactos(){
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    lista.innerHTML = "";
    contactos.forEach((c) => {
        const card = document.createElement("div");
        card.classList.add("info-contacto")
        card.innerHTML = `<strong>${c.nombre} </strong> <br>  ${c.email} - ${c.telefono}`
        lista.appendChild(card);
    });
}

function eliminarContactos(){
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    lista.innerHTML = "";
    contactos.forEach((c) => {
        const card = document.getElementById("div");
        card.innerHTML = `<strong>${c.nombre} </strong> <br>  ${c.email} - ${c.telefono}`
        lista.appendChild(card);
    });
}

mostrarContactos();

//eliminar una contacto,
// validaciondes de numero de telefono debe contener numeros,
// el nombre debe tener al menos dos caracteres,
// fucnionalidad de ordenar los contactos alfabeticamente por su nombre, //
// opcion de mostrar 5  o 10 contactos  //
//Editar contacto//