let usuarios = [];//instancio el array aca y hago su precarga (array unico para todos los usuarios)
let ejercicios = [];//instancio el array aca y hago su precarga 
let entregas = [];//instancio el array aca y hago su precarga 

preCargaDocentes();
preCargaAlumnos();
preCargaEjercicios();
preCargaEntregas();


function preCargaDocentes(){
    crearYGuardarDocente("Ignacio Correa", "nacho_jazz", "Nacho1234", "docente" );
    crearYGuardarDocente("Alexander Mesano", "xXX_rock_XXx", "El1Mesano", "docente");
    crearYGuardarDocente("Laura Diaz", "Classical", "LaLaLaura1", "docente");
    crearYGuardarDocente("Francisco Aldado", "Oboee", "FranOrt4", "docente");
}

function crearYGuardarDocente(nombre, apodo, contrasena, perfil){
    if( 
        validarCampoLleno(nombre) && 
        buscaEspacios(apodo) &&
        buscaApodoDisponible(apodo) &&
        validarContrasena(contrasena)
    ){
        let nuevoDocente = new Docente();
        nuevoDocente.nombre = nombre;
        nuevoDocente.nombreUsuario = apodo;
        nuevoDocente.clave = contrasena;
        nuevoDocente.perfil = perfil;
        usuarios.push(nuevoDocente);
    }
}

function preCargaAlumnos(){
    crearYGuardarAlumno("Rafael Díaz", "El_Rafa", "Password1", "alumno", "inicial", usuarios[0],[1,2,3]); //4
    crearYGuardarAlumno("Alberto Fernandez", "Presi", "BrasilSelva1", "alumno", "inicial", usuarios[0],[3,4]);//5
    crearYGuardarAlumno("Alan Estol", "Cucú", "Alan1234", "alumno", "inicial", usuarios[0],[2,3,4,6]);//6
    crearYGuardarAlumno("Francisco Servían", "RockAndRoll", "tranSIto99", "alumno", "inicial", usuarios[1],[7]);//7
    crearYGuardarAlumno("Jose Pedro Díaz", "JotaPe", "dogZerX_2", "alumno", "inicial", usuarios[1],[7,8,9,10,11]);//8
    crearYGuardarAlumno("Ruben Rada", "ElRuben", "Totem10", "alumno", "inicial", usuarios[1],[11]);//9
    crearYGuardarAlumno("Sith Barret", "EL_loco", "shineLikeADiamond13", "alumno", "inicial", usuarios[2], [9,10,11]);//10
    crearYGuardarAlumno("Lemmy Kilmister", "Motorhead", "rompE1234", "alumno", "inicial", usuarios[2], []);//11
    crearYGuardarAlumno("Nombre Sumado", "otromas", "Password1", "alumno", "inicial", usuarios[2], []);//12
    crearYGuardarAlumno("Anonimo Perez", "oootromas", "Password2", "alumno", "inicial", usuarios[3], []);//13
    crearYGuardarAlumno("Fin Imaginacion", "NombreRaroMan", "Password3", "alumno", "inicial", usuarios[3], []);//14
    crearYGuardarAlumno("Por Fin", "Ultimo", "Ultimo36", "alumno", "inicial", usuarios[3],[20,21,22]);//15
}

function crearYGuardarAlumno(nombre, apodo, contrasena, perfil, nivel, docente, array){
    if(
        validarCampoLleno(nombre) && 
        buscaEspacios(apodo) &&
        buscaApodoDisponible(apodo) &&
        validarContrasena(contrasena)
    ){
        let nuevoAlumno = new Alumno();
        nuevoAlumno.nombre = nombre;
        nuevoAlumno.nombreUsuario = apodo;
        nuevoAlumno.clave = contrasena;
        nuevoAlumno.perfil = perfil;
        nuevoAlumno.nivel = nivel;
        nuevoAlumno.Docente = docente;
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            nuevoAlumno.entregasEjercicio.push(element);
        }
        usuarios.push(nuevoAlumno);
    }
}

function preCargaEjercicios(){
    crearYGuardarEjercicio("inicial","Titulo1", "Este es el ejercicio precargado 1", "Ejercicios/img/ej1.png", usuarios[0]);
    crearYGuardarEjercicio("inicial", "Titulo2", "Este es el ejercicio precargado 2", "Ejercicios/img/ej2.png", usuarios[0]);
    crearYGuardarEjercicio("inicial", "Titulo3", "Este es el ejercicio precargado 3", "Ejercicios/img/ej3.png", usuarios[0]);
    crearYGuardarEjercicio("inicial", "Titulo4", "Este es el ejercicio precargado 4", "Ejercicios/img/ej4.png", usuarios[0]);
    crearYGuardarEjercicio("inicial", "Titulo5", "Este es el ejercicio precargado 5", "Ejercicios/img/ej5.png", usuarios[0]);
    crearYGuardarEjercicio("inicial", "Titulo6", "Este es el ejercicio precargado 6", "Ejercicios/img/ej6.png", usuarios[0]);
    crearYGuardarEjercicio("inicial", "Titulo7", "Este es el ejercicio precargado 7", "Ejercicios/img/ej7.png", usuarios[1]);
    crearYGuardarEjercicio("inicial", "Titulo8", "Este es el ejercicio precargado 8", "Ejercicios/img/ej8.png", usuarios[1]);
    crearYGuardarEjercicio("inicial", "Titulo9", "Este es el ejercicio precargado 9", "Ejercicios/img/ej9.png", usuarios[1]);
    crearYGuardarEjercicio("inicial", "Titulo10", "Este es el ejercicio precargado 10", "Ejercicios/img/ej1.png", usuarios[1]);
    crearYGuardarEjercicio("inicial", "Titulo11", "Este es el ejercicio precargado 11", "Ejercicios/img/ej2.png", usuarios[1]);
    crearYGuardarEjercicio("inicial", "Titulo12", "Este es el ejercicio precargado 12", "Ejercicios/img/ej3.png", usuarios[1]);
    crearYGuardarEjercicio("inicial", "Titulo13", "Este es el ejercicio precargado 13", "Ejercicios/img/ej4.png", usuarios[2]);
    crearYGuardarEjercicio("inicial", "Titulo14", "Este es el ejercicio precargado 14", "Ejercicios/img/ej5.png", usuarios[2]);
    crearYGuardarEjercicio("inicial", "Titulo15", "Este es el ejercicio precargado 15", "Ejercicios/img/ej6.png", usuarios[2]);
    crearYGuardarEjercicio("inicial", "Titulo16", "Este es el ejercicio precargado 16", "Ejercicios/img/ej7.png", usuarios[2]);
    crearYGuardarEjercicio("inicial", "Titulo17", "Este es el ejercicio precargado 17", "Ejercicios/img/ej8.png", usuarios[2]);
    crearYGuardarEjercicio("inicial", "Titulo18", "Este es el ejercicio precargado 18", "Ejercicios/img/ej9.png", usuarios[2]);
    crearYGuardarEjercicio("inicial", "Titulo19", "Este es el ejercicio precargado 19", "Ejercicios/img/ej1.png", usuarios[3]);
    crearYGuardarEjercicio("inicial", "Titulo20", "Este es el ejercicio precargado 20", "Ejercicios/img/ej2.png", usuarios[3]);
    crearYGuardarEjercicio("inicial", "Titulo21", "Este es el ejercicio precargado 21", "Ejercicios/img/ej3.png", usuarios[3]);
    crearYGuardarEjercicio("inicial", "Titulo22", "Este es el ejercicio precargado 22", "Ejercicios/img/ej4.png", usuarios[3]);
    crearYGuardarEjercicio("inicial", "Titulo23", "Este es el ejercicio precargado 23", "Ejercicios/img/ej5.png", usuarios[3]);
    crearYGuardarEjercicio("inicial", "Titulo24", "Este es el ejercicio precargado 24", "Ejercicios/img/ej6.png", usuarios[3]);
}


function crearYGuardarEjercicio(nivel, titulo, descripcion, imgRuta, docente){
    if( 
        validarCampoLleno(nivel) &&
        validarCampoLleno(titulo) &&
        validarCampoLleno(descripcion) && 
        validarCampoLleno(imgRuta)
    ){
        let nuevoEjercicio = new Ejercicio();
        nuevoEjercicio.nivel = nivel;
        nuevoEjercicio.titulo = titulo;
        nuevoEjercicio.descripcion = descripcion;
        nuevoEjercicio.imgPath = imgRuta;
        nuevoEjercicio.Docente = docente;
        ejercicios.push(nuevoEjercicio);
    }
}

function preCargaEntregas(){
    crearYGuardarEntregas("Ejercicios/audio/ej1.m4a", usuarios[4], ejercicios[0]);
    crearYGuardarEntregas("Ejercicios/audio/ej2.m4a", usuarios[4], ejercicios[1]);
    crearYGuardarEntregas("Ejercicios/audio/ej3.m4a", usuarios[4], ejercicios[2]);
    crearYGuardarEntregas("Ejercicios/audio/ej4.m4a", usuarios[5], ejercicios[3]);
    crearYGuardarEntregas("Ejercicios/audio/ej5.m4a", usuarios[5], ejercicios[2]);
    crearYGuardarEntregas("Ejercicios/audio/ej6.m4a", usuarios[6], ejercicios[1]);
    crearYGuardarEntregas("Ejercicios/audio/ej7.m4a", usuarios[6], ejercicios[2]);
    crearYGuardarEntregas("Ejercicios/audio/ej8.m4a", usuarios[6], ejercicios[3]);
    crearYGuardarEntregas("Ejercicios/audio/ej9.m4a", usuarios[6], ejercicios[5]);
    crearYGuardarEntregas("Ejercicios/audio/ej1.m4a", usuarios[7], ejercicios[6]);
    crearYGuardarEntregas("Ejercicios/audio/ej2.m4a", usuarios[8], ejercicios[6]);
    crearYGuardarEntregas("Ejercicios/audio/ej3.m4a", usuarios[8], ejercicios[7]);
    crearYGuardarEntregas("Ejercicios/audio/ej4.m4a", usuarios[8], ejercicios[8]);
    crearYGuardarEntregas("Ejercicios/audio/ej5.m4a", usuarios[8], ejercicios[9]);
    crearYGuardarEntregas("Ejercicios/audio/ej6.m4a", usuarios[8], ejercicios[10]);
    crearYGuardarEntregas("Ejercicios/audio/ej7.m4a", usuarios[9], ejercicios[11]);
    crearYGuardarEntregas("Ejercicios/audio/ej8.m4a", usuarios[10], ejercicios[8]);
    crearYGuardarEntregas("Ejercicios/audio/ej9.m4a", usuarios[10], ejercicios[9]);
    crearYGuardarEntregas("Ejercicios/audio/ej1.m4a", usuarios[10], ejercicios[10]);
    crearYGuardarEntregas("Ejercicios/audio/ej2.m4a", usuarios[15], ejercicios[19]);
    crearYGuardarEntregas("Ejercicios/audio/ej3.m4a", usuarios[15], ejercicios[20]);
    crearYGuardarEntregas("Ejercicios/audio/ej4.m4a", usuarios[15], ejercicios[21]);
}

function crearYGuardarEntregas(audPath, Alumno, Ejercicio){
    if(
        validarCampoLleno(audPath)
    ){
        let nuevaEntrega = new Entrega();
        nuevaEntrega.audPath = audPath;
        nuevaEntrega.Alumno = Alumno;
        nuevaEntrega.Ejercicio = Ejercicio;
        entregas.push(nuevaEntrega);
    }
}