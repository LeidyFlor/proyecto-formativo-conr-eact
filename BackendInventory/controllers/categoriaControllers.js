import categorias from "../modules/Categorias.js";

export const nuevaCategoria = async(req, res, next) =>{
    try {
        const categoria = await categorias.create(req.body)
        res.status(201).json({mensaje: "Categoria creada", categoria})
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

// Muestra todas las collecciones
export const consultarCategorias = async(req, res, next) =>{
    try {
        // Variable donde guardo los datos (categoria)
        const categoria = await categorias.find().sort({tipoDocumento: 1}); //busqueda desde la primera colleccion osea tipo de documento
        res.json(categoria) // Si encuentra los datos osea collecciones las muestra en formato json 
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    
};

// mostrar por parametros
export const consultarCategoria = async(req, res, next) =>{
    try {
        const categoria = await categorias.findById(req.params.id)
        if(!categoria) return res.status(404).json({error: 'Categoria no encontrado'});
        res.json(categoria)
    } catch (error) {
        res.status(400).json({error: 'ID invalido'});
    }
};

export const actualizarCategoria = async(req, res) => {
    try {
        const categoria = await categorias.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}); //new: devuelve el objeto actualizado,runValidator ejecuta la validacion del modelo
        if(!categoria) return res.status(404).json({error: 'Categoria no encontrado'});
        res.json({mensaje: 'Categoria Actualizada', categoria});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const deshabilitarCategoria = async (req, res) => {
    try {

        const categoria = await categorias.findByIdAndUpdate(
            req.params.id,
            { estado: "Inactivo" },
            { new: true }
        );

        if(!categoria) return res.status(404).json({error: "Categoria no encontrada"});

        res.json({
            mensaje: "Categoria deshabilitada",
            categoria
        });

    } catch (error) {
        res.status(400).json({error: "ID invalido"});
    }
};

export const habilitarCategoria = async (req, res) => {
    try {

        const categoria = await categorias.findByIdAndUpdate(
            req.params.id,
            { estado: "Activo" },
            { new: true }
        );

        if(!categoria) return res.status(404).json({error: "Categoria no encontrada"});

        res.json({
            mensaje: "Categoria habilitada",
            categoria
        });

    } catch (error) {
        res.status(400).json({error: "ID invalido"});
    }
};

export const eliminarCategoria = async (req, res) =>{
    try {
        const eliminado = await categorias.findByIdAndDelete(req.params.id, req.body);
        if(!eliminado) return res.status(404).json({error: 'Categoria no encontrada'});
        res.json({mensaje:'Categoria ha sido eliminada'});
    } catch (error) {
        res.status(400).json({error: 'ID invalido'});
    }
}