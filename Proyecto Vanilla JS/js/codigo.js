// FUNCIONES: puedoRegistrarUsuario(), buscaEspacios(), buscaApodoDisponible(), validacionesRegistro(), validarCampoLleno(), validarContrasena(), crearUsuario(), comprobarAcceso(), quitarFakePath(), plantearEj(),asignarNivelUsuario(),buscarAlumnosPorDocente(),setValuetxtNomAlumno(),buscarEjXNivDocEntrega(), buscarSegunCriterio(), buscarPorElTitulo(), buscarPorDescripcion(), busquedaSubstring(), realizarEntrega(), audioEjAlumno(), generarEstadisticasAlumno(),buscarAlumnoConMasEjResueltos(), cantEntregasDocente(), buscarPosicionDelUsuario(), buscaPunto()

//##############################################################################################################################
//##############################################################################################################################

//Funcion que envia el nombre de usuario a validar que este escrito sin espacios y que no este repetido
function puedoRegistrarUsuario (pNombreUsuario){ 
    let retorno = false; //Variable de retorno, si validaciones de usuario vuelven en true entonces modifico variable de retorno
    if(buscaEspacios(pNombreUsuario) && buscaApodoDisponible(pNombreUsuario)){ //Validaciones que si son correctas seran true
        retorno = true;
    }
    return retorno; 
}

//Funcion que busca espacios
function buscaEspacios(string){
    let sinEspacios = true; //voy a retornar un booleano que diga si con nombre de usuario esta libre de espacios
    for (let i = 0;i <= string.length-1; i++){
        let posicionX = string.charAt(i); //capturo el caracter en mi recorrido del "string"
        if (posicionX === " "){
            sinEspacios = false;
        }
    }  
    return sinEspacios;
}

//Funcion que busca coincidencia en los apodos (ingresado nuevo vs registrado en los objetos del array "usuarios")
function buscaApodoDisponible(apodoIngresado){
    let noExisteCoincidencia = true; //Variable para capturar un booleano que me dice si el apodo ya existia 
    let i = 0
    while(noExisteCoincidencia && i<= usuarios.length-1){ 
        let nombreUsuarioX = usuarios[i].nombreUsuario; //Para capturar la propiedad que esta siendo evaluada en el recorrido del array
        nombreUsuarioX = nombreUsuarioX.toLowerCase();
        apodoIngresado = apodoIngresado.toLowerCase();
        if (apodoIngresado === nombreUsuarioX){ //comparo el nombreUsuario ingresado con los que tengan mis objetos como propiedad
            noExisteCoincidencia = false;
            document.querySelector("#errorNombreUsuario").innerHTML = "Usuario existente, seleccione otro nombre de usuario";
        }
        i++;
    }
    return noExisteCoincidencia;
}

//Funcion que envia a validar nombre, nombreusuario y clave
function validacionesRegistro (pNombre, pNombreUsuario, pContrasena){ 
    let retorno = false;
    let retornoNombre = validarCampoLleno(pNombre);
    if (!retornoNombre){
        document.querySelector("#errorNombre").innerHTML = "Debe llenar el campo";
    }
    let retornoNombreUsuario = validarCampoLleno(pNombreUsuario);
    if (!retornoNombreUsuario){
        document.querySelector("#errorNombreUsuario").innerHTML = "Debe llenar el campo";
    }
    let nombreUsuarioDisponible= buscaApodoDisponible(pNombreUsuario);
    let nombreUsuarioSinEspacios  = buscaEspacios(pNombreUsuario);
    if(!nombreUsuarioSinEspacios){
        document.querySelector("#errorNombreUsuario").innerHTML = "El nombre de usuario no puede contener espacios";
    }
    let retornoContrasena = validarContrasena(pContrasena);
    //Si todas las validaciones son true entra al if y cambia el retorno a true
    if(retornoNombre && retornoNombreUsuario && retornoContrasena && nombreUsuarioSinEspacios && nombreUsuarioDisponible){
        retorno = true;
    }
    return retorno;
}

//Funcion que valida que se haya ingresado algo en el campo de texto
function validarCampoLleno(string){
    let retorno = true; //Booleano que, en caso de que hayan ingresado algo en el campo, se devuelve "true"
    if(string.trim().length === 0){
        retorno = false;
    }
    return retorno;
}

//Funcion que valida requisitos contrasenia
function validarContrasena(contrasena){
    let claveValida  = false; //Vamos a convertir a true si aprueba todos los chequeos
    let contMayus = 0;
    let contMin = 0;
    let contNum = 0;
    if (contrasena.length >= 4){ //Minimo 4 caracteres 
        let i = 0;
        while (!claveValida && i <= contrasena.length -1){
                let codigo = contrasena.charCodeAt(i); //Codigo del caracter en la posicion i
                if (codigo >= 65 && codigo <= 90){
                    contMayus = contMayus + 1; //Es mayus
                }
                if (codigo >= 48 && codigo <= 57){
                    contNum = contNum+ 1; //Es num
                }
                if (codigo >= 97 && codigo <= 122){
                    contMin = contMin+ 1; //Es min
                }
                if(contMayus > 0 && contNum > 0 && contMin > 0){ //Si cumpli con el minimo
                    claveValida = true; //Dejo de buscar
                }
                i++;       
        }
    }
    if(!claveValida){ //If para que envie mensaje de error en la contrasena si corresponde
        document.querySelector("#errorContrasena").innerHTML = "Verifique contraseña ingresada (debe contener al menos 4 caracteres, una mayúscula, una minúscula y un número)"; //Muestro boton ingresar
    }
    return claveValida;
}

//Crea el objeto segun perfil y lo agrega a usuarios[]
function crearUsuario(pNombre, pNombreUsuario, pClave, pPerfil){ 
    let perfil;//Para poner el string correspondiente segun perfil 
    if (pPerfil < 2){  //Es docente
        perfil = "docente";
        crearYGuardarDocente(pNombre, pNombreUsuario, pClave, perfil)
    }else { //Es alumno
        perfil = "alumno";
        let posicionDocenteEnUsuarios = 0;
        let docenteAsignado = document.querySelector("#selListaDocentes").value;
        for (let i = 0; i < usuarios.length; i++) {
            const element = usuarios[i].nombreUsuario;
            if(element === docenteAsignado){
                posicionDocenteEnUsuarios = i;
            }
        }
        crearYGuardarAlumno(pNombre, pNombreUsuario, pClave, perfil, "inicial", usuarios[posicionDocenteEnUsuarios], []);
    }
}

//Funcion que valida o niega el acceso a usuario ya registrado
function comprobarAcceso(pNombreUsuario, pClave){
    let posicionUsuarioArray = 0;
    let devuelvo = false; //Instancio variable con false para evitar undefined
    pNombreUsuario = pNombreUsuario.toLowerCase(); 
    let encontrado = false;
    let contrasenaIgual = false;
    let i = 0;
    while (!encontrado && i <= usuarios.length-1){ 
        let nombreUsuarioX = usuarios[i].nombreUsuario;
        nombreUsuarioX = nombreUsuarioX.toLowerCase();
        if (nombreUsuarioX === pNombreUsuario){
            encontrado = true;
            posicionUsuarioArray = i;
        }
            i++;
    }
    if(encontrado){//Si encuentra el usuario entonces compara la clave ingresada con la guardada en el objeto
        if(pClave === usuarios[posicionUsuarioArray].clave){ 
            contrasenaIgual = true;
        }else{
            document.querySelector("#errorIngresarContrasena").innerHTML = "Contraseña incorrecta!";
        }
    }else{
        document.querySelector("#errorIngresarUsuario").innerHTML = "Usuario inexistente o incorrecto!";
    }       
        if (encontrado && contrasenaIgual){
            devuelvo = true;
        }
        
    return devuelvo;
}

//Funcion que quita fakepath de cualquier ruta de archivo
function quitarFakePath(pPath){
    let nombreArchivo = "";
    let barraEncontrada = false;
    let i = pPath.length-1;
    while(i>=0 && !barraEncontrada){
        let carPosicion = pPath[i];
        if(carPosicion === "\\" || carPosicion === "/"){
            barraEncontrada = true;
            posBarra = i;
        }
        i--;
    }
    if(barraEncontrada){
        nombreArchivo = pPath.substr(posBarra + 1);
    }
    return nombreArchivo;
}

//Funcion que genera objeto Ejercicio segun lo ingresa el docente desde el DOM
//Funcion que genera objeto Ejercicio segun lo ingresa el docente desde el DOM
function plantearEj(){
    limpiarMensajesError();
    let nivelEj = document.querySelector("#selNivelEjercicio").value;
    nivelEj = nivelEj.toLowerCase();
    let titulo = document.querySelector("#txtTitulo").value;
    let descripcion = document.querySelector("#txtDesc").value;
    let img = quitarFakePath(document.querySelector("#filImg").value);
    let imgSubida = (img.length>=3); //Variable para determinar upload de tuta de imagen posible
    let imgSubidaExtension = buscaPunto(img);//Variable que dice si es true que tiene un "." (o extension)
    limpiar();
    let titLleno = validarCampoLleno(titulo); //Variable para determinar que titulo tenga algo escrito (para definir si puedo crear el objeto Ejercicio)
    let descLlena = validarCampoLleno(descripcion); //Variable para determinar que descripcion tenga algo escrito (para definir si puedo crear el objeto Ejercicio)
    let titYDesc = false;
    let docente;// variable para guardar docente que genera el Ejercicio
    if(!titLleno){
        document.querySelector("#errorTituloEj").innerHTML = `Ingrese un título`;
    }
    if(!descLlena){
        document.querySelector("#errorDescEj").innerHTML = `Ingrese una descripción`;
    }
    if(!imgSubida || !imgSubidaExtension){
        document.querySelector("#errorImgEj").innerHTML = `Debe subir una imagen`;
    }
    let largoDescTit = `${titulo}${descripcion}`;//Strings sumados para chequeo
    if(titLleno && descLlena){
        if(largoDescTit.length>=20 && largoDescTit.length<=200){//Chequeo que el largo sumado de titulo y descripcion este entre 20 y 200
            titYDesc = true; //Titulo y descripcion prontos para poner en objeto
        }else{
            document.querySelector("#errorTituloEj").innerHTML = `Entre título y descripción debe sumar no menos de 20 caracteres y no más de 200 `;
            document.querySelector("#errorDescEj").innerHTML = `Entre título y descripción debe sumar no menos de 20 caracteres y no más de 200 `;
        }
    }
    let rutaRealImg = `Ejercicios/img/${img}`;//Reescribo la ruta a la imagen subida utilizando la variable img que contiene el nombre del archivo sin el fakepath
    if(titYDesc && imgSubida){
        docente = usuarios[buscarPosicionDelUsuario()];
        crearYGuardarEjercicio(nivelEj, titulo,descripcion, rutaRealImg, docente);
        limpiar();
        document.querySelector("#pTareaSubida").innerHTML = "Ejercicio subido con éxito";
    }
}



//Funcion que recibe un nombre de usuario y un nivel asignado. Evalua y segun corresponda modifica el nivel o envia mensaje de error
function asignarNivelUsuario(pNombreUsuario, pNivelAsignado){
    limpiar();
    let cortarBusqueda = false; // necesito esta variable para solucionar que corte la busqueda si encuentra el usuario pero el nivel asignado esta mal.
    let nivelAsignado = false;
    let existeAlumno = false;
    let retorno = false;
    pNombreUsuario = pNombreUsuario.toLowerCase();
    let i = 0;
    while (i <= usuarios.length-1 && !cortarBusqueda){ //Recorro la lista de usuarios para encontrar el que ingreso el docente
        if(usuarios[i].perfil === "alumno"){
            if(usuarios[i].Docente.nombreUsuario === usuarioLoggeado){ //Con esto selecciono alumnos que tengan al docente loggeado
                limpiarMensajesError()
                let alumnoX = usuarios[i].nombreUsuario; //Alumno en la posicion i
                alumnoX = alumnoX.toLowerCase();
                if (alumnoX === pNombreUsuario){ //Con esto reviso dentro de los alumnos del docente, el nombre de usuario
                    let nivelAlumnoX = usuarios[i].nivel; //Guardo su nivel
                    existeAlumno = true; //Bandera para el mensaje de error
                    //El alumno no puede bajar de nivel ni subir de a 2
                    if (nivelAlumnoX === "inicial" && pNivelAsignado === "intermedio"){
                        usuarios[i].nivel = "intermedio";
                        nivelAsignado = true;
                        cortarBusqueda = true;
                    }else if(nivelAlumnoX === "intermedio" && pNivelAsignado === "avanzado"){
                        nivelAsignado = true;
                        cortarBusqueda = true;
                        usuarios[i].nivel = "avanzado";
                    }else{
                        cortarBusqueda = true;
                        document.querySelector("#errorAsignarNivel").innerHTML = "Nivel invalido"; 
                    }
                }
            }else{
                document.querySelector("#errorAsignarNivel").innerHTML = "Nombre usuario incorrecto (no pertenece al docente o no existe)";
            }
        }
        i++
    }
    if (!existeAlumno){
        document.querySelector("#errorAsignarNivel").innerHTML = "No existe el alumno ingresado o no pertenece a este docente";
    }else if(nivelAsignado){
        retorno = true;
        mostrarXDocente();
    }
    return retorno;
}

//Funcion para mostrar tabla de los alumnos del docente con su respectivo nivel
function buscarAlumnosPorDocente(pDocente){
    let i = 0;
    let mensaje = "";
    let cantAlumnos = 0;
    mensaje = "<table border='2px' style='background-color: #FA047F; position: absolute; right: 150px; top: 250px;'><th>Alumno</th><th>Nivel</th> ";
    while (i <= usuarios.length-1){ 
        if (usuarios[i].perfil === "alumno" && usuarios[i].Docente.nombreUsuario === pDocente){
            mensaje += `<tr class="tabFilaAsignarNivel" id="${usuarios[i].nombreUsuario}"> <td style="padding: 10px"> ${usuarios[i].nombreUsuario} </td> <td style="padding: 10px"> ${usuarios[i].nivel} </td> </tr>`
            cantAlumnos++;
        }
        i++;
    }
    mensaje += "</table>";
    if(cantAlumnos === 0){
        mensaje = "";
    }
    return mensaje;
}

//Funcion para que puedas elegir a que alumno cambiar el nivel desde la tabla
function setValuetxtNomAlumno(){
    let idFila = this.getAttribute("id");
    document.querySelector("#txtNomAlumno").value = idFila;
}

//Funcion que selecciona los ejercicios para el alumnoLoggeado que correspondan a su nivel, su docente y que no este en su array de ejercicios entregados (llena el array ejerciciosAMostrar [global])
function buscarEjXNivDocEntrega(){
    ejerciciosAMostrar = [] //Limpio array
    let docenteDelAlumno; //para chequear ejercicios por docente
    let nivelDelAlumno; // para chequear ejercicios por nivel
    let entregasDelAlumno; //variable para colocar el array con los numeros de ejercicio que el alumno ya entrego
    let entregado = false; //variable que se vuelve true si el ejercicio ya tiene la entrega realizada
    let ite = buscarPosicionDelUsuario();
    docenteDelAlumno = usuarios[ite].Docente.nombreUsuario;
    entregasDelAlumno = usuarios[ite].entregasEjercicio;
    nivelDelAlumno = usuarios[ite].nivel;
    for (let i = 0;i<=ejercicios.length-1;i++){ //busqueda de los ejercicios para el docente del alumno y el nivel del alumno
        if (ejercicios[i].Docente.nombreUsuario === docenteDelAlumno && ejercicios[i].nivel === nivelDelAlumno){
            ejercicioId = ejercicios[i].id;
            let ite = 0;
            while(ite<= entregasDelAlumno.length-1 && !entregado){ //dentro de los ejercicios del docente y el nivel del alumno me fijo cuales no han sido entregados
                const element = entregasDelAlumno[ite];
                if(element === ejercicioId){
                    entregado = true;
                }
                ite++;
            }
            if(!entregado){
                ejerciciosAMostrar.push(ejercicios[i]);
            }
            entregado = false;
        }
    }
}

//Funcion que prepara la busqueda de ejercicios sin entrega por parte del alumno
function buscarSegunCriterio(pCriterioDeBusq){
    buscarEjXNivDocEntrega; //CARGO EN EL ARRAY LOS EJERCICIOS QUE CORRESPONDEN AL ALUMNO
     let mensaje = "";
     mensaje = buscarPorElTitulo (pCriterioDeBusq); //FILTRO LOS EJERCICIOS POR EL TITULO QUE CONTIENEN LA SUBCADENA INGRESADA POR EL USUARIO
     return mensaje;
 }
 
 //Funcion que busca ejercicios por titulo primero y si no encuentra busca en descripcion
function buscarPorElTitulo(pCriterioDeBusq){
    let mensaje = "";
    let retorno = false;
    let i = 0;
    while (i <= ejerciciosAMostrar.length -1){ //RECORRO EJERCICIOS A MOSTRAR
        let tituloEjX = ejerciciosAMostrar[i].titulo; //BUSCO TITULO X DE LOS EJERCICIOS A MOSTRAR
        //CONVIERTO A MINUSCULAS CRITERIO Y TITULO
        tituloEjX = tituloEjX.toLowerCase();
        pCriterioDeBusq = pCriterioDeBusq.toLowerCase();
        retorno = busquedaSubstring(tituloEjX, pCriterioDeBusq);
        if(retorno){
            mensaje +=`<p style="font-weight: bold">${ejerciciosAMostrar[i].titulo}</p>
            <p>${ejerciciosAMostrar[i].descripcion}</p>
            <img height="300px" width="500px" src="${ejerciciosAMostrar[i].imgPath}"/><br/>
            <input type="file" id="archivoConId${i}">
            <input type="button" id="${i}" class="entrega" value="Realizar entrega"><span id="errorEntrega${i}" class="error"/></span>
            <hr/>`;
        }
        i++;
    }
    if (mensaje ===""){//Si mensa
        mensaje = buscarPorDescripcion(pCriterioDeBusq);
        if (mensaje === ""){
            mensaje = "No se encuentran resultados";
        }
    }
return mensaje;
}


//Funcion que se dispara si no tuvo resultados buscando por titulo
function buscarPorDescripcion(pCriterioDeBusq){
    let mensaje = "";
    let i = 0;
    let retorno = false;
    while (i <= ejerciciosAMostrar.length -1){ //RECORRO EJERCICIOS A MOSTRAR
        let descripcionEjX = ejerciciosAMostrar[i].descripcion; //BUSCO DESCRIPCION X DE LOS EJERCICIOS A MOSTRAR
        descripcionEjX = descripcionEjX.toLowerCase();//CONVIERTO A MINUSCULAS DESCRIPCION
        retorno = busquedaSubstring(descripcionEjX, pCriterioDeBusq);
        if(retorno){
            mensaje +=`<p style="font-weight: bold">${ejerciciosAMostrar[i].titulo}</p>
            <p>${ejerciciosAMostrar[i].descripcion}</p>
            <img height="300px" width="500px" src="${ejerciciosAMostrar[i].imgPath}"/><br/>
            <input type="file" id="archivoConId${i}">
            <input type="button" id="${i}" class="entrega" value="Realizar entrega"><span id="errorEntrega${i}" class="error"/></span>
            <hr/>`; 
        }
        i++;
    }
    return mensaje;
}


//Funcion que chequea si un texto (pBusqueda) esta como subtexto dentro de otro (pTexto)
function busquedaSubstring(pTexto, pBusqueda){
    let bandera = false;
    let indice1 = 0;
    let retorno = false;
    let i = 0;
    while(i<pTexto.length && !bandera){
        if(pTexto.charAt(i)===pBusqueda.charAt(0)){
            indice1 = i+1;//Iba a cambiar esto por si ingresa un solo caracter, pero no me parece permitir que busque por un solo caracter
            for(let k = 1; k<pBusqueda.length; k++){
                if(pBusqueda.charAt(k)===pTexto.charAt(indice1)){
                    bandera = true;
                }else{
                    bandera = false;
                }
                indice1 ++;
            }
        }
        i++;
        if(bandera){
            retorno = true;
        }
    }
    return retorno;
}

//Funcion que se activa con los botones para entrega de ejercicios del alumno
function realizarEntrega(){
    let posicionUsuario; // Variable para capturar posicion del objeto Alumno
    let idBtn = this.getAttribute("id");
    let entregaAudio = document.querySelector(`#archivoConId${idBtn}`).value;
    if(validarCampoLleno(entregaAudio)){
        if(buscaPunto(entregaAudio)){
            posicionUsuario = buscarPosicionDelUsuario();
            let rutaRealAudio = audioEjAlumno(entregaAudio);
            crearYGuardarEntregas(rutaRealAudio, usuarios[posicionUsuario], ejerciciosAMostrar[idBtn]);
            console.log(posicionUsuario)
            usuarios[posicionUsuario].entregasEjercicio.push(ejerciciosAMostrar[idBtn].id);//Agrego el numero de id del Ejercicio realizado en el array de entregasEjercicio en el alumno que realizo la entrga
            limpiar();
            generarTablaEj();
        }else{
            document.querySelector(`#errorEntrega${idBtn}`).innerHTML = `Ruta al archivo sin "." (o extensión)`;    
        }
    }else{
        document.querySelector(`#errorEntrega${idBtn}`).innerHTML = `Seleccione archivo para entregar`;
    }
}


//Funcion que genera el parrafo con las estadisticas del alumno
function generarEstadisticasAlumno(){
    let posicionUsuarioEnArray = buscarPosicionDelUsuario();
    let contadorEjParaNivel = 0;//para contar cuantos ejercicios hay planteados para el nivel del alumno
    let docenteDelAlumno = usuarios[posicionUsuarioEnArray].Docente.nombreUsuario;
    let nivelDelAlumno = usuarios[posicionUsuarioEnArray].nivel; 
    for (let j = 0;j<=ejercicios.length-1; j++){ //busqueda de los ejercicios para el docente del alumno y el nivel del alumno
        if (ejercicios[j].Docente.nombreUsuario === docenteDelAlumno && ejercicios[j].nivel === nivelDelAlumno){
            contadorEjParaNivel++;
        }
    }
    let contadorEntregasPorNivel = 0;
    let contadorEntregasSinDevolucion = 0;
    let contadorEntregasConDevolucion = 0;
    for (let k = 0; k < entregas.length; k++) {
        const element = entregas[k].Alumno.nombreUsuario;//para revisar las entregas del alumno loggeado
        if(element === usuarioLoggeado){
            let nivelEntrega = entregas[k].Ejercicio.nivel;
            if(nivelEntrega===nivelDelAlumno){
                contadorEntregasPorNivel++;
            }
            if(entregas[k].devolucion){
                contadorEntregasConDevolucion ++;
            }else{
                contadorEntregasSinDevolucion ++;
            }
        }   
    }
    let entregasTotal = contadorEntregasConDevolucion+contadorEntregasSinDevolucion;
    let promedio = Math.round(100/(contadorEjParaNivel/contadorEntregasPorNivel));
    document.querySelector("#divEstAlumnos").innerHTML = `
    <p>Usted ha realizado la entrega del ${promedio}% de los ejercicios que su docente planteo para su nivel <br/>(el total de ejercicios planteados por su docente para el nivel ${nivelDelAlumno} es de ${contadorEjParaNivel}, usted entregó ${contadorEntregasPorNivel}).<br/><br/>De sus ${entregasTotal} entregas realizadas (independientemente del nivel), usted tiene:<br/>${contadorEntregasConDevolucion} correcciones<br/>${contadorEntregasSinDevolucion} entregas que esperan por su corrección</p> `;
}

//Funcion que genera un string con el o los alumnos con mas entregas realizadas (sin discriminar por nivel)
function buscarAlumnoConMasEjResueltos(){
    let elQueMasResolvio = Number.NEGATIVE_INFINITY;
    let nombreMay = "";
    for (let i=1;i <= usuarios.length -1;i++){
        if (usuarios[i].perfil === "alumno"){//Solo chequeo usuarios que sean Alumno
            if(usuarios[i].Docente.nombreUsuario === usuarioLoggeado){//Los alumnos deben corresponder al docente loggeado
                let usuarioX = usuarios[i].nombreUsuario;
                let cantEntregasUserX = usuarios[i].entregasEjercicio.length;
                if (cantEntregasUserX > elQueMasResolvio){
                    nombreMay = usuarioX;
                    elQueMasResolvio = cantEntregasUserX;
                }else if (cantEntregasUserX === elQueMasResolvio){
                    nombreMay += ` - ${usuarioX}`;
                }
            }
       }
    }
    return nombreMay;
}

//Funcion para saber la cantidad de entregas que se han realizado para el docente loggeado
function cantEntregasDocente(){
    let contadorEntregas =0;
    for (let i = 0; i < entregas.length; i++) {
        const element = entregas[i].Alumno.Docente.nombreUsuario;
        if(element === usuarioLoggeado){
            contadorEntregas ++;
        }
    }
    return contadorEntregas;
}

//Funcion para ubicar usuario loggeado para extraer la informacion que necesitemos de el
function buscarPosicionDelUsuario(){
    let posicionUsuarioEnArray;
    let usuarioEncontrado = false;
    let  i=0;
    while(i < usuarios.length && !usuarioEncontrado){
        const element = usuarios[i].nombreUsuario;
        if(element === usuarioLoggeado){
            usuarioEncontrado = true;
            posicionUsuarioEnArray = i;
        }
        i++;
    }
    return posicionUsuarioEnArray;
}

//Funcion que valida que la ruta del archivo tenga un "."
function buscaPunto(string){
    tienePunto = false;
    let i = 0;
    while (i < string.length && !tienePunto){
        const element = string[i];
        if(element === "."){
            tienePunto = true;
        }
        i++
    }
    return tienePunto;
}