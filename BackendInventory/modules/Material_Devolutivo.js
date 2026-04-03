import mongoose from "mongoose";//Importar la libreria mongoose
import Material from "./Materiales.js";


const Schema = mongoose.Schema//Guarda en la variable Schema la clase Schema de mongoose

//Estructura de los datos de la coleccion
const materialesdevolutivosSchema = new Schema({

    //Campos donde se guardaran los datos del usuario
    serial: { 
        type: Number, 
        trim: true   
    },
    modelo: { 
        type: String, 
        trim: true 
    },
    categoria: {
        type: mongoose.Schema.ObjectId,
        ref: 'Categorias',
        required: true
    },
    dimensiones: { 
        type: String, 
        trim: true 

    },
    fichaTecnica: { 
        type: Number, 
        trim: true 
    }

});

export default Material.discriminator( "Material_Devolutivo", materialesdevolutivosSchema);//Crea un modelo de mongoose