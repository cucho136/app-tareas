const Tarea = require("./tarea");



class Tareas {

    _listado={};

    get listadoArr(){
        const listado =[]

        Object.keys(this._listado).forEach( key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
        });


        return listado;
    }


    constructor(){
        this._listado={};
    }

    cargarTareasFromArray( tareas =[]){

        tareas.forEach( tarea =>{
            this._listado[tarea.id]= tarea;

        });



    }

    borrarTarea(id =''){
        if (this._listado[id]){
            delete this._listado[id];
        }
    }

    crearTarea( desc=''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id]= tarea;
    }

    listaCompleto(){
        console.log();
        let i=0;
        this.listadoArr.forEach( (tarea) =>{
            i+=1;
            if (tarea.completadoEn === null){
                console.log(`${i}. ${tarea.desc} :: ${'Pendiente'.red}`);

            }else{
                console.log(`${i}. ${tarea.desc} :: ${'Completada'.green}`);
            }

        });
    }


    listarPendientesompletadas(completadas = true){

        let i=0;
        let j =0;
        console.log()
        this.listadoArr.forEach( (tarea) =>{
            if (!completadas){
                if (tarea.completadoEn === null){
                    i+=1;
                    console.log(`${(i.toString()+',').green}. ${tarea.desc} :: ${'Pendiente'.red}`);
                }
            }else{
                if (tarea.completadoEn !== null){     
                j= j+1;
                console.log(`${(j.toString()+'.').green} ${tarea.desc} :: ${tarea.completadoEn.green}`);
                }
            }

        });


    }

    toogleCompletadas(ids = []){

        ids.forEach(id =>{

            const tarea = this._listado[id];
            if (!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();

            }

        });


        this.listadoArr.forEach( tarea =>{
            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;

            }
        })

    }


}


module.exports= Tareas