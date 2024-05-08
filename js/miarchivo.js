/* CAMBIOS REALIZADOS: PRE-ENTREGA 3 */

// Info de materias con DATE en aside
// Planilla con checks para asistencias
// Planilla con inputs para notas
// innerText para info de Promedio y estado
// Sumar storage/JSON


////////// ASIDE CON LAS FECHA + MATERIAS

let fecha = new Date();
let diaSemana = fecha.getDay();
let mensaje = "¡Bienvenid@! \n\n Hoy es " + obtenerNombreDia(diaSemana) + ".\n" + obtenerMensaje(diaSemana);

function obtenerNombreDia(dia) {
    const nombresDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return nombresDias[dia];
}

function obtenerMensaje(diaSemana) {
    let mensajes = {
        0: "Hoy es día de descanso laboral :) .",
        1: "Fuerzas tú puedes! \n\n Tienes clases de: \n\n -Aritmética en la Esc. Nº11 a las 10hs. \n -Geometría en la Esc. Nº30 a las 12hs.",
        2: "Hoy sólo tienes clases de: \n\n -Aritmética en la Esc. Nº30 a las 10hs.",
        3: "Vamos por la mitad de la semana! \n\n Tienes clases de: \n\n -Aritmética en la Esc. Nº11 a las 10hs. \n -Geometría en la Esc. Nº30 a las 12hs.",
        4: "Vamos que hoy sólo tienes una clase! \n\n Tienes clases de: \n\n -Geometría en la Esc. Nº11 a las 10hs.",
        5: "Último esfuerzo! \n\n Tienes clases de: \n\n -Aritmética en la Esc. Nº11 a las 10hs. \n\n -Geometría en la Esc. Nº30 a las 12hs.",
        6: "¡Es fin de semana! A disfrutar :)"
    };
    return mensajes[diaSemana];
}

// DOM
let mensajeBienvenida = document.getElementById('funcionFecha');
funcionFecha.innerText = mensaje;


/*


////////////////////// CALIFICACIONES

if (opcion === "1") {
    let opcion1 = ""; 

    // Elegir alumno

    while (opcion1 !== "1" && opcion1 !== "2" && opcion1 !== "3") {
        opcion1 = prompt("Elige un alumno: \n 1: María Rodriguez  \n 2: Juan Perez \n 3: Pablo Lopez");

        if (opcion1 !== "1" && opcion1 !== "2" && opcion1 !== "3") {
            alert("Opción incorrecta. Por favor, elige una opción válida."); //Si no se le vuelve a preguntar
        }
    }

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