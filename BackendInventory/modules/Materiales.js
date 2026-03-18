import mongoose from "mongoose";

const Schema = mongoose.Schema

const materialSchema = new Schema({

    //Campos donde se guardaran los datos del usuario
    placaSena: { 
        type: String,
        trim: true
    },
    nombreElemento: { 
        type: String, 
        trim: true 
    },
    correoPersonal: { 
        type: String, 
        trim: true 
    },
    descripcion: { 
        type: String, 
        trim: true 
    },
    estado: { 
        type: String, 
        enum: ['Disponible', 'No disponible'],
        trim: true
    },
    cantidad: { 
        type: Number, 
        trim: true 
    },
    valorUnitario: { 
        type: Number, 
        trim: true 
    },
    valorTotal: { 
        type: Number, 
        trim: true 
    },
    ubicacion: { 
        type: String, 
        trim: true 
    },
    //ID de la marca del material
    marca: {
        type: mongoose.Schema.ObjectId,
        ref: 'Marca'
    },
    imagen: { 
        type: String, 
        trim: true 

    },
    fechaCreacion: { 
        type: Date, 
        trim: true 

    },
    // Este campo indica qué tipo de material es
}, { discriminatorKey: "tipoMaterial"});

//Para que Materiales_Devolutivos pueda heredar de Materiales
export { materialSchema };

export default mongoose.model('Materiales', materialSchema);//Crea un modelo de mongoose