/* CAMBIOS REALIZADOS: PRE-ENTREGA 3 */

// Info de materias con DATE en aside con innerText
// Sumar storage y evento al inicio de sesión + devolver nombre en el bienvenido del aside
// Listado de tareas pendientes (onclick, crear elementos y remove) + LOCALSTORAGE Y JSON
// Planilla con checks para asistencias
// Planilla con inputs para notas
// innerText para info de Promedio y estado
// SUGAR SYNTAX en linea 26


/* Para la entrega final, lo ideal sería sumar que también se guarde 
en localstorage la info de las notas, asistencias e informes, 
incluso ver si sumar la funcionalidad de cambiar de curso/materia 
y agregar/eliminar alumnos y cantidad de notas/asistencias.
Y soñando un poco, hacer que a los aprobados se cree automático un certificado 
+ a esto sumarle asincronía para la espera del armado del crtificado
+ cambiar ventana de "mensaje enviado" en el form de contacto por uso de SweetAlert2*/


//////////////////////////////////////// ASIDE 

////////// BIENVENIDO DOCENTE + inicio sesión con localStorage + sugar syntax

function mostrarNombreDocente(){
    let nombreSesionDocente = document.getElementById("nombreDocente");
    let nombreGuardado = localStorage.getItem('nombre');
    
    nombreSesionDocente.textContent = nombreGuardado ? "¡Bienvenid@ " + nombreGuardado + "!" : "¡Bienvenid@ Docente!"; // uso de sugar sintax
}

function guardarNombre(event){
    event.preventDefault();
    let nombre = document.getElementById("inputNombreDocente").value;
    localStorage.setItem('nombre', nombre);
    mostrarNombreDocente();
}


let nombreForm = document.getElementById("nombreFormulario")
let escucharSubmit = document.addEventListener("submit", guardarNombre);

document.addEventListener("DOMContentLoaded", mostrarNombreDocente);



////////// Mensaje con FECHA + MATERIAS

let fecha = new Date();
let diaSemana = fecha.getDay();
let mensaje = "¡Hoy es " + obtenerNombreDia(diaSemana) + ".\n" + obtenerMensaje(diaSemana);

function obtenerNombreDia(dia) {
    const nombresDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return nombresDias[dia];
}

function obtenerMensaje(diaSemana) {
    let mensajes = {
        0: "Hoy es día de descanso laboral =) .",
        1: "Fuerzas tú puedes! \n\n Tienes clases de: \n\n > Aritmética en la Esc. Nº11 a las 10hs. \n > Geometría en la Esc. Nº30 a las 12hs.",
        2: "Hoy sólo tienes clases de: \n\n > Aritmética en la Esc. Nº30 a las 10hs.",
        3: "Vamos por la mitad de la semana! \n\n Tienes clases de: \n\n > Aritmética en la Esc. Nº11 a las 10hs. \n > Geometría en la Esc. Nº30 a las 12hs.",
        4: "Vamos que hoy sólo tienes una clase! \n\n Tienes clases de: \n\n > Geometría en la Esc. Nº11 a las 10hs.",
        5: "Último esfuerzo! \n\n Tienes clases de: \n\n > Aritmética en la Esc. Nº11 a las 10hs. \n\n > Geometría en la Esc. Nº30 a las 12hs.",
        6: "¡Es fin de semana! \n \n  A disfrutar! =D "
    };
    return mensajes[diaSemana];
}

// DOM
let mensajeBienvenida = document.getElementById('funcionFecha');
funcionFecha.innerText = mensaje;


////////// TAREAS PENDIENTES (ASIDE)

function sumarTarea() {
    let sumarTareaInput = document.getElementById("tareasPendientes").value.trim(); // Obtener el valor del input y quitar espacios en blanco

    if (sumarTareaInput === "") {
        return; // Si el input está vacío, salir de la función sin hacer nada
    }

    let tarea = {
        nombre: sumarTareaInput,
        completada: false
    };

    let tareas = JSON.parse(localStorage.getItem('tareas')) || []; // Obtener del localStorage o ver si esta vacia
    tareas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(tareas)); // Guardar al local

    mostrarTareas(); // Llamar a la función para mostrar las tareas (para actualizar la lista en la pantalla)

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


//////////////////////////////////////// MAIN

////////// ASISTENCIAS

// PORCENTAJE
function calcularPorcentajeAsistencia() {
    let checkboxesChecked = document.querySelectorAll(".checkboxMes1Alumno1:checked");
    let totalCheckbox = 5;
    let porcentajeAsistencia = Math.round((checkboxesChecked.length / totalCheckbox) * 100);
    return porcentajeAsistencia;
}

// Función para actualizar el mensaje de asistencia
function actualizarMensajeAsistencia() {
    let porcentajeAsistencia = calcularPorcentajeAsistencia();
    let mensajeAsistencia = document.getElementById("mensajeAsistencia");
    mensajeAsistencia.innerText = "El alumno tiene un " + porcentajeAsistencia + "% de asistencia el primer mes.";
}

// Obtener todos los checkboxes y agregar un listener de eventos a cada uno
let checkboxes = document.querySelectorAll(".checkboxMes1Alumno1");
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        actualizarMensajeAsistencia();
    });
});

// Llamar a la función para actualizar el mensaje de asistencia cuando se cargue la página
actualizarMensajeAsistencia();

/*
////////////////////// CALIFICACIONES

// ARRAY notas para hacerlo escalable y que se puedan ingresar la cantidad de notas que quiera el docente.
    let notas = [];

// Solicitar al usuario que ingrese las notas

    let continuarIngresando = true; // bandera para cortar el ingreso!!

    while (continuarIngresando) {
        let notaNueva = prompt("Inserta cada nota seguida por enter o aceptar (entre 0 y 10). Tecla la letra 'x' cuando termines de cargar las notas.");

        if (notaNueva.toLowerCase() === 'x') { //para asegurar la minuscula
            continuarIngresando = false;
        } else {
            let nota = parseInt(notaNueva);

            // Verificar si la nota es válida
            if (!isNaN(nota) && nota >= 0 && nota <= 10) { //isNaN por si ingresa un caracter que no es un número

                notas.push(nota); // sumo la nota al array notas! :)
            } else {
                alert("La nota ingresada no es válida. Por favor, ingresa un valor numérico entre 0 y 10 o 'x' para salir.");
            }
        }
    }

// PROMEDIO
    let sumaNotas = 0; //contador

    for (let i = 0; i < notas.length; i++) { // uso de lenght para cortar la suma y para la división en el porcentaje.
        sumaNotas += notas[i];
    }
    let promedio = Math.round(sumaNotas / notas.length);

// ESTADO
    let estado;
    if (promedio >= 7) {
        estado = "Aprobado";
    } else {
        estado = "Desaprobado";
    }

// RESULTADO
    alert(`El promedio del alumno es: ${promedio}. El alumno está: ${estado}. \n\nPresiona enter o acepta/ok para volver al menú principal.`);
}

///////////////////////  ASISTENCIA usando CICLO WHILE y do while mejorado con totalClases escalable

else if (opcion === "2") {
    let alumnoElegido = "";
    let asistencias = 0;

    while (alumnoElegido !== "1" && alumnoElegido !== "2" && alumnoElegido !== "3") {
        alumnoElegido = prompt("Elige un alumno para saber su regularidad: \n 1: María Rodriguez  \n 2: Juan Perez \n 3: Pablo Lopez");
        if (alumnoElegido !== "1" && alumnoElegido !== "2" && alumnoElegido !== "3") {
            alert("Opción no válida. Por favor, elige un alumno válido.");
        }
    }

    let totalClases = parseInt(prompt(`Ingresa el número de cantidad de clases anuales:`));
    let asistenciasIngresadas;

    do {
        asistenciasIngresadas = parseInt(prompt(`Ingresa el número de asistencias para el alumno seleccionado (${alumnoElegido}):`));
        if (asistenciasIngresadas >= 0 && asistenciasIngresadas <= totalClases) {
            asistencias = asistenciasIngresadas;

            function cuentaPorcentajeAsistencia(asistencias, totalClases) {
                return Math.round((asistencias / totalClases) * 100);
            }

            let porcentajeAsistencia = cuentaPorcentajeAsistencia(asistencias, totalClases);

            if (porcentajeAsistencia >= 70) {
                alert(`El alumno tiene un ${porcentajeAsistencia}% de asistencia y sigue regular. \n\nTeclea enter o aceptar/ok para volver al menú principal.`);
            } else {
                alert(`El alumno tiene un ${porcentajeAsistencia}% de asistencia, debe ser verificada su regularidad. \n\nTeclea enter o aceptar/ok para volver al menú principal.`);
            }
        } else {
        alert(`El número de asistencias ingresado no es válido. Por favor, ingresa un valor entre 0 y ${totalClases}`);
        }
    } while (asistenciasIngresadas < 0 || asistenciasIngresadas > totalClases);
    // Repite así el bucle mientras el valor ingresado no sea válido.


//////////////////////  CLASS MATERIAS, (alert simple de pedido de datos)

} else if ( opcion === "3"){

class Materias {
    constructor (materiaAlumno, nombreAlumno, promedioAlumno, estadoNotas, estadoAsistencias) {
        this.materiaAlumno = materiaAlumno
        this.nombreAlumno = nombreAlumno;
        this.promedioAlumno  = promedioAlumno;
        this.estadoNotas  = estadoNotas;
        this.estadoAsistencias =estadoAsistencias
    }
}

const alumno1 = new Materias("Aritmética", "María Rodriguez", 10, "Aprobada", "Regularizada");
const alumno2 = new Materias("Aritmética", "Juan Perez", 5, "Desaprobado", "Regularizada");
const alumno3 = new Materias("Aritmética", "Pablo Lopez", 8, "Aprobado", "Ver Regularidad");


let alumnoClass;
while (alumnoClass !== 1 && alumnoClass !== 2 && alumnoClass !== 3) {
    alumnoClass = parseInt(prompt(`Elige un alumno: \n 1: María Rodriguez  \n 2: Juan Perez \n 3: Pablo Lopez`));
    if (alumnoClass !== 1 && alumnoClass !== 2 && alumnoClass !== 3) {
        alert(`El número ingresado no es válido. Por favor, ingresa un valor válido.`);
    }
}

// Visualización del estado del alumno seleccionado
if (alumnoClass === 1) {
    alert(`Estado del alumno: \n Materia: ${alumno1.materiaAlumno} \n Nombre: ${alumno1.nombreAlumno} \n Promedio: ${alumno1.promedioAlumno} \n Estado de Notas: ${alumno1.estadoNotas} \n Estado de Asistencias: ${alumno1.estadoAsistencias} \n\nTeclea enter o aceptar/ok para volver al menú principal.`);
} else if (alumnoClass === 2) {
    alert(`Estado del alumno: \n Materia: ${alumno2.materiaAlumno} \n Nombre: ${alumno2.nombreAlumno} \n Promedio: ${alumno2.promedioAlumno} \n Estado de Notas: ${alumno2.estadoNotas} \n Estado de Asistencias: ${alumno2.estadoAsistencias} \n\nTeclea enter o aceptar/ok para volver al menú principal.`);
} else if (alumnoClass === 3) {
    alert(`Estado del alumno: \n Materia: ${alumno3.materiaAlumno} \n Nombre: ${alumno3.nombreAlumno} \n Promedio: ${alumno3.promedioAlumno} \n Estado de Notas: ${alumno3.estadoNotas} \n Estado de Asistencias: ${alumno3.estadoAsistencias} \n\nTeclea enter o aceptar/ok para volver al menú principal.`);
}
}

////////////////////// PARA SALIR DEL MENÚ

else if( opcion === "4"){
    alert ("Gracias por utilizar nuestra web. \n\nQue tenga un buen día! =D")

} else {
    alert("Opción no disponible. Por favor elige una opción válida.");
}
}
*/

//////////////////////////////////////// FORMULARIO DE CONTACTO

function enviarFormulario(event) {
    event.preventDefault(); //prevencion por defecto + en html estan los valores "requerido en cada campo"

    // Obtener las dimensiones de la ventana principal
    let ventanaPrincipalAncho = window.innerWidth;
    let ventanaPrincipalAlto = window.innerHeight;

    // Calcular la posición de la ventana emergente para que esté centrada
    let popupAncho = 350; // Ancho de la ventana emergente
    let popupAlto = 120;   // Alto de la ventana emergente
    let left = (ventanaPrincipalAncho - popupAncho) / 2;  // div 2 la medida para que quede centrada
    let top = (ventanaPrincipalAlto - popupAlto) / 2; // div 2 la medida para que quede centrada

    // Para crear la ventana emergente + medidas y ubicación 
    let popup = window.open("", "Popup", "width=" + popupAncho + ", height=" + popupAlto + ", top=" + top + ", left=" + left );

    // Estilos CSS dentro de JS
    popup.document.write("<style>body { background-color: #D7D7ED; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; }</style>");
    popup.document.write("<p style='font-weight: bold; color: #978FC5; font-size: 20px;'>Mensaje enviado! =) Gracias!</p>");
    popup.document.write('<html><head><title>Agenda Docente Digital</title></head><body>');
    popup.document.write('</body></html>');

    // Restablecer el formulario luego de enviarlo
    document.getElementById("formulario").reset();

    // Cerrar popup después de 4 seg.
    setTimeout(() => { popup.close(); }, 4000); 

}