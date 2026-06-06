let totalTarea = 0;
let totalHechos = 0;
let listaTareas = [];
let categorias = ["Trabajo", "Estudio", "Personal", "Urgente", "Otro"];
let optCategoria = "";


class Tarea{
    constructor(tarea, categoria){
        this.tarea = tarea;
        this.categoria = categoria;
    };
    mostrar(){
       // return 'la tarea'+ this.tarea+' con categoria '+this.categoria
       
    }
    agregar(objetoTarea){
        listaTareas.push(objetoTarea);
    }
}
//variables de HTML
let btnAgregar = document.getElementById("agregar"); // Boton agregar elementos a la lista
let btnAgregarCategoria = document.getElementById('btnCategoria');
let inpTarea = document.getElementById("inpTarea");  // variable del input que agrega la tarea del usuario
let sltCategoria = document.getElementById("selCategoria"); //variable del elemento selector de categorias
let inpCategoria = document.getElementById("iCategoria"); //Variable del elemento input categoria nueva
let ulLista = document.getElementById("mostrarLista");
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
})

//Boton que agrega las tareas en el array 
btnAgregar.addEventListener('click', function() {
    let strTarea = inpTarea.value.trim();
    let strCategoria = sltCategoria.value;
    if(strTarea!="" && strCategoria!="" ){
        let objTarea = new Tarea(strTarea,strCategoria);
        objTarea.agregar(objTarea);
        console.log(listaTareas);
        MostarLista(listaTareas);
    }
    // console.log(inpTarea.value);
    // console.log(sltCategoria.value);
})
//Zona de funciones
//Agegar elemento a la lista categoria
function agregarCategoria(inpCategoria){
    let elemento = inpCategoria.trim();
    if(typeof elemento === 'string' && elemento!="" && !categorias.includes(elemento)){
        //categorias.push(elemento);
        categorias.splice(categorias.length-1,0,elemento);
        CrearOpciones(categorias);
        //sltCategoria.insertAdjacentHTML('afterbegin', `<option value="${elemento}">${elemento}</option>`);
        sltCategoria.value = elemento;
        ColocarOcultar();
    }else{
        ColocarOcultar();
        sltCategoria.value = elemento
        sltCategoria.insertAdjacentHTML('afterend', `<p id="mensaje">${elemento} ya está en la lista</p>`)
        console.log("No se puede ingresar")
    }
}

//Agregar la lista de opciones en HTML
function CrearOpciones(categorias) {
    sltCategoria.innerHTML = '';
    if(categorias.length != 0 ){
        for (const categoria of categorias) {
            sltCategoria.insertAdjacentHTML('beforeend', `<option value="${categoria}">${categoria}</option>`)
        }
    }    
}

function MostarLista(listaTareas) {
    //if(listaTareas.length!=0){
    ulLista.innerHTML = '';
        for (const obj of listaTareas) {
            for (const key in obj) {
                ulLista.insertAdjacentHTML('beforeend', `<li>${obj[key]}  </li>`)
                
            }
            
        }
    //}
}


//Funcion ocultar
function removerOcultar(){
    inpCategoria.classList.remove('oculto');
    btnAgregarCategoria.classList.remove('oculto');
}

function ColocarOcultar(){
    inpCategoria.classList.add('oculto');
    btnAgregarCategoria.classList.add('oculto');
}


//llamamos a la funcion crearOpciones
CrearOpciones(categorias);
