class Alumno{
    constructor(){
        this.nombre;
        this.nombreUsuario;
        this.clave;
        this.perfil = "alumno"; 
        this.nivel = "inicial"; 
        this.Docente;
        this.entregasEjercicio = [];
    }
}

class Docente{
    constructor(){
        this.nombre;
        this.nombreUsuario;
        this.clave;
        this.perfil = "docente";
    }
}

let idEjercicio = 1;
class Ejercicio{
    constructor(){
        this.id = idEjercicio;
        this.nivel;
        this.titulo;
        this.descripcion;
        this.imgPath;
        this.Docente;
        idEjercicio ++;
    }
}

let idEntrega = 1;
class Entrega{
    constructor(){
        this.id = idEntrega;
        this.Ejercicio;
        this.Alumno;
        this.audPath;
        this.correccion = "Sin corregir";
        this.devolucion = false;
        idEntrega ++;
    }
}


