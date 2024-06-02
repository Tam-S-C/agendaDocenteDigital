/* CAMBIOS REALIZADOS: ENTREGA FINAL */

// Evitar que se sumen tareas vacías + cartel con innerText de aviso. (CHECK)
// Librería SweetAlert2 para el aviso de mensaje de contacto enviado + asincronía con setTimeOut para cerrarlo. (CHECK)
// Librería Toastify para aviso de sesión iniciada. (CHECK)
// Corregido: "mensajes" array en vez de objeto. (CHECK)
// API de frases de api-get-quotes.vercel.app, categoría motivacionales + Fetch. (CHECK)
// .json local con datos de los alumnos. (CHECK)
// API calendario https://date.nager.at/swagger/index.html (CHECK)

///////////////////////////////////////

/* CAMBIOS REALIZADOS: PRE-ENTREGA 3 */

// Info de materias con DATE en aside con innerText. (CHECK)
// Sumar storage y evento al inicio de sesión + devolver nombre en el bienvenido del aside. (CHECK)
// Listado de tareas pendientes (onclick, crear elementos y remove) + LOCALSTORAGE Y JSON. (CHECK)
// Planilla con checks para asistencias + notas con innerText con regularidad y promedio. (CHECK)
// SUGAR SYNTAX en saludo de bienvenida, en funcion promedio aprobado:desaprobado y en estado regular:irregular.(CHECK)


////////////////////////////////////////////////// ASIDE 

////////// CALENDARIO

const URLCalendario = 'https://date.nager.at/api/v3/NextPublicHolidays/ar';
const calendar = document.querySelector("#calendarioApi");

fetch(URLCalendario)
    .then((resp) => resp.json())
    .then((data) => {
        // Filtrar los feriados para mostrar solo los de 2024
        const holidays2024 = data.filter((holiday) => holiday.date.startsWith('2024'));
        
        holidays2024.forEach((holiday) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <p id="feriados">${holiday.localName} - ${holiday.date}</p>
            `;
            calendar.append(li);
        });
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });



////////// FRASES MOTIVACIONALES CON API y FETCH

const URL = "https://api-get-quotes.vercel.app/api/v1/category/Motivation";
const frase = document.querySelector("#fraseDelDia");

fetch(URL)
    .then((resp) => resp.json())
    .then((data) => {
        const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)]; // Quote aleatoria
        const li = document.createElement("li");
        li.innerHTML = `
            <h4 id="fraseCSS">"${randomQuote.quote}"</h4>
            <p>- ${randomQuote.author}.</p>
        `;
        frase.append(li);
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });



////////// BIENVENIDO DOCENTE + inicio sesión con localStorage + sugar syntax + toastify

function mostrarNombreDocente(){
    let nombreSesionDocente = document.getElementById("nombreDocente");
    let nombreGuardado = localStorage.getItem('nombre');
    
    nombreSesionDocente.textContent = nombreGuardado ? "¡Bienvenid@ " + nombreGuardado + "!" : "¡Bienvenid@ Docente!"; // uso de sugar sintax
}

function guardarNombre(event){
    event.preventDefault();
    let nombre = document.getElementById("inputNombreDocente").value;
    localStorage.setItem('nombre', nombre);
    if (nombre.trim() !== "") {
        Toastify({
            text: "Sesión Iniciada",
            duration: 2000,
            offset: {
                x: 14,
                y: 30
            },
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #70b2c9, #8989bfc7)",
            },
        }).showToast();
    }
    mostrarNombreDocente();
    document.getElementById("inputNombreDocente").value = ""; // Limpiar el input
}

let nombreForm = document.getElementById("nombreFormulario")
let escucharSubmit = document.addEventListener("submit", guardarNombre);

document.addEventListener("DOMContentLoaded", mostrarNombreDocente);


////////// Mensaje con FECHA + MATERIAS

let fecha = new Date();
let diaSemana = fecha.getDay();
let mensajes = [
    "Hoy es día de descanso laboral =) .",
    "Fuerzas tú puedes! \n\n Tienes clases de: \n\n > Aritmética en la Esc. Nº11 a las 10hs. \n > Geometría en la Esc. Nº30 a las 12hs.",
    "Hoy sólo tienes clases de: \n\n > Aritmética en la Esc. Nº30 a las 10hs.",
    "Vamos por la mitad de la semana! \n\n Tienes clases de: \n\n > Aritmética en la Esc. Nº11 a las 10hs. \n > Geometría en la Esc. Nº30 a las 12hs.",
    "Vamos que hoy sólo tienes una clase! \n\n Tienes clases de: \n\n > Geometría en la Esc. Nº11 a las 10hs.",
    "Último esfuerzo! \n\n Tienes clases de: \n\n > Aritmética en la Esc. Nº11 a las 10hs. \n\n > Geometría en la Esc. Nº30 a las 12hs.",
    "¡Es fin de semana! \n \n  A disfrutar! =D "
];

let mensaje = "¡Hoy es " + obtenerNombreDia(diaSemana) + ".\n" + obtenerMensaje(diaSemana);

function obtenerNombreDia(dia) {
    const nombresDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return nombresDias[dia];
}

function obtenerMensaje(diaSemana) {
    return mensajes[diaSemana];
}

// DOM
let mensajeBienvenida = document.getElementById('funcionFecha');
mensajeBienvenida.innerText = mensaje;



////////// TAREAS PENDIENTES (ASIDE) con localStorage + JSON

function sumarTarea() {
    let sumarTareaInput = document.getElementById("tareasPendientes").value; // Obtener el valor del input

    //No dejar sumar una tarea vacía
    let avisoTareaVacia = document.getElementById("avisoTareaVacia");
    if (sumarTareaInput === "") {
        avisoTareaVacia.innerText = "Tarea vacía, por favor escriba una tarea.";
        return;
    }
    avisoTareaVacia.innerText = ""; // borrar el mensaje de error si se agrega una tarea

    let tarea = {
        nombre: sumarTareaInput,
        completada: false
    };
    let tareas = JSON.parse(localStorage.getItem('tareas')) || []; // Obtener del localStorage o ver si esta vacia
    tareas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(tareas)); // Guardar al local

    mostrarTareas(); // actualizar la lista en la pantalla

    document.getElementById("tareasPendientes").value = ""; // Limpiar el input
}

function mostrarTareas() {
    let listaDeTareas = document.getElementById("listaDeTareas");
    listaDeTareas.innerHTML = ""; // Limpiar la lista antes de volver a crearla

    let tareas = JSON.parse(localStorage.getItem('tareas')) || []; // Obtener y parsear con JSON

    tareas.forEach(tarea => {
        let tareaElemento = document.createElement("li");
        tareaElemento.textContent = tarea.nombre + " ";

        let botonBorrar = document.createElement("button");
        botonBorrar.textContent = "Borrar";
        botonBorrar.onclick = () => {
            // borrar y actualizar el local
            tareas = tareas.filter(cadaTarea => cadaTarea !== tarea);
            localStorage.setItem('tareas', JSON.stringify(tareas));
            mostrarTareas();
        };
        tareaElemento.appendChild(botonBorrar);
        listaDeTareas.appendChild(tareaElemento);
    });
}
document.addEventListener("DOMContentLoaded", mostrarTareas);


//////////////////////////////////////// FORMULARIO DE CONTACTO + asincronía con setTimeOut para el cierre del alert + SweetAlert2

function enviarFormulario(event) {
    event.preventDefault(); //prevencion por defecto + en html estan los valores "requerido en cada campo"

    Swal.fire({
        icon: "success",
        title: "¡Mensaje enviado con éxito!",
        text: "Le estaremos respondiendo a la brevedad.",
        width: 580,
        padding: "1em",
        color: "#716add",
        background: "#fff",
        backdrop: `rgba(0,0,123,0.3)`,
        confirmButtonText: "Salir"
    });

    // Restablecer el formulario luego de enviarlo
    document.getElementById("formulario").reset();

    // Cerrar popup después de 4 seg.
    setTimeout(() => { Swal.close(); }, 5000); 
}


////////////////////////////////////////////////// MAIN

////////// LEGAJO con .json LOCAL y FETCH

let datosCargados = false;

function cerrarDatos() {
    const infoLegajo = document.querySelector("#infoLegajo");
    const cerrarBoton = document.querySelector("#cerrarBoton");

    infoLegajo.innerHTML = ''; // Eliminar el contenido de infoLegajo
    datosCargados = false; // Marcar como no cargados
    cerrarBoton.style.display = 'none'; // Ocultar el botón de cerrar
}

function cargarDatosAlumnos() {
    if (datosCargados) return; // Para evitar que si ya están cargados no los vuelva a cargar.

    const spinner = document.querySelector("#spinner");

    spinner.style.display = 'block'; // Mostrar el spinner

    setTimeout(() => {
        const infoAlumnos = './data/alumnos.json';
        const infoLegajo = document.querySelector("#infoLegajo");
        const cerrarBoton = document.querySelector("#cerrarBoton");

        fetch(infoAlumnos)
            .then((resp) => resp.json())
            .then((data) => {
                data.alumnos.forEach((alumno) => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                        <h4>${alumno.nombre} ${alumno.apellido}</h4>
                        <h5>DNI: <span>${alumno.dni}</span></h5>
                        <h5>Padre/Madre/Tutor: <span>${alumno.PadreMadreTutor}</span></h5>
                        <h5>Materia: <span>${alumno.materia}</span></h5>
                        <h5>Dirección: <span>${alumno.direccion}</span></h5>
                    `;
                    infoLegajo.appendChild(li);
                });
                datosCargados = true; // Marcar como cargados
                cerrarBoton.style.display = 'inline';
                spinner.style.display = 'none'; // Ocultar el spinner
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                spinner.style.display = 'none'; // Ocultar el spinner en caso de error
            });
    }, 2000); // Esperar 2 segundos antes de cargar los datos
}
