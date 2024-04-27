/* CAMBIOS REALIZADOS EN LA SEGUNDA ENTREGA */

// Hacer escalable totalAsistencias --> CHECK
// Hacer escabable cantidad de notas, con array y método .lenght --> CHECK
// Cambiar los 2 while(true) --> CHECK
// Hacer que el simulador completo esté en loop (volver al menu inicial o salir) --> CHECK
// Cambiar switch del día de la semana por función--> CHECK
// Sumar otro objeto además del Date: class materias -->



// PROMPT 1 (Saludo + día + materias + opciones)

// Uso de función con parámetro + uso de Return + más uso de array para sacar con el índice el día de la semana.
function obtenerNombreDia(dia) {
    const nombresDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return nombresDias[dia];
}

// Mensaje de materias con uso de objeto para mapear los mensajes según el día de la semana (con .getDay)
function obtenerMensaje(diaSemana) {
    let mensajes = {
        0: "Hoy es día de descanso laboral :) .",
        1: "Fuerzas tú puedes! \n Tienes clases de: \n -Aritmética en la Escuela Nº11 a las 10hs. \n -Geometría en la Escuela Nº30 a las 12hs.",
        2: "Hoy sólo tienes clases de: \n -Aritmética en la Escuela Nº30 a las 10hs.",
        3: "Vamos por la mitad de la semana! \n Tienes clases de: \n -Aritmética en la Escuela Nº11 a las 10hs. \n -Geometría en la Escuela Nº30 a las 12hs.",
        4: "Vamos que hoy sólo tienes una clase! \n Tienes clases de: \n -Geometría en la Escuela Nº11 a las 10hs.",
        5: "Último esfuerzo! \n Tienes clases de: \n -Aritmética en la Escuela Nº11 a las 10hs. \n -Geometría en la Escuela Nº30 a las 12hs.",
        6: "¡Es fin de semana! A disfrutar :)"
    };

    return mensajes[diaSemana];
}

// Uso de función para obtener el mensaje del día
let fecha = new Date();
let diaSemana = fecha.getDay();
let mensaje = "¡Bienvenid@! Hoy es " + obtenerNombreDia(diaSemana) + ".\n" + obtenerMensaje(diaSemana);

// Elección asistencia o calificaciones con uso de prompt
let opcion = "";
while( opcion !== "4") {
opcion = prompt(mensaje + "\n\n ¿Qué deseas hacer hoy? \n Teclea: \n 1: para ver calificaciones \n 2: para ver asistencias \n 3: para ver estado completo de alumnos \n 4: para salir.");




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

class Materias{
    constructor(materiaAlumno, nombreAlumno, promedioAlumno, estadoNotas, estadoAsistencias) {
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

} else if ( opcion === "3"){
let alumnoClass= parseInt(prompt(`Elige un alumno: \n 1: María Rodriguez  \n 2: Juan Perez \n 3: Pablo Lopez`));
    if (alumnoClass === 1){
        prompt(`Estado del alumno: \n Materia: ${alumno1.materiaAlumno} \n Nombre: ${alumno1.nombreAlumno} \n Promedio: ${alumno1.promedioAlumno} \n Estado de Notas: ${alumno1.estadoNotas} \n Estado de Asistencias: ${alumno1.estadoAsistencias} \n\nTeclea enter o aceptar/ok para volver al menú principal.`)
    } else if (alumnoClass === 2){
        prompt(`Estado del alumno: \n Materia: ${alumno2.materiaAlumno} \n Nombre: ${alumno2.nombreAlumno} \n Promedio: ${alumno2.promedioAlumno} \n Estado de Notas: ${alumno2.estadoNotas} \n Estado de Asistencias: ${alumno2.estadoAsistencias} \n\nTeclea enter o aceptar/ok para volver al menú principal.`)
    } else if (alumnoClass === 3){
        prompt(`Estado del alumno: \n Materia: ${alumno3.materiaAlumno} \n Nombre: ${alumno3.nombreAlumno} \n Promedio: ${alumno3.promedioAlumno} \n Estado de Notas: ${alumno3.estadoNotas} \n Estado de Asistencias: ${alumno3.estadoAsistencias} \n\nTeclea enter o aceptar/ok para volver al menú principal.`)
    } else {
        alert(`El número ingresado no es válido. Por favor, ingresa un valor válido.`)
    }



////////////////////// PARA SALIR DEL MENÚ

} else if( opcion === "4"){
    alert ("Gracias por utilizar nuestra web. \n\nQue tenga un buen día! =D")

} else {
    alert("Opción no disponible. Por favor elige una opción válida.");
}
}


