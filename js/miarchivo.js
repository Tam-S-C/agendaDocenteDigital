// PROMPT 1 (Saludo + día + materias + opciones)

let fecha = new Date();
let diaSemana = fecha.getDay();
let nombreDia = obtenerNombreDia(diaSemana);

let mensaje = "¡Bienvenid@! Hoy es " + nombreDia + ".";

// Uso de función + uso de Return
function obtenerNombreDia(dia) {
    let nombresDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return nombresDias[dia];
}

// Mensaje de materias con uso de switch(condicional)
switch (diaSemana) {
    case 0:
    case 6:
        mensaje += " Hoy es día de descanso laboral :) .";
        break;
    case 1:
        mensaje += " Fuerzas tú puedes! \n Tienes clases de: \n -Aritmética en la Escuela Nº11 a las 10hs. \n -Geometría en la Escuela Nº30 a las 12hs.";
        break;
    case 2:
        mensaje += " Hoy sólo tienes clases de: \n -Aritmética en la Escuela Nº30 a las 10hs.";
        break;
    case 3:
        mensaje += " Vamos por la mitad de la semana! \n Tienes clases de: \n -Aritmética en la Escuela Nº11 a las 10hs. \n -Geometría en la Escuela Nº30 a las 12hs.";
        break;
    case 4:
        mensaje += " HVamos que sólo tiene una clase! \n Tienes clases de: \n -Geometría en la Escuela Nº11 a las 10hs.";
        break;
    case 5:
        mensaje += " Último esfuerzo! \n Tienes clases de: \n -Aritmética en la Escuela Nº11 a las 10hs. \n -Geometría en la Escuela Nº30 a las 12hs.";
        break;
}

// Eleccion asistencia o calificaciones con uso de prompt
let opcion = prompt(mensaje + "\n\n ¿Qué deseas hacer hoy? \n Teclea: \n 1: para ver calificaciones \n 2: para ver asistencias");


// CALIFICACIONES
if (opcion === "1") {
    let opcion1;

    // Bucle while para solicitar la elección del alumno hasta que se seleccione una opción válida
    while (true) {
        opcion1 = prompt("Elige un alumno: \n 1: María Rodriguez  \n 2: Juan Perez \n 3: Pablo Lopez");

        if (opcion1 === "1" || opcion1 === "2" || opcion1 === "3") {
            break; // Si la opción es válida sale del bucle
        } else {
            alert("Opción incorrecta. Por favor, elige una opción válida."); //Si no se le vuelve a preguntar
        }
    }

    let nota1, nota2, nota3;

    // Bucle while para solicitar las calificaciones nuevamente si alguna está fuera de rango 0-10
    
    do {
        nota1 = parseInt(prompt("Inserta nota del primer trimestre"));
    } while (nota1 < 0 || nota1 > 10);

    do {
        nota2 = parseInt(prompt("Inserta nota del segundo trimestre"));
    } while (nota2 < 0 || nota2 > 10);

    do {
        nota3 = parseInt(prompt("Inserta nota del tercer trimestre"));
    } while (nota3 < 0 || nota3 > 10);

    let promedio = Math.round((nota1 + nota2 + nota3) / 3);
    let estado;

    if (promedio >= 7) {
        estado = "Aprobado";
    } else {
        estado = "Desaprobado";
    }

    alert(`El promedio del alumno es: ${promedio}. El alumno está: ${estado}`);
}


// ASISTENCIA usando CICLO WHILE y do while si ingresa una asistencia fuera del rango 0-100

else if (opcion === "2") {

    let alumnoElegido = "";
    let asistencias = 0;

    while (alumnoElegido !== "1" && alumnoElegido !== "2" && alumnoElegido !== "3") {
        alumnoElegido = prompt("Elige un alumno para saber su regularidad: \n 1: María Rodriguez  \n 2: Juan Perez \n 3: Pablo Lopez");
        if (alumnoElegido !== "1" && alumnoElegido !== "2" && alumnoElegido !== "3") {
            alert("Opción no válida. Por favor, elige un alumno válido.");
        }
    }

    do {
        let asistenciasIngresadas = parseInt(prompt(`Ingresa el número de asistencias para el alumno seleccionado (${alumnoElegido}):`));
        let totalClases = 100;

        if (asistenciasIngresadas >= 0 && asistenciasIngresadas <= totalClases) {
            asistencias = asistenciasIngresadas;

            function cuentaPorcentajeAsistencia(asistencias, totalClases) {
                return Math.round((asistencias / totalClases) * 100);
            }

            let porcentajeAsistencia = cuentaPorcentajeAsistencia(asistencias, totalClases);

            if (porcentajeAsistencia >= 70) {
                alert(`El alumno tiene un ${porcentajeAsistencia}% de asistencia y sigue regular.`);
            } else {
                alert(`El alumno tiene un ${porcentajeAsistencia}% de asistencia, debe ser verificada su regularidad.`);
            }
            break;
        } else {
            alert("El número de asistencias ingresado no es válido. Por favor, ingresa un valor entre 0 y 100");
        }
    } while (true); // Repite así el bucle mientras el valor ingresado no sea válido.
}

else {
    alert("Opción no disponible.");
}
