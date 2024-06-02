document.addEventListener("DOMContentLoaded", function() {
    let currentId = 1;

    // Función para agregar un alumno
    function agregarAlumno(nombreApellido) {
        let meses = ["marzo", "abril", "mayo"];

        meses.forEach(mes => {
            let tablaAlumnos = document.querySelector(`#${mes} .tablaAlumnos`);

            let tr = document.createElement("tr");
            tr.classList.add(`alumno-${currentId.toString().padStart(2, '0')}`);

            tr.innerHTML = `
                <td>${currentId.toString().padStart(2, '0')}</td>
                <td>${nombreApellido}</td>
                <td>
                    ${[1, 2, 3, 4, 5].map(i => `<input type="checkbox" name="asistenciaMes_${mes}_Al_${currentId}[]" value="${i}" class="checkboxMes_${mes}_Alumno_${currentId}">`).join(' ')}
                </td>
                <td>
                    ${[1, 2, 3].map(i => `<input type="number" name="nota_${i}_${mes}_Al_${currentId}[]" min="0" max="10" class="notas_${mes}_Alumno_${currentId}">`).join(' ')}
                </td>
            `;

            tablaAlumnos.appendChild(tr);

            // Agregar eventos input y click a los checkboxes e inputs de notas
            tr.querySelectorAll('input[type="checkbox"], input[type="number"]').forEach(input => {
                input.addEventListener("input", actualizarInformeFinal);
                if (input.type === 'checkbox') {
                    input.addEventListener("click", actualizarInformeFinal);
                }
            });
        });

        // Añadir el alumno a las opciones del informe final
        let informeFinal = document.getElementById("selector-informe-final");
        let option = document.createElement("option");
        option.value = currentId.toString().padStart(2, '0');
        option.text = nombreApellido;
        informeFinal.appendChild(option);

        currentId++;
    }

    // Función para borrar un alumno por ID
    function borrarAlumno(id) {
        let alumnoClass = `.alumno-${id.toString().padStart(2, '0')}`;
        let filas = document.querySelectorAll(alumnoClass);
        let avisoIDerror = document.getElementById("avisoIDerror");

        if (filas.length === 0) {
            avisoIDerror.innerText = `No se encontró ningún alumno con el ID ${id}`;
            return false;
        }

        filas.forEach(fila => fila.remove());
        avisoIDerror.innerText = "";

        // Eliminar el alumno de las opciones del informe final
        let informeFinal = document.getElementById("selector-informe-final");
        Array.from(informeFinal.options).forEach((option, index) => {
            if (parseInt(option.value) === id) {
                informeFinal.remove(index);
            }
        });

        actualizarInformeFinal(); // Actualizar el informe final después de borrar un alumno

        return true;
    }

    // Event listeners para los botones de agregar y borrar alumnos
    document.getElementById("sumarAlumnoBoton").addEventListener("click", () => {
        let nombreApellido = document.getElementById("nombreApellido").value.trim();
        let avisoAlumnoVacio = document.getElementById("avisoAlumnoVacio");

        if (nombreApellido !== "") {
            agregarAlumno(nombreApellido);
            document.getElementById("nombreApellido").value = ""; // Limpiar el input
            avisoAlumnoVacio.innerText = "";
        } else {
            avisoAlumnoVacio.innerText = "Input vacío, por favor escriba un nombre y apellido.";
        }
    });

    document.getElementById("borrarAlumnoBoton").addEventListener("click", () => {
        let borrarAlumnoId = parseInt(document.getElementById("borrarAlumnoId").value.trim());
        let avisoIDVacio = document.getElementById("avisoIDVacio");
        let avisoIDerror = document.getElementById("avisoIDerror");

        avisoIDVacio.innerText = "";
        avisoIDerror.innerText = "";

        if (!isNaN(borrarAlumnoId)) {
            let borrado = borrarAlumno(borrarAlumnoId);
            if (!borrado) {
                avisoIDerror.innerText = `No se encontró ningún alumno con el ID ${borrarAlumnoId}`;
            }
            document.getElementById("borrarAlumnoId").value = "";
        } else {
            avisoIDVacio.innerText = "Inserte un ID válido, ej: 01, 02, 03.";
        }
    });

    // Función para actualizar el informe final
    function actualizarInformeFinal() {
        let selector = document.getElementById("selector-informe-final");
        let alumnoId = parseInt(selector.value);

        if (!isNaN(alumnoId)) {
            let sumaNotas = 0, sumaAsistencias = 0;
            let totalNotas = 0, totalAsistencias = 0;

            ["marzo", "abril", "mayo"].forEach(mes => {
                let notas = obtenerNotasAlumno(alumnoId, mes);
                let asistencias = obtenerAsistenciasAlumno(alumnoId, mes);

                if (notas.length > 0) {
                    sumaNotas += calcularPromedio(notas);
                    totalNotas++;
                }
                if (asistencias.length > 0) {
                    sumaAsistencias += calcularPromedio(asistencias);
                    totalAsistencias++;
                }
            });

            let promedioNotas = totalNotas > 0 ? (sumaNotas / totalNotas) : 0;
            let promedioAsistencias = totalAsistencias > 0 ? (sumaAsistencias / totalAsistencias) * 100 : 0;

            let resultadoFinal = document.getElementById("resultadoFinal");
            resultadoFinal.innerText = `El alumno seleccionado tiene ${promedioNotas.toFixed(2)} de promedio y ${promedioAsistencias.toFixed(2)}% de asistencia.`;

            let estado = "";
            if (promedioNotas >= 7 && promedioAsistencias >= 50) {
                estado = "Estado: Aprobado y Regularizado";
            } else if (promedioNotas < 7 && promedioAsistencias >= 50) {
                estado = "Estado: Desaprobado y Regularizado";
            } else if (promedioNotas >= 7 && promedioAsistencias < 50) {
                estado = "Estado: Aprobado - Ver regularidad";
            } else {
                estado = "Estado: Desaprobado - No Regularizado";
            }

            resultadoFinal.innerText += ` (${estado})`;
        } else {
            // Si no se seleccionó ningún alumno, limpiamos el resultado final
            document.getElementById("resultadoFinal").innerText = "";
        }
    }

    // Función para obtener las notas de un alumno en un mes
    function obtenerNotasAlumno(alumnoId, mes) {
        let notas = Array.from(document.querySelectorAll(`.notas_${mes}_Alumno_${alumnoId}`)).map(input => parseFloat(input.value) || 0);
        console.log(`Elementos encontrados para las notas del alumno ${alumnoId} en el mes ${mes}: `, document.querySelectorAll(`.notas_${mes}_Alumno_${alumnoId}`));
        console.log(`Notas obtenidas para el alumno ${alumnoId} en el mes ${mes}: `, notas);
        return notas;
    }

    // Función para obtener las asistencias de un alumno en un mes
    function obtenerAsistenciasAlumno(alumnoId, mes) {
        let asistencias = Array.from(document.querySelectorAll(`.checkboxMes_${mes}_Alumno_${alumnoId}`)).map(checkbox => checkbox.checked ? 1 : 0);
        console.log(`Checkbox encontrados para las asistencias del alumno ${alumnoId} en el mes ${mes}: `, document.querySelectorAll(`.checkboxMes_${mes}_Alumno_${alumnoId}`));
        console.log(`Asistencias obtenidas para el alumno ${alumnoId} en el mes ${mes}: `, asistencias);
        return asistencias;
    }

    // Función para calcular el promedio de un array de números
    function calcularPromedio(numeros) {
        let suma = numeros.reduce((acc, num) => acc + num, 0);
        return suma / numeros.length;
    }

    // Event listener para el selector de informe final
    document.getElementById("selector-informe-final").addEventListener("change", actualizarInformeFinal);
});

