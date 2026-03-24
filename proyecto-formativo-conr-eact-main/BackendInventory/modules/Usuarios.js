import mongoose from "mongoose";//Importar la libreria mongoose

const Schema = mongoose.Schema//Guarda en la variable Schema la clase Schema de mongoose

//Estructura de los datos de la coleccion
const usuarioSchema = new Schema({

    //Campos donde se guardaran los datos del usuario
    nombre: {
        type: String,
        trim: true //campos del nombre
    },
    tipoDocumento: {
        type: String,
        trim: true //Elimina los espacios en blanco al inicio
    },
    numDocumento: {
        type: Number,
        trim: true
    },
    tipoUsuario: {
        type: String,
        trim: true,
    },
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    },
    fechaInicio: {
        type: Date,
        trim: true
    },
    fechaFin: {
        type: Date,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    },
    direccion: {
        type: String,
        trim: true
    },
    telefonoDos: {
        type: String,
        trim: true
    },
    emailInstitucional: {
        type: String,
        trim: true
    }

});

export default mongoose.model('Usuarios', usuarioSchema);//Crea un modelo de monoose
