const { white } = require('colors');
const inquire = require('inquirer');
require('colors');

const preguntas = [
    {
        type:'list',
        name:'opcion',
        message:'Que desea Hacer?',
        choices : [
            {
                value: '1',
                name:`${'1'.green}. Crear Tarea`
            },


            {
                value: '2',
                name:`${'2'.green}. Listar Tarea`
            },
            {
                value: '3',
                name:`${'3'.green}. Listar Tareas completadas`
            },


            {
                value: '4',
                name:`${'4'.green}. Listar Tareas pendientes`
            },
            {
                value: '5',
                name:`${'5'.green}. Completar Tarea`
            },


            {
                value: '6',
                name:`${'6'.green}. Borrar Tarea`
            },
            {
                value: '0',
                name:`${'0'.green}. Salir`
            }
        ]
    }
]

const espera =[
    {
        type: 'input',
        name: 'enter',
        message: `Presione ${'ENTER'.green} para continuar`
    }
]


const inquireMenu = async () =>{

    console.clear();

    console.log('============================'.green);
    console.log('   Seleccione una opcion   '.white);
    console.log('============================\n'.green);

    const {opcion} = await inquire.prompt(preguntas)

    return opcion;



}

const pausa = async () =>{
    console.log('\n');

    await inquire.prompt(espera);

}


const leerInput = async (mensaje) => {
    const question =[

        {
            type:'input',
            name:'desc',
            message: mensaje,
            validate(value){
                if(value.length==0){
                    return 'Por favor ingrese un valor.';
                }
                return true;
            }
        }

    ];

    const {desc} = await inquire.prompt(question);
    return desc;
}




const listadoTareasBorrar= async (tareas = []) =>{

    const choices = tareas.map( (tarea, idx)=>{
        const i = `${idx+1}.`.green

        return{
            value: tarea.id,
            name: `${i} ${tarea.desc}`

        }

    });

    choices.unshift({
        value:'0',
        name:'0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type:'list',
            name:'id',
            message:'borrar',
            choices:choices
        }
    ]

    const {id} = await inquire.prompt(preguntas);

    return id;

}


const confirmar = async(message) =>{

    const pregunta = [
        {
            type:'confirm',
            name:'ok',
            message:message
        }
    ]

    const {ok} = await inquire.prompt(pregunta);
    return ok;
}





module. exports = {
    inquireMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar
}