import mongoose from "mongoose";//Importar la libreria mongoose

const Schema = mongoose.Schema//Guarda en la variable Schema la clase Schema de mongoose

//Estructura de los datos de la coleccion
const categoriaSchema = new Schema({
    nombre_categoria: {
        type: String,
        required: true,
        trim: true
    }
});

export default mongoose.model('Categoria', categoriaSchema);//Crea un modelo de monoose
