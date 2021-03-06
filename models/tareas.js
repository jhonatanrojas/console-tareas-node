const Tarea = require("./tarea");

class Tareas {

    _listado= {};

    constructor() {
        this._listado= {};
    }

    borrarTarea(id=''){
       
      if(this._listado[id]){
            delete this._listado[id];
      }

    }

    get listadoArr(){

      const  listado = [];
        Object.keys(this._listado).forEach(key=>{

            const tarea = this._listado[key];
            listado.push(tarea);

        });

        return listado;
    }



     crearTarea(desc = '') {
     
     
      const tarea = new Tarea(desc);
      this._listado[tarea.id] = tarea

     
     }

     cargarTareasFromArray( tareas =[]){

        tareas.forEach(tarea =>{
            this._listado[tarea.id] = tarea
       })


     }

     listadoCompleto(){

        console.log('')
        this.listadoArr.forEach( (tarea,i)=>{
         const idx =     ` ${i +1}`.green;
         const {desc, completadoEn} = tarea;
         const estado = (completadoEn )
                            ? 'Completada'.green
                            : 'Pendiente'.red;
         
        console.log(` ${idx} ${desc} :: ${estado} `);

        });

       
     }

     listarPendientesCompletadas(completadas = true){

      console.log('')
       var index = 1;
        this.listadoArr.forEach( (tarea,i)=>{
         const idx =     ` ${i +1}`.green;
         const {desc, completadoEn} = tarea;
         const estado = (completadoEn )
         ? 'Completada'.green
         : 'Pendiente'.red;

         if(completadas && completadoEn){
            console.log(` ${index} ${desc} :: ${completadoEn} `);
            index ++;

         }else if(!completadas && !completadoEn){

            console.log(` ${index} ${desc} :: ${estado} `); 
            index ++;
         }
  
           

        });

     }

     toggeCompletadas(ids= []){

      ids.forEach(id =>{

         const tarea = this._listado[id];
         if(!tarea.completadoEn){
            tarea.completadoEn = new Date().toISOString();
         }

      })

      this.listadoArr.forEach(tarea => {
         if(!ids.includes(tarea.id)){
            this._listado[tarea.id].completadoEn = null;
         }

      })
     }
}

module.exports = Tareas;