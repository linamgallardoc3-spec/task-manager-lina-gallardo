let totalTarea = 0;
let totalHechos = 0;
let listaTareas = [];
let categorias = ["Trabajo", "Estudio", "Personal", "Urgente", "Otro"];
let optCategoria = "";


class Tarea{
    constructor(tarea, categoria){
        this.tarea = tarea;
        this.categoria = categoria;
        this.estado = '';
    };
    mostrar(){
        return this.tarea+' categoria '+this.categoria
    };
    mostrarEstado(){
        return this.estado;
    }
    cambiarEstado(estado){
        this.estado = estado;
    }
    // agregar(objetoTarea){
    //     listaTareas.push(objetoTarea);
    // }
}
//variables de HTML
let divTarjetas = document.getElementById("tarjetas"); //tarjeta de tareas
let btnAgregar = document.getElementById("agregar"); // Boton agregar elementos a la lista
let btnAgregarCategoria = document.getElementById('btnCategoria');
let inpTarea = document.getElementById("inpTarea");  // variable del input que agrega la tarea del usuario
let sltCategoria = document.getElementById("selCategoria"); //variable del elemento selector de categorias
let inpCategoria = document.getElementById("iCategoria"); //Variable del elemento input categoria nueva
let ulLista = document.getElementById("mostrarLista");
let msj = document.getElementById("mensaje");
//valor inicial de input tarea
document.activeElement

//Funcion que escucha el cambio del selector
sltCategoria.addEventListener('change', function (evento) {
    optCategoria  = evento.target.value
    if(optCategoria=="Otro"){
        removerOcultar();
    }else{
        ColocarOcultar();
    }
})

btnAgregarCategoria.addEventListener('click', function() {
    agregarCategoria(inpCategoria.value);
    inpCategoria.value = "";
})

//Boton que agrega las tareas en el array 
btnAgregar.addEventListener('click', function() {
    let strTarea = inpTarea.value.trim();
    let strCategoria = sltCategoria.value;
    if(strTarea!="" && strCategoria!="" ){
        let objTarea = new Tarea(strTarea,strCategoria);
        listaTareas.push(objTarea);
        MostarLista(listaTareas);
        LimpiarElementos();
        sltCategoria.selectedIndex = 0;
    }
})
//Zona de funciones
//Agegar elemento a la lista categoria
function agregarCategoria(ipCategoria){
    let elemento = ipCategoria.trim();
    if(typeof elemento === 'string' && elemento!="" && !categorias.includes(elemento)){
        categorias.splice(categorias.length-1,0,elemento);
        CrearOpciones(categorias);
        sltCategoria.value = elemento;
        ColocarOcultar();
        msj.classList.add('oculto');
        msj.innerHTML='';
    }else{
        ColocarOcultar();
        sltCategoria.value = elemento;
        msj.classList.remove('oculto');
        msj.innerHTML=`${elemento} ya está en la lista`;
        console.log("No se puede ingresar")
    }
}

//Agregar la lista de opciones en HTML
function CrearOpciones(categorias) {
    sltCategoria.innerHTML = '<option value="">Seleccione una opción</option>';
    if(categorias.length != 0 ){
        for (const categoria of categorias) {
            sltCategoria.insertAdjacentHTML('beforeend', `<option value="${categoria}">${categoria}</option>`)
        }
    }    
}

function MostarLista(listaTareas) {
    divTarjetas.innerHTML = '';

    if(listaTareas.length != 0){
        for (let i = 0; i < listaTareas.length; i++) {
            let identificador = `tarea${i}`
            console.log(listaTareas[i].mostrar());
            divTarjetas.insertAdjacentHTML('beforeend',`
            <div class="tarjeta" id="${identificador}">
                <p class="contenido">
                    ${listaTareas[i].mostrar()}
                </p>
                <div class="t-botones">
                    <button onclick="TareaHecha(${identificador},${i})" class="btnBoton btnAgregar" type="button">Hecha</button>
                    <button onclick="TareaUrgente(${identificador},${i})" class="btnBoton" type="button">Urgente</button>
                    <button onclick="TareaEliminar(${i})" class="btnBoton" type="button">Eliminar</button>
                </div>
            </div>
                `
            );
        }
    }
}


//Funcion ocultar
function removerOcultar(){
    inpCategoria.classList.remove('oculto');
    btnAgregarCategoria.classList.remove('oculto');
    btnOcultar.classList.remove('oculto');
}

function ColocarOcultar(){
    inpCategoria.classList.add('oculto');
    btnAgregarCategoria.classList.add('oculto');
}

//llamamos a la funcion crearOpciones
CrearOpciones(categorias);

//Funcion limpiar elementos y contenido
function LimpiarElementos() {
    msj.innerHTML = '';
    inpTarea.value = '';
    inpCategoria.value = '';
}

//Botones de tarjetas
function TareaHecha(tarj, posicion) {
    listaTareas[posicion].cambiarEstado('Hecho');
    tarj.classList.add('hecho');
    tarj.classList.remove('urgente');
}

function TareaUrgente(tarj, posicion) {
    listaTareas[posicion].cambiarEstado('Urgente');
    tarj.classList.add('urgente');
    tarj.classList.remove('hecho');
}

function TareaEliminar(posicion){
    listaTareas.splice(posicion,1);
    console.log(listaTareas);
    MostarLista(listaTareas);
}