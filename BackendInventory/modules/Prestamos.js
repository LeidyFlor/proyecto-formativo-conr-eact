import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Todos los campos de la tabla prestamos
const prestamoSchema = new Schema({
    id_material: {
        type: mongoose.Schema.ObjectId,
        ref: 'Materiales'
    },
    id_material_devolutivo: {
        type: mongoose.Schema.ObjectId,
        ref: 'Material_Devolutivo'
    },
    correo_personal: { type: String, trim: true },
    grupo_aprendices: { type: String, trim: true },
    fecha_salida: { type: Date, trim: true },
    justificacion_uso: { type: String, trim: true },
    fecha_entrega: { type: Date, trim: true },
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    },
    tipo_de_material: {
        type: String,
        enum: ['Devolutivo', 'NoDevolutivo'],
        required: true
    },
    tipo_prestamo: { type: String, trim: true },
    cantidad_prestamo: { type: Number, trim: true }
});

export default mongoose.model('Prestamos', prestamoSchema);