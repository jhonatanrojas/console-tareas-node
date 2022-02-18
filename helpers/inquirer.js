const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
    type:'list',
    name:'opcion',
    message:'Que desea hacer?',
    choices:[
      {
          value: '1',
          name: `${'1.'.green} Crear Tarea`
 
      },
      {
          value: '2',
          name: `${'2.'.green} Listar tarea`
      },
      {
        value: '3',
        name: `${'3.'.green} Listar tareas completadas`
      },
      {
          value: '4',
          name: `${'4.'.green} Listar tareas pendientes`
      },
      {
          value: '5',
          name: `${'5.'.green} Completar tarea`

      },
      {
          value: '6',
          name: `${'6.'.green} Borrar tarea`
      },
      {
          value: '0',
          name: `${'0.'.green} Salir`
      }
          ]
    }
]

const inquirerMenu = async() =>
{

    console.clear();

    console.log('====================='.green);
    console.log('Seleccione una opcion'.white);
    console.log('=====================\n'.green);

  const { opcion }=   await inquirer.prompt(preguntas);

  return opcion;
}


const pausa = async() =>
{
    const mensaje = [
        {
        type:'input',
        name:'pasua',
        message:`\nPresione  ${'ENTER'.green} para continuar \n`,
        choices:[]
        }
    ]
    
    const { opcion }=   await inquirer.prompt(mensaje);

    return opcion;
    
}
const leerInput = async( message) => {

    const question = [
        {
            type:'input',
            name:'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt(question);
   
    return desc;
}

const listadoTareasBorrar = async( tareas=[]) => {

    choices = tareas.map((tarea,i) =>{
        const idx  = `${i+1}`.green;
        return {
            value:tarea.id,
            name: `${idx}.  ${tarea.desc}`

        }
    });

    choices.unshift({
        value:'0',
        name:'0.'.green+ ' Cancelar'
    })
  
const preguntas = [
    {
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices

    }
];

    const { id } = await inquirer.prompt(preguntas);
    return id;




}


const mostrarListadoTareasCheckList = async( tareas=[]) => {

    choices = tareas.map((tarea,i) =>{
        const idx  = `${i+1}`.green;
        return {
            value:tarea.id,
            name: `${idx}.  ${tarea.desc}`, 
            checked: (tarea.completadoEn) ?true : false

        }
    });

    choices.unshift({
        value:'0',
        name:'0.'.green+ ' Cancelar'
    })
  
const pregunta = [
    {
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione',
        choices

    }
];

    const { ids } = await inquirer.prompt(pregunta);
    return ids;




}

const confirmar = async (mensaje) => {
    const pregunta = [
        { 
            type: 'confirm',
            name: 'ok',
            message: mensaje,
        }
    ]

    const { ok } = await inquirer.prompt(pregunta);
return ok;

}


module.exports ={
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoTareasCheckList
}