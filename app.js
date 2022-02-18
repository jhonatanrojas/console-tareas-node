
require("colors");
console.clear();
const { guaradarDB,leerDB} = require("./helpers/guardarArchivo");
const { inquirerMenu,
        pausa,
        leerInput, 
        listadoTareasBorrar,
        confirmar,
        mostrarListadoTareasCheckList} = require("./helpers/inquirer");


const Tareas= require('./models/tareas');
const tareasDB = leerDB();
const tareas = new Tareas();


if(tareasDB){
  //establecer tareas
  tareas.cargarTareasFromArray(tareasDB)
}



const main = async () => {

  let opt = "";

  do {
               //imprime el menu
   opt = await inquirerMenu();
   
   switch (opt) {

     case '1':
       const desc = await leerInput('Descripcion: ');
       tareas.crearTarea(desc);
       break;

     case '2':
        tareas.listadoCompleto();
      break;

     case '3':
        tareas.listarPendientesCompletadas();
        break;

     case '4':
          tareas.listarPendientesCompletadas(false);
        break;

        case '5':
        const ids= await mostrarListadoTareasCheckList(tareas.listadoArr);
         tareas.toggeCompletadas(ids);
        break;
     case '6':
        const id=   await listadoTareasBorrar(tareas.listadoArr);
    
        if(id !=='0'){
          const ok = confirmar('¿Esta Seguro?');
          if(ok){
            tareas.borrarTarea(id);
            console.log('Tarea Borrada');
          }
        }
     
        break;

   }

   guaradarDB(tareas.listadoArr);


    await pausa();

  } while (opt !== "0");

};

main();
