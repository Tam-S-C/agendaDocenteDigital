//////////////////////////////////////////////////////////////////// MAIN 

/* PLANILLA: AGREGADO DE ALUMNO A CADA MES Y A SELECTORES CON SUS INPUTS 
PARA NOTAS Y CHECKBOX DE ASISTENCIA Y ELIMINACION DE ALUMNO POR ID 
CON INFORME DE CADA MES E INFORME FINAL CON PROMEDIOS Y ESTADO DEL ALUMNO */



document.addEventListener("DOMContentLoaded", function() {
    let currentId = 1; // contador para que cada alumno tenga su id único

    // Recuperar datos del localStorage al cargar la página
    if (localStorage.getItem("alumnos")) {
        let alumnos = JSON.parse(localStorage.getItem("alumnos"));
        currentId = alumnos.length ? Math.max(...alumnos.map(alumno => alumno.id)) + 1 : 1;

        alumnos.forEach(alumno => {
            agregarAlumno(alumno.nombreApellido, alumno.id, false);
            actualizarDatosAlumno(alumno);
        });
    }

    // Agregar alumno + inputs + checkboxs + alumno en opción de informes
    function agregarAlumno(nombreApellido, id = currentId, save = true) {
        if (!document.querySelector(`.alumno-${id.toString().padStart(2, '0')}`)) {
            let meses = ["marzo", "abril", "mayo"];

            meses.forEach(mes => {
                let tablaAlumnos = document.querySelector(`#${mes} .tablaAlumnos`);

                let tr = document.createElement("tr");
                tr.classList.add(`alumno-${id.toString().padStart(2, '0')}`);

                tr.innerHTML = `
                    <td>${id.toString().padStart(2, '0')}</td>
                    <td>${nombreApellido}</td>
                    <td>
                        ${[1, 2, 3, 4, 5].map(i => `<input type="checkbox" name="asistenciaMes_${mes}_Al_${id}[]" value="${i}" class="checkboxMes_${mes}_Alumno_${id}">`).join(' ')}
                    </td>
                    <td>
                        ${[1, 2, 3].map(i => `<input type="number" id="notasCheck" name="nota_${i}_${mes}_Al_${id}[]" min="0" max="10" class="notas_${mes}_Alumno_${id}">`).join(' ')}
                    </td>
                `;
                tablaAlumnos.appendChild(tr);

                tr.querySelectorAll('input[type="checkbox"], input[type="number"]').forEach(input => {
                    input.addEventListener("input", () => {
                        actualizarInformeMensual(mes);
                        actualizarInformeFinal();
                        guardarDatos();
                    });
                });
            });

            meses.forEach(mes => {
                let informeMensual = document.querySelector(`#${mes} .selector-alumno`);
                let option = document.createElement("option");
                option.value = id.toString().padStart(2, '0');
                option.text = nombreApellido;
                informeMensual.appendChild(option);
            });

            let informeFinal = document.getElementById("selector-informe-final");
            let option = document.createElement("option");
            option.value = id.toString().padStart(2, '0');
            option.text = nombreApellido;
            informeFinal.appendChild(option);

            if (save) {
                guardarDatos();
                currentId++; // Incrementar el ID solo cuando se agrega un nuevo alumno
            }
        }
    }

    // Eliminar alumno
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

        let informeFinal = document.getElementById("selector-informe-final");
        let informeMensuales = document.querySelectorAll(".selector-alumno");
        Array.from(informeFinal.options).forEach((option, index) => {
            if (parseInt(option.value) === id) {
                informeFinal.remove(index);
            }
        });
        informeMensuales.forEach(selector => {
            Array.from(selector.options).forEach((option, index) => {
                if (parseInt(option.value) === id) {
                    selector.remove(index);
                }
            });
        });

        guardarDatos();
        actualizarInformeFinal();
        return true;
    }

    // Mensajes de error por inputs vacíos o id erroneos
    document.getElementById("sumarAlumnoBoton").addEventListener("click", () => {
        let nombreApellido = document.getElementById("nombreApellido").value.trim();
        let avisoAlumnoVacio = document.getElementById("avisoAlumnoVacio");

        if (nombreApellido !== "") {
            agregarAlumno(nombreApellido);
            document.getElementById("nombreApellido").value = "";
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
            avisoIDVacio.innerText = "Inserte un ID válido";
        }
    });

    // Actualizar informe del mes
    function actualizarInformeMensual(mes) {
        let selector = document.getElementById(`selector-alumno-${mes}`);
        let alumnoId = parseInt(selector.value);

        if (!isNaN(alumnoId)) {
            let sumaNotas = 0, sumaAsistencias = 0;
            let totalNotas = 0, totalAsistencias = 0;

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

            let promedioNotas = totalNotas > 0 ? (sumaNotas / totalNotas) : 0;
            let promedioAsistencias = totalAsistencias > 0 ? (sumaAsistencias / totalAsistencias) * 100 : 0;

            let informe = document.querySelector(`#${mes} .informe`);
            informe.innerText = `El alumno seleccionado tiene ${promedioNotas.toFixed(2)} de promedio y ${promedioAsistencias.toFixed(2)}% de asistencia.`;
        } else {
            document.querySelector(`#${mes} .informe`).innerText = "";
        }
    }

  // Actualizar informe final
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
            estado = "Estado: Aprobado - Ver Regularidad del alumno";
        } else {
            estado = "Estado: Desaprobado - Ver Regularidad del alumno";
        }

        resultadoFinal.innerText += ` (${estado})`;
    } else {
        document.getElementById("resultadoFinal").innerText = "";
    }
}

// Función para guardar los datos en localStorage
function guardarDatos() {
    let alumnos = [];

    document.querySelectorAll(".tablaAlumnos tr").forEach(row => {
        if (row.querySelector("td")) {
            let id = parseInt(row.querySelector("td").innerText);
            let nombreApellido = row.querySelectorAll("td")[1].innerText;
            let alumno = {
                id: id,
                nombreApellido: nombreApellido,
                meses: {
                    marzo: {
                        notas: obtenerNotasAlumno(id, "marzo"),
                        asistencias: obtenerAsistenciasAlumno(id, "marzo")
                    },
                    abril: {
                        notas: obtenerNotasAlumno(id, "abril"),
                        asistencias: obtenerAsistenciasAlumno(id, "abril")
                    },
                    mayo: {
                        notas: obtenerNotasAlumno(id, "mayo"),
                        asistencias: obtenerAsistenciasAlumno(id, "mayo")
                    }
                }
            };
            alumnos.push(alumno);
        }
    });

    localStorage.setItem("alumnos", JSON.stringify(alumnos));
}

// Función para actualizar datos de un alumno en la interfaz
function actualizarDatosAlumno(alumno) {
    ["marzo", "abril", "mayo"].forEach(mes => {
        alumno.meses[mes].notas.forEach((nota, i) => {
            document.querySelectorAll(`.notas_${mes}_Alumno_${alumno.id}`)[i].value = nota;
        });
        alumno.meses[mes].asistencias.forEach((asistencia, i) => {
            document.querySelectorAll(`.checkboxMes_${mes}_Alumno_${alumno.id}`)[i].checked = !!asistencia;
        });
    });
}

["marzo", "abril", "mayo"].forEach(mes => {
    document.getElementById(`selector-alumno-${mes}`).addEventListener("change", () => {
        actualizarInformeMensual(mes);
    });
});

document.getElementById("selector-informe-final").addEventListener("change", actualizarInformeFinal);
});

function obtenerNotasAlumno(alumnoId, mes) {
    let notas = Array.from(document.querySelectorAll(`.notas_${mes}_Alumno_${alumnoId}`)).map(input => parseFloat(input.value) || 0);
    return notas;
}

function obtenerAsistenciasAlumno(alumnoId, mes) {
    let asistencias = Array.from(document.querySelectorAll(`.checkboxMes_${mes}_Alumno_${alumnoId}`)).map(checkbox => checkbox.checked ? 1 : 0);
    return asistencias;
}

function calcularPromedio(numeros) {
    let suma = numeros.reduce((acc, num) => acc + num, 0);
    return suma / numeros.length;
}





///////////////////////////////////////////////////////////////// LEGAJOS

let datosCargados = false;

function cerrarDatos() {
    const infoLegajo = document.querySelector("#infoLegajo");
    const cerrarBoton = document.querySelector("#cerrarBoton");

    infoLegajo.innerHTML = '';
    datosCargados = false;
    cerrarBoton.style.display = 'none';
}

function cargarLegajo() {
    const idAlumno = document.getElementById("inputIdAlumno").value.trim();
    if (idAlumno === "") {
        avisoIDVacia.innerText = "Inserte un ID válido, ej: 01, 02, 03.";
        return;
    }

    cargarDatosAlumnos(idAlumno);
}

function cargarDatosAlumnos(idAlumno) {
    const avisoIDVacia = document.getElementById("avisoIDVacia"); 
    avisoIDVacia.innerText = ""; 
    
    if (datosCargados) return;

    const spinner = document.querySelector("#spinner");

    spinner.style.display = 'block';

    setTimeout(() => {
        const infoAlumnos = './data/alumnos.json';
        const infoLegajo = document.querySelector("#infoLegajo");
        const cerrarBoton = document.querySelector("#cerrarBoton");

        fetch(infoAlumnos)
            .then((resp) => resp.json())
            .then((data) => {
                const alumno = data.alumnos.find(alumno => alumno.id === idAlumno);
                if (alumno) {
                    const li = document.createElement("li");
                    li.innerHTML = `
                        <h5> Datos del Alumno </h5>
                        <h5>ID: <span>${alumno.id}</span></h5>
                        <h5>DNI: <span>${alumno.dni}</span></h5>
                        <h5>Padre/Madre/Tutor: <span>${alumno.PadreMadreTutor}</span></h5>
                        <h5>Materia: <span>${alumno.materia}</span></h5>
                        <h5>Dirección: <span>${alumno.direccion}</span></h5>
                    `;
                    infoLegajo.appendChild(li);
                } else {
                    infoLegajo.innerText = "No se encontró ningún legajo para el alumno con el ID especificado.";
                    avisoIDVacia.innerText = "Inserte un ID válido, ej: 01, 02, 03.";
                }
                datosCargados = true;
                cerrarBoton.style.display = 'inline';
                spinner.style.display = 'none';
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                spinner.style.display = 'none';
            });
    }, 1500);
}