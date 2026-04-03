import mongoose from "mongoose";//Importar la libreria mongoose

const Schema = mongoose.Schema//Guarda en la variable Schema la clase Schema de mongoose

//Estructura de los datos de la coleccion
const tipoDocumentoSchema = new Schema({
    tipo_documento: {
        type: String,
        required: true,
        trim: true
    }
});

export default mongoose.model('Tipo_Documento', tipoDocumentoSchema);//Crea un modelo de monoose

