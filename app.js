const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquireMenu, pausa, leerInput, listadoTareasBorrar, confirmar} = require('./helpers/inquire');
const Tareas = require('./helpers/models/tareas');

require('colors');






const main = async() =>{


    let opt ='';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }


    do{
    
    
        opt =await inquireMenu();

        switch (opt) {
            case '1':
                const descripcion = await leerInput('Descripcion: ');
                tareas.crearTarea(descripcion);

                
            break;

            case '2':
                tareas.listaCompleto();
            
            break;

            case '3':
                tareas.listarPendientesompletadas(true);
            
            break;
            
            case '4':
                tareas.listarPendientesompletadas(false);
            
            break;

            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr);
                if (id !=='0'){ 
                    const ok = await confirmar('Estas seguro?');
                    if (ok){
                        tareas.borrarTarea(id);
                        console.log('tarea borrada');
                    }
                }
            break;




        }

        guardarDB(tareas.listadoArr);
        if(opt !=='0') await pausa()
    
    }while(opt !=='0');


    //pausa();


}




main();