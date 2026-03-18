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
    cuentadante: {
        type: mongoose.Schema.ObjectId,
        ref: 'Usuarios'
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
        ref: 'Marcas'
    },
    imagen: { 
        type: String, 
        trim: true 

    },
    //La fecha debe ser automatica
    fechaCreacion: { 
        type: Date, 
        trim: true 
    },
    // Este campo indica qué tipo de material es
}, { discriminatorKey: "tipoMaterial"});

//Para que Materiales_Devolutivos pueda heredar de Materiales
export { materialSchema };

export default mongoose.model('Materiales', materialSchema);//Crea un modelo de mongoose