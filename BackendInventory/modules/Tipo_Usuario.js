import mongoose from "mongoose";//Importar la libreria mongoose

const Schema = mongoose.Schema//Guarda en la variable Schema la clase Schema de mongoose

//Estructura de los datos de la coleccion
const tipoUsuarioSchema = new Schema({
    tipo_usuario: {
        type: String,
        required: true,
        trim: true
    }
});

export default mongoose.model('Tipo_Usuario', tipoUsuarioSchema);//Crea un modelo de monoose
