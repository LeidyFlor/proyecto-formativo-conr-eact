import prestamos from "../modules/Prestamos.js";
import RetornarPrestamo from "../modules/RetornarPrestamos.js";


// Retornar préstamo
export const retornarPrestamo = async (req, res) => {
    try {
        const { id_prestamo, observacion_retorno, observacion_aceptar_retorno } = req.body;

        // Validar que el préstamo exista
        const prestamo = await prestamos.findById(id_prestamo);
        if (!prestamo) {
            return res.status(404).json({ error: 'Préstamo no encontrado' });
        }

        // Crear registro de retorno
        const retorno = await RetornarPrestamo.create({
            id_prestamo,
            observacion_retorno,
            observacion_aceptar_retorno
        });

        // Actualizar estado del préstamo a "Retornado"
        await prestamos.findByIdAndUpdate(
            id_prestamo,
            { estado: "Retornado" },
            { new: true }
        );

        res.status(201).json({ 
            mensaje: "Préstamo retornado exitosamente", 
            retorno 
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Consultar todos los retornos
export const consultarRetornos = async (req, res) => {
    try {
        const retornos = await RetornarPrestamo.find()
            .populate('id_prestamo');
        res.json(retornos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Consultar retorno por ID
export const consultarRetorno = async (req, res) => {
    try {
        const retorno = await RetornarPrestamo.findById(req.params.id)
            .populate('id_prestamo');
        if (!retorno) return res.status(404).json({ error: 'Retorno no encontrado' });
        res.json(retorno);
    } catch (error) {
        res.status(400).json({ error: 'ID inválido' });
    }
};