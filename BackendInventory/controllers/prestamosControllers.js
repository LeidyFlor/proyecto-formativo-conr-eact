import prestamos from "../modules/Prestamos.js";
import materiales from "../modules/Materiales.js";
import Material_Devolutivo from "../modules/Material_Devolutivo.js";

// Crear prestamos
export const nuevoPrestamo = async(req, res) => {
    try {
        // tipo_de_material: guarda los dos tipos de materiales
        const { tipo_de_material, id_material, id_material_devolutivo } = req.body;

        // Validar tipo_de_material
        if (!['Devolutivo', 'NoDevolutivo'].includes(tipo_de_material)) {
            return res.status(400).json({ 
                error: 'tipo_de_material debe ser "Devolutivo" o "NoDevolutivo"' 
            });
        }

        // Si es Devolutivo, validar que exista id_material_devolutivo
        if (tipo_de_material === 'Devolutivo') {
            if (!id_material_devolutivo) {
                return res.status(400).json({ 
                    error: 'id_material_devolutivo es requerido' 
                });
            }
            const materialDev = await Material_Devolutivo.findById(id_material_devolutivo);
            if (!materialDev) {
                return res.status(404).json({ 
                    error: 'Material devolutivo no encontrado' 
                });
            }
        }

        // Si es NoDevolutivo, validar que exista id_material
        if (tipo_de_material === 'NoDevolutivo') {
            if (!id_material) {
                return res.status(400).json({ 
                    error: 'id_material es requerido' 
                });
            }
            const material = await materiales.findById(id_material);
            if (!material) {
                return res.status(404).json({ 
                    error: 'Material no encontrado' 
                });
            }
        }

        const prestamo = await prestamos.create(req.body);
        res.status(201).json({ mensaje: "Préstamo creado", prestamo });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const consultarPrestamos = async(req, res) => {
    try {
        const prestamo = await prestamos.find()
            // populate es un método de Mongoose que permite que se vea toda la informacion de el modulo de material y material devolutivo y no solo que se permita ver el ID
            .populate('id_material')
            .populate('id_material_devolutivo');
        res.json(prestamo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Mostrar préstamo por ID
export const consultarPrestamo = async(req, res, next) => {
    try {
        const prestamo = await prestamos.findById(req.params.id)
            .populate('id_material')
            .populate('id_material_devolutivo');
        if(!prestamo) return res.status(404).json({error: 'Prestamo no encontrado'});
        res.json(prestamo)
    } catch (error) {
        res.status(400).json({error: 'ID invalido'});
    }
};

// Actualizar préstamo
export const actualizarPrestamo = async(req, res) => {
    try {
        const prestamo = await prestamos.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!prestamo) return res.status(404).json({error: 'Prestamo no encontrado'});
        res.json({mensaje: 'Prestamo Actualizado', prestamo});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Deshabilitar préstamo
export const deshabilitarPrestamo = async (req, res) => {
    try {
        const prestamo = await prestamos.findByIdAndUpdate(
            req.params.id,
            { estado: "Inactivo" },
            { new: true }
        );
        if(!prestamo) return res.status(404).json({error: "Prestamo no encontrado"});
        res.json({mensaje: "Prestamo deshabilitado", prestamo});
    } catch (error) {
        res.status(400).json({error: "ID invalido"});
    }
};

// Habilitar préstamo
export const habilitarPrestamo = async (req, res) => {
    try {
        const prestamo = await prestamos.findByIdAndUpdate(
            req.params.id,
            { estado: "Activo" },
            { new: true }
        );
        if(!prestamo) return res.status(404).json({error: "Prestamo no encontrado"});
        res.json({mensaje: "Prestamo habilitado", prestamo});
    } catch (error) {
        res.status(400).json({error: "ID invalido"});
    }
};

// Eliminar préstamo
export const eliminarPrestamo = async (req, res) => {
    try {
        const eliminado = await prestamos.findByIdAndDelete(req.params.id);
        if(!eliminado) return res.status(404).json({error: 'Prestamo no encontrado'});
        res.json({mensaje:'Prestamo ha sido eliminado'});
    } catch (error) {
        res.status(400).json({error: 'ID invalido'});
    }
}