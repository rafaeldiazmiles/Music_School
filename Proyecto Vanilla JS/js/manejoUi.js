cargarEventos();

let usuarioLoggeado = ""; //Creo esta variable para saber siempre que usuario se loggeo
let ejerciciosAMostrar = []; //variable para guardar un array con todos los id de ejercicios que quiera mostrar a un alumno

document.querySelector("#registro").style.display = "none"; //Oculto formulario de registro cuando carga la pagina
document.querySelector("#ingreso").style.display = "none"; //Oculto formulario de ingreso cuando carga la pagina
document.querySelector("#pagPrincipal").style.display = "none"; //Oculto boton pagina principal
document.querySelector("#homeAlumno").style.display = "none"; //Oculto body alumno
document.querySelector("#navAlumno").style.display = "none"; //Oculto cabezal alumno
document.querySelector("#homeDocente").style.display = "none"; //Oculto body docente
document.querySelector("#navDocente").style.display = "none"; //Oculto cabezal docente
document.querySelector("#auxUsuario").style.display = "none"; //Oculto div auxiliar de usuarios


function cargarEventos(){
    document.querySelector("#btnMuestroRegistro").addEventListener("click", mostrarRegistro);
    document.querySelector("#btnRegistrarse").addEventListener("click", registro);
    document.querySelector("#btnPaginaPrincipal").addEventListener("click", paginaPrincipal);
    document.querySelector("#btnMuestroIngresar").addEventListener("click", mostrarIngresar);
    document.querySelector("#btnAcceder").addEventListener("click", acceder);
    document.querySelector("#btnCierroSesion").addEventListener("click", paginaPrincipal);
    document.querySelector("#btnAsignarNivel").addEventListener("click", asignarNivel); 
    document.querySelector("#btnMostrarXDocente").addEventListener("click", mostrarXDocente); 
    document.querySelector("#selPerfil").addEventListener("change", alumnoRegistro);
    document.querySelector("#aAsignarNivel").addEventListener("click",mostrarAsignarNivel);
    document.querySelector("#aPlantearEje").addEventListener("click",mostrarPlantearEje);
    document.querySelector("#aDevoluciones").addEventListener("click",mostrarDevoluciones);
    document.querySelector("#aEstDocentes").addEventListener("click",mostrarEstDocente);
    document.querySelector("#aEjAlumnos").addEventListener("click", mostrarEjAlumnos);
    document.querySelector("#aEstAlumnos").addEventListener("click", mostrarEstAlumnos);
    document.querySelector("#aEntAlumnos").addEventListener("click", mostrarEntAlumnos);
    document.querySelector("#buscaEjAlumno").addEventListener("click", realizarBusqueda);
    document.querySelector("#subirEjercicio").addEventListener("click", plantearEj);
    document.querySelector("#btnMostrarEntregas").addEventListener("click", generarTablaEntregasSinDevolucion); 
    document.querySelector("#btnMostrarAlumno").addEventListener("click",mostrarAlumnoConMasEjerciciosResueltos);
    document.querySelector("#btnEjeResueltos").addEventListener("click", mostrarCantEjResueltos);
    document.querySelector("#btnEjexNivel").addEventListener("click", mostrarEstAlumnosParaDocente);
}

//Funcion que lleva a la pagina principal limpia (sin sesion de usuario abierta)
function paginaPrincipal (){
    document.querySelector("#auxLanding").style.display = "block"; //Muestro nuevamente botones de registro
    document.querySelector("#bodyHome").style.display = "block"; //Muestro portada de pagina
    document.querySelector("#h1TitBienvenida").innerHTML = `Bienvenidos a Escuela De Música`; //reescribo para cuando se ejecute cierre de sesion
    document.querySelector("#registro").style.display = "none"; //Oculto el formulario
    document.querySelector("#pagPrincipal").style.display = "none"; //Oculto boton pagina principal
    document.querySelector("#ingreso").style.display = "none"; //Oculto formulario de ingreso
    document.querySelector("#homeAlumno").style.display = "none"; //Oculto interfaz alumno
    document.querySelector("#homeDocente").style.display = "none"; //Oculto interfaz docente
    document.querySelector("#navAlumno").style.display = "none"; //Oculto nav alumno
    document.querySelector("#navDocente").style.display = "none"; //Oculto nav docente
    document.querySelector("#auxUsuario").style.display = "none"; //Oculto div auxiliar de usuarios
}

//Cuando hago click en REGISTRARSE en el index
function mostrarRegistro (){ 
    limpiar();
    document.querySelector("#bodyHome").style.display = "none"; //Oculto el body de la landing page
    document.querySelector("#auxLanding").style.display = "none"; //Oculto botones de registrar e ingresar
    document.querySelector("#registro").style.display = "block"; //Muestro solo el formulario
    document.querySelector("#pagPrincipal").style.display = "block"; //Muestro boton a pag principal
    
}

//Funcion que autogenera lista de docentes y permite elegir nivel inicial cuando se selecciona perfil alumno en registro
function alumnoRegistro(){
    let perfil = Number(document.querySelector("#selPerfil").value); //Lo convierto a Number directo del html porque yo controlo qu'e puede elegir el usuario
    if(perfil === 2){
        document.querySelector("#selDocentesRegistro").innerHTML =
        `<label for="selListaDocentes">Elija docente:  </label><select id="selListaDocentes"> 
        </select>`;
        for (let i = 0; i < usuarios.length; i++) {
            const element = usuarios[i];
            if(element.perfil === "docente"){
                document.querySelector("#selListaDocentes").innerHTML +=
                `<option value="${element.nombreUsuario}">${element.nombre} (${element.nombreUsuario}) </option>`
            }
        }
    }else{
        document.querySelector("#selDocentesRegistro").innerHTML = "";//Esta funcion corre cada vez que hay alguien selecciona un perfil en el formulario de registro, si cambia para otro que no sea alumno (2) viene aca y elimina el <select> de docente
    }
}

//Cuando hago click en INGRESAR en el index
function mostrarIngresar(){ 
    limpiar();
    document.querySelector("#auxLanding").style.display = "none"; //Oculto botones de registrar e ingresar
    document.querySelector("#bodyHome").style.display = "none";  //Oculto el body de la landing page
    document.querySelector("#registro").style.display = "none"; //Oculto formulario registrar
    document.querySelector("#ingreso").style.display = "block"; //Muestro el formulario
    document.querySelector("#pagPrincipal").style.display = "block"; //Muestro pag principal
}

//Entrada a interfaz alumno
function alumnoIngreso(){ 
    document.querySelector("#bodyHome").style.display = "block"; //Muestro interfaz bienvenida
    document.querySelector("#h1TitBienvenida").innerHTML = `Bienvenido/a ${usuarioLoggeado}`;//Bienvenida usuario
    document.querySelector("#navAlumno").style.display = "block"; //Muestro interfaz alumno
    document.querySelector("#auxUsuario").style.display = "block"; //Muestro div auxiliar de usuarios
    document.querySelector("#auxLanding").style.display = "none"; //Oculto botones de registrar e ingresar
    document.querySelector("#pagPrincipal").style.display = "none"; //Oculto boton pagina principal
    document.querySelector("#registro").style.display = "none"; //Oculto el formulario
    document.querySelector("#ingreso").style.display = "none"; //Oculto formulario de ingreso
}

//Entrada a interfaz docente VOY A PROBAR DESPLEGANDO TODA LA INTERFAZ PARA QUE LUEGO LOS "A"S NOS SELECCIONEN PARTES ESPECIFICAS
function docenteIngreso(){
    document.querySelector("#pAsignarNivel").innerHTML = "";//Limpio interacciones previas con asignado de nivel
    document.querySelector("#divMostrarTablaXDocente").innerHTML = ""; //Limpio interacciones previas con asignado de nivel
    document.querySelector("#txtNomAlumno").value = "";//Limpio interacciones previas con asignado de nivel
    document.querySelector("#bodyHome").style.display = "block"; //Muestro interfaz alumno
    document.querySelector("#h1TitBienvenida").innerHTML = `Bienvenido/a ${usuarioLoggeado}`; //Bienvenida usuario
    document.querySelector("#navDocente").style.display = "block"; //Muestro interfaz alumno
    document.querySelector("#auxUsuario").style.display = "block"; //Muestro div auxiliar de usuarios
    document.querySelector("#auxLanding").style.display = "none"; //Oculto botones de registrar e ingresar
    document.querySelector("#pagPrincipal").style.display = "none"; //Oculto boton pagina principal
    document.querySelector("#registro").style.display = "none"; //Oculto el formulario de registro
    document.querySelector("#ingreso").style.display = "none"; //Oculto formulario de ingreso
}

//Limpia campos y parrafo
function limpiar(){ 
    limpiarMensajesError();
    let inputsText = document.querySelectorAll(".interfazUsuario"); //Limpio inputs de texto
    for (let i = 0; i < inputsText.length; i++) {
        inputsText[i].value = "";
    }
    let psODivs = document.querySelectorAll(".mensajeUsuario"); //Limpio "p"s o divsde mensajes a usuario
    for (let i = 0; i < psODivs.length; i++) {
        psODivs[i].innerHTML = "";
    }
}

//limpia todos los spans utilizados para mensajes de error (esta funcion es necesario que este por separado de la de limpiar para poder colocarla al inicio de cada funcion)
function limpiarMensajesError(){
    let spans = document.querySelectorAll(".error"); //Limpio todos mis mensajes de error que puse en etiquetas span
    for (let i = 0; i < spans.length; i++) {
        spans[i].innerHTML = "";
    }
}

//Cuando haga click en registrarse, hace todo esto
function registro(){ 
    limpiarMensajesError();//Limpio todos los mensajes de error cada vez que corro la funcion
    let nombre = document.querySelector("#txtNombre").value;
    let nombreUsuario = document.querySelector("#txtNombreUsuario").value;
    let clave = document.querySelector("#txtContraseña").value;
    let perfil = Number(document.querySelector("#selPerfil").value); //Lo convierto a Number directo del html porque yo controlo qu'e puede elegir el usuario
    let recibirValidacion = validacionesRegistro (nombre, nombreUsuario, clave); //
    if(recibirValidacion && perfil != -1){ 
        crearUsuario(nombre, nombreUsuario, clave, perfil);
        if(perfil === 2){
            usuarioLoggeado = nombreUsuario; //Guardo en la variable global el nombre de usuario ingresado (tiene que ir antes de ejecutar la funcion alumno ingreso)
            alumnoIngreso();
        }else{
            usuarioLoggeado = nombreUsuario; //Guardo en la variable global el nombre de usuario ingresado
            docenteIngreso();//Guardo en la variable global el nombre de usuario ingresado (tiene que ir antes de ejecutar la funcion alumno ingreso)
        }
    }
    if(perfil === -1){
        document.querySelector("#errorPerfil").innerHTML = "Seleccione un perfil";
    }
}

//Funcion para validar y ejecutar acceso de usuario
function acceder(){
    limpiarMensajesError()//Limpio todos los mensajes de error cada vez que corro la funcion
    let nombreUsuario = document.querySelector("#txtUsuario").value ;
    let clave = document.querySelector("#txtClave").value;
    let acceso = comprobarAcceso (nombreUsuario, clave);
    let perfil = ""; //variable para capturar perfil del usuario ingresado
    let i = 0;
    while(i < usuarios.length){
        const element = usuarios[i].nombreUsuario.toLowerCase();
        if(element === nombreUsuario.toLowerCase()){
            perfil = usuarios[i].perfil;
            usuarioLoggeado = usuarios[i].nombreUsuario;
        }
        i++
    }
    //Cuando acceso es true 
    if(acceso){
       if(perfil === "alumno"){
        alumnoIngreso();
        }else if(perfil === "docente"){
        docenteIngreso();
        }
    }
}

//Funcion que captura el intento de asignar nivel desde el html y lo valida o no
function asignarNivel (){
    document.querySelector("#pAsignarNivel").innerHTML = "";
    let nombreUsuario = document.querySelector("#txtNomAlumno").value ;
    let nivelAsignado = document.querySelector("#selNivel").value ;
    let asignado = false;
    if(validarCampoLleno(nombreUsuario)){
        asignado = asignarNivelUsuario (nombreUsuario, nivelAsignado);
        if(asignado){
            document.querySelector("#pAsignarNivel").innerHTML = "Nivel asignado";
        }else{

        }
    }else{
        document.querySelector("#errorAsignarNivel").innerHTML = "Debe ingresar un nombre";
    }

}

//Funcion para mostrar alumnos por docente 
function mostrarXDocente(){
    let alumnosDocente = buscarAlumnosPorDocente(usuarioLoggeado);
    let mensaje = alumnosDocente;
    if (mensaje !== ""){
        document.querySelector("#divMostrarTablaXDocente").innerHTML = mensaje;
        let filasDeTabla = document.querySelectorAll(".tabFilaAsignarNivel"); //Sumo funcionalidad para que pueda seleccionar un alumno de la tabla para asignar nivel
        for(let i=0; i<filasDeTabla.length; i++){
            const element = filasDeTabla[i];
            element.addEventListener("click", setValuetxtNomAlumno);
        }
    }else{
        document.querySelector("#errorMostrarAlumnosXDocente").innerHTML = "No tiene alumnos asignados";
    }
}

//Funcion que muestra interfaz docente asignar nivel
function mostrarAsignarNivel(){ // Cuando toque el boton "asignar nivel" voy a ver la seccion (Asignar nivel a alumnos)
    limpiar(); //limpio campos de texto y mensajes al usuario
    document.querySelector("#divMostrarTablaXDocente").innerHTML = ""; //limpio tabla por posible interaccion anterior
    document.querySelector("#homeDocente").style.display = "block"; //Habilito division docente
    document.querySelector("#divAsignarNivel").style.display = "block"; // muestro asignar nivel
    document.querySelector("#bodyHome").style.display = "none"; //Oculto body bienvenida
    document.querySelector("#divPlantearEje").style.display = "none"; // oculto plantear ejercicios a alumnos
    document.querySelector("#divDevoluciones").style.display = "none"; // oculto redactar devoluciones a tareas
    document.querySelector("#divEstadisticas").style.display = "none"; // oculto visualizar estadisticas
}

//Funcion que muestra interfaz docente mostrar plantear ejercicios
function mostrarPlantearEje(){ // Cuando toque el boton "plantear ejercicios" voy a ver la seccion (plantear tarea a alumnos)
    limpiar(); //limpio campos de texto y mensajes al usuario
    document.querySelector("#divDevoluciones").style.display = "none"; // oculto redactar devoluciones a tareas
    document.querySelector("#homeDocente").style.display = "block"; //Habilito division docente
    document.querySelector("#bodyHome").style.display = "none"; //Oculto body bienvenida
    document.querySelector("#divAsignarNivel").style.display = "none"; // oculto plantear ejercicios a alumnos
    document.querySelector("#divPlantearEje").style.display = "block"; // muestro plantear tarea
    document.querySelector("#divEntregas").style.display = "none"; // oculto redactar devoluciones a tareas
    document.querySelector("#divEstadisticas").style.display = "none"; // oculto visualizar estadisticas
}

//Funcion que muestra interfaz docente devoluciones
function mostrarDevoluciones(){ // Cuando toque el boton "devoluciones" voy a ver la seccion (hacer devoluciones)
    limpiar(); //limpio campos de texto y mensajes al usuario
    document.querySelector("#homeDocente").style.display = "block"; // habilito division docente
    document.querySelector("#bodyHome").style.display = "none"; // oculto body bienvenida
    document.querySelector("#divAsignarNivel").style.display = "none"; // oculto plantear ejercicios a alumnos
    document.querySelector("#divPlantearEje").style.display = "none"; // oculto plantear tarea
    document.querySelector("#divEntregas").style.display = "none"; // oculto tabla
    document.querySelector("#divDevoluciones").style.display = "block"; // muestro redactar devoluciones a tareas
    document.querySelector("#divEstadisticas").style.display = "none"; // oculto visualizar estadisticas
}

//Funcion que muestra interfaz docente estadisticas
function mostrarEstDocente(){ // Cuando toque el boton "estadisticas" voy a ver la seccion (ver estadisticas)
    limpiar(); //limpio campos de texto y mensajes al usuario
    document.querySelector("#homeDocente").style.display = "block"; //Habilito division docente
    document.querySelector("#bodyHome").style.display = "none"; //Oculto body bienvenida
    document.querySelector("#divAsignarNivel").style.display = "none"; // oculto plantear ejercicios a alumnos
    document.querySelector("#divPlantearEje").style.display = "none"; // oculto plantear tarea
    document.querySelector("#divDevoluciones").style.display = "none"; // oculto redactar devoluciones a tareas
    document.querySelector("#divEstadisticas").style.display = "block"; // muestro visualizar estadisticas
    generarListaAlumnos();
}

//Funcion que muestra interfaz ejercicios de alumnos
function mostrarEjAlumnos(){
    limpiar(); //limpio campos de texto y mensajes al usuario
    document.querySelector("#bodyHome").style.display = "none"; // oculto bodyhome
    document.querySelector("#divEstAlumnos").style.display = "none"; // oculto plantear tarea
    document.querySelector("#divEntAlumno").style.display = "none"; // oculto entregas
    document.querySelector("#homeAlumno").style.display = "block"; // habilito la div homealumno
    document.querySelector("#divEjalumnos").style.display = "block"; // habilito la div divejalumnos
    document.querySelector("#divBuscadorEj").style.display = "block"; // habilito la div buscadorEj
    generarTablaEj();
}

//Funcion que muestra interfaz entrega alumnos
function mostrarEntAlumnos(){
    limpiar(); //limpio campos de texto y mensajes al usuario
    document.querySelector("#bodyHome").style.display = "none"; // oculto bodyhome
    document.querySelector("#divEstAlumnos").style.display = "none"; // oculto plantear tarea
    document.querySelector("#homeAlumno").style.display = "block"; // habilito la div homealumno
    document.querySelector("#divEntAlumno").style.display = "block"; // habilito la div homealumno
    document.querySelector("#divEjalumnos").style.display = "none"; // oculto la div divejalumnos
    document.querySelector("#divBuscadorEj").style.display = "none"; // oculto la div buscadorEj
    generarTablaEnt();
}

//Funcion que muestra interfaz estadisticas alumnos
function mostrarEstAlumnos(){
    limpiar(); //limpio campos de texto y mensajes al usuario
    document.querySelector("#divBuscadorEj").style.display = "none"; // oculto la div buscadorEj
    //document.querySelector("#btnEntregaEj").style.display = "none"; // oculto boton de entrega de tarea
    document.querySelector("#bodyHome").style.display = "none"; // oculto bodyhome
    document.querySelector("#divEjalumnos").style.display = "none"; // oculto div divejalumnos
    document.querySelector("#divEntAlumno").style.display = "none"; // oculto la div homealumno
    document.querySelector("#homeAlumno").style.display = "block"; // habilito el homealumno
    document.querySelector("#divEstAlumnos").style.display = "block"; // oculto plantear tarea
    generarEstadisticasAlumno();
}

//funcion para generar tablar con los ejercicios del docente y nivel indicados y sin entrega realizada
function generarTablaEj (){
    buscarEjXNivDocEntrega();
    document.querySelector("#divEjalumnos").innerHTML = `<table id="tabEjAlumno" border='2px' style='background-color: #FA047F; position: relative;'>
    <th>Título</th><th>Docente</th><th>Nivel</th>`;
    for(let iterador = 0; iterador<= ejerciciosAMostrar.length-1; iterador ++){
        document.querySelector("#tabEjAlumno").innerHTML += `<tr id="${iterador}" class="filaEjercicioAlumno"> <td style="padding: 10px"> ${ejerciciosAMostrar[iterador].titulo} </td> <td style="padding: 10px"> ${ejerciciosAMostrar[iterador].Docente.nombre} </td><td style="padding: 10px"> ${ejerciciosAMostrar[iterador].nivel} </td> </tr>`;
    }
    addEventsTablaEj();
}

//Agrego evento click a las filas de la tabla de la funcion ejercicios para alumnos
function addEventsTablaEj(){
    let filasDeTabla = document.querySelectorAll(".filaEjercicioAlumno"); //Sumo funcionalidad para mostrar ejercicio al alumno
    for(let i=0; i<filasDeTabla.length; i++){
        const element = filasDeTabla[i];
        element.addEventListener("click", mostrarEjElegido);
    }
}

//Funcion para mostrar ejercicio elegido desde la tabla por el alumno
function mostrarEjElegido(){
    let idFila = this.getAttribute("id");
    document.querySelector("#divEjElegido").innerHTML = `
    <p style="font-weight: bold">${ejerciciosAMostrar[idFila].titulo}</p>
    <p>${ejerciciosAMostrar[idFila].descripcion}</p>
    <img height="300px" width="500px" src="${ejerciciosAMostrar[idFila].imgPath}"/><br/>
    <input type="file" id="archivoConId${idFila}">
    <input type="button" id="${idFila}" class="entrega" value="Realizar entrega"><span id="errorEntrega${idFila}" class="error"/></span>
    <hr/>`;
    addEventsEntrega(); 
}


//Funcion que genera la tabla con las entregas del alumno loggeado
function generarTablaEnt(){
    document.querySelector("#divEntAlumno").innerHTML = `<table id="tabEntAlumno" border='2px' style='background-color: #FA047F; position: relative;'>
    <th>Título</th><th>Nivel</th><th>Imagen</th><th>Entrega</th><th>Corrección</th>`;
    for (let i = 0; i < entregas.length; i++) {
        const element = entregas[i].Alumno.nombreUsuario;
        if(element === usuarioLoggeado){
            document.querySelector("#tabEntAlumno").innerHTML += `
            <tr id="filaEntregas${i}" class="filaEntregaAlumno">
            <td style="padding: 10px"> ${entregas[i].Ejercicio.titulo} </td>
            <td style="padding: 10px"> ${entregas[i].Ejercicio.nivel} </td>
            <td style="padding: 10px"><img src="${entregas[i].Ejercicio.imgPath}" height="75px" width="125px"/> </td> 
            <td style="padding: 10px"><audio controls> <source src="${entregas[i].audPath}"/></audio></td>
            <td style="padding: 10px"> ${entregas[i].correccion} </td> 
            </tr>`; 
        }
    } 
    
}

//buscador de ejercicios del alumno (nivel, docente y no entregado)
function realizarBusqueda(){
    let criterioDeBusq = document.querySelector("#buscadorDeEjercicios").value;
    let mensaje = "";
    if (validarCampoLleno(criterioDeBusq)&& criterioDeBusq.length!==1){
        mensaje = buscarSegunCriterio(criterioDeBusq);
        document.querySelector("#divEjElegido").innerHTML = mensaje;
        addEventsEntrega();
    }else{
        document.querySelector("#errorBuscadorDeEjercicios").innerHTML = "Debe llenar el campo con al menos dos caracteres";    
    }
}

//Agrego evento click a los botones de entrega de ejercicios para alumnos
function addEventsEntrega(){
    let btnsEntrega = document.querySelectorAll(".entrega"); 
    for(let i=0; i<btnsEntrega.length; i++){
        const element = btnsEntrega[i];
        element.addEventListener("click", realizarEntrega);
    }
}

//Funcion que muestra entregas de alumnos del docente que no tengan devolucion y da la opcion de realizarla
function generarTablaEntregasSinDevolucion(){
    document.querySelector("#divEntregas").style.display = "block";
    document.querySelector("#divEntregas").innerHTML = `<table id="tabEntregas" border='2px' style='background-color: #FA047F; position: relative;'>
    <th>Alumno</th><th>Nivel</th><th>Título</th><th>Audio</th><th>Corrección</th><th>Realizar devolución</th>
    </table>`
    ;
    for (let i = 0; i < entregas.length; i++) {
        const element = entregas[i].Alumno.Docente.nombreUsuario;
        if(element === usuarioLoggeado && !entregas[i].devolucion){
            document.querySelector("#tabEntregas").innerHTML += `<tr id="${i}" class="filaEntregasSinDev"> 
            <td style="padding: 10px"> ${entregas[i].Alumno.nombre} </td>
            <td style="padding: 10px"> ${entregas[i].Alumno.nivel} </td>
            <td style="padding: 10px"> ${entregas[i].Ejercicio.titulo} </td>
            <td style="padding: 10px"><audio controls><source src="${entregas[i].audPath}"></audio></td> 
            <td><textarea id="devolucion${i}"></textarea> 
            <td style="padding: 10px"> <input type="button" id="i${i}" class="btnEntrega "value="Enviar"></td>
            </tr>`;
        }
    }
    let botones = document.querySelectorAll(".btnEntrega");
    for(let i=0; i<botones.length; i++){
        const element = botones[i];
        element.addEventListener("click", realizarDevolucion);
    }
}

//Una vez dado el click en realizar devolucion modifica el objeto Entrega
function realizarDevolucion(){
    let i = this.getAttribute("id");
    i = i.charAt(1);
    let textoDevolucion = document.querySelector(`#devolucion${i}`).value;
    if(validarCampoLleno(textoDevolucion)){
        entregas[i].correccion = textoDevolucion;
        entregas[i].devolucion = true;
        generarTablaEntregasSinDevolucion();
    }else{
        document.querySelector(`#devolucion${i}`).value = "Ingrese una devolución!";
    }
}

//Funcion que genera la lista de los alumnos del docente
function generarListaAlumnos(){
    for (let i = 0; i < usuarios.length; i++) {
        const element = usuarios[i].perfil;
        if(element === "alumno"){
            if(usuarios[i].Docente.nombreUsuario === usuarioLoggeado){
                document.querySelector("#selEstAlumnos").innerHTML +=`
                <option value="i${i}]">${usuarios[i].nombre} (${usuarios[i].nombreUsuario})</options>
                `;
            }
        }    
    }
}

//Funcion que muestra las estadisticas del alumno que el docente seleccione del desplegable
function mostrarEstAlumnosParaDocente(){
    let contadorEjXNivel = 0;//variable para contar cuantos ejercicios planteo el docente para el nivel del alumno
    let contadorEntXNivel = 0;//variable para contar cuantos ejercicios de su nivel entrego el alumno
    let alumnoSeleccionado = document.querySelector("#selEstAlumnos").value;
    let posicionUsuario = alumnoSeleccionado.charAt(1);
    let usuario = usuarios[posicionUsuario];
    let nivelAlumno = usuario.nivel;
    for (let i = 0; i < ejercicios.length; i++){
        const element = ejercicios[i].Docente.nombreUsuario;
        if(element === usuarioLoggeado){
            if(ejercicios[i].nivel === nivelAlumno){
                contadorEjXNivel ++;
            }
        }
    }
    for (let i = 0; i < entregas.length; i++) {
        const element = entregas[i].Alumno.nombreUsuario;
        if(element === usuario.nombreUsuario){
            if(entregas[i].Ejercicio.nivel === nivelAlumno){
                contadorEntXNivel++;
            }
        }
    }
    document.querySelector("#pMostrarEstAlumnos").innerHTML = `El alumno ${usuario.nombre} tiene ${contadorEjXNivel} ejercicios planteados para su nivel (${nivelAlumno}) sobre los cuales a realizado ${contadorEntXNivel} entrega/s. `;
}

//Funcion que muestra el o los alumnos que mas entregas realizo/aron
function mostrarAlumnoConMasEjerciciosResueltos(){
    let mensaje = `Alumno/s con más ejercicios resueltos: `
    mensaje += buscarAlumnoConMasEjResueltos();
    document.querySelector("#pMostrarAlumnoQueMasResolvio").innerHTML = mensaje;
}

//Funcion que invoca el contador de entregas y lo muestra en pantalla
function mostrarCantEjResueltos(){
    let cantidadEntregas = cantEntregasDocente();
    document.querySelector("#divMostrarResueltos").innerHTML = `Usted tiene en total ${cantidadEntregas} entregas de sus alumnos`;
}