import mongoose from "mongoose";//Importar la libreria mongoose

const Schema = mongoose.Schema//Guarda en la variable Schema la clase Schema de mongoose

//Estructura de los datos de la coleccion
const marcaSchema = new Schema({

    //Campos donde se guardaran los datos del usuario
    nombre_marca: {
        type: String,
        trim: true //campos del nombre
    },
    estado: { 
        type: String, 
        enum: ['Disponible', 'No disponible'],
        trim: true
    }
   
   
});

export default mongoose.model('Marcas', marcaSchema);//Crea un modelo de monoose
