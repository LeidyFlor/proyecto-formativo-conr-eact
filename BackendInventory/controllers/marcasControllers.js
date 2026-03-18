import usuarios from "../modules/Marcas.js";

export const nuevaMarca = async(req, res, next) =>{
    try {
        const marca = await marcas.create(req.body)
        res.status(201).json({mensaje: "Marca creada", marca})
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
};

// Muestra todas las collecciones
export const consultarMarcas = async(req, res, next) =>{
    try {
        // Variable donde guardo los datos (Marcas)
        const marca = await marcas.find().sort({tipoDocumento: 1}); //busqueda desde la primera colleccion osea tipo de documento
        res.json(marca) // Si encuentra los datos osea collecciones las muestra en formato json 
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    
};

// mostrar por parametros
export const consultarMarca = async(req, res, next) =>{
    try {
        const marca = await marcas.findById(req.params.id)
        if(!marca) return res.status(404).json({error: 'Marca no encontrada'});
        res.json(marca)
    } catch (error) {
        res.status(400).json({error: 'ID invalido'});
    }
};

export const actualizarMarca = async(req, res) => {
    try {
        const marca = await marcas.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}); //new: devuelve el objeto actualizado,runValidator ejecuta la validacion del modelo
        if(!marca) return res.status(404).json({error: 'marca no encontrada'});
        res.json({mensaje: 'marca Actualizado', marca});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const deshabilitarMarca = async (req, res) => {
    try {

        const marca = await marcas.findByIdAndUpdate(
            req.params.id,
            { estado: "Inactivo" },
            { new: true }
        );

        if(!marca) return res.status(404).json({error: "marca no encontrada"});

        res.json({
            mensaje: "Marca deshabilitado",
            usuario
        });

    } catch (error) {
        res.status(400).json({error: "ID invalido"});
    }
};

export const habilitarMarca = async (req, res) => {
    try {

        const marca = await marcas.findByIdAndUpdate(
            req.params.id,
            { estado: "Activo" },
            { new: true }
        );

        if(!marca) return res.status(404).json({error: "Marca no encontrada"});

        res.json({
            mensaje: "marca habilitado",
            usuario
        });

    } catch (error) {
        res.status(400).json({error: "ID invalido"});
    }
};

export const eliminarmarca = async (req, res) =>{
    try {
        const eliminado = await marcas.findByIdAndDelete(req.params.id, req.body);
        if(!eliminado) return res.status(404).json({error: 'Marca no encontrada'});
        res.json({mensaje:'Marca ha sido eliminada'});
    } catch (error) {
        res.status(400).json({error: 'ID invalido'});
    }
}