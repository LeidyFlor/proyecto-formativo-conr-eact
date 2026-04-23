import mongoose from "mongoose";

const Schema = mongoose.Schema;

const retornarPrestamoSchema = new Schema({
    id_prestamo: {
        type: mongoose.Schema.ObjectId,
        ref: 'Prestamos',
        // Significa que el campo es obligatorio al retornar el prestamo
        required: true
    },
    observacion_retorno: {
        type: String,
        trim: true
    },
    observacion_aceptar_retorno: {
        type: String,
        trim: true
    }

});

export default mongoose.model('RetornarPrestamos', retornarPrestamoSchema);