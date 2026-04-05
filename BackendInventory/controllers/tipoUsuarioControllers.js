import tiposusuarios from "../modules/Tipo_Usuario.js";

export const nuevoTipoUsuario = async(req, res, next) =>{
    try {
        const tipousuario = await tiposusuarios.create(req.body)
        res.status(201).json({mensaje: "Tipo de usuario creado", tipousuario})
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

// Muestra todas las collecciones
export const consultarTipoUsuarios = async(req, res, next) =>{
    try {
        // Variable donde guardo los datos (tipo de usuarios)
        const tipousuario = await tiposusuarios.find().sort({tipoDocumento: 1}); //busqueda desde la primera colleccion osea tipo de documento
        res.json(tipousuario) // Si encuentra los datos osea collecciones las muestra en formato json 
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    
};

// mostrar por parametros
export const consultarTipousuario = async(req, res, next) =>{
    try {
        const tipousuario = await tiposusuarios.findById(req.params.id)
        if(!tipousuario) return res.status(404).json({error: 'Tipo de usuario no encontrado'});
        res.json(tipousuario)
    } catch (error) {
        res.status(400).json({error: 'ID invalido'});
    }
};

export const actualizarTipoUsuario = async(req, res) => {
    try {
        const tipousuario = await tiposusuarios.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}); //new: devuelve el objeto actualizado,runValidator ejecuta la validacion del modelo
        if(!tipousuario) return res.status(404).json({error: 'Tipo de usuario no encontrado'});
        res.json({mensaje: 'Tipo de usuario Actualizado', tipousuario});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const deshabilitarTipoUsuario = async (req, res) => {
    try {

        const tipousuario = await tiposusuarios.findByIdAndUpdate(
            req.params.id,
            { estado: "Inactivo" },
            { new: true }
        );

        if(!tipousuario) return res.status(404).json({error: "Tipo de usuario no encontrado"});

        res.json({
            mensaje: "tipo de usuario deshabilitado",
            tipousuario
        });

    } catch (error) {
        res.status(400).json({error: "ID invalido"});
    }
};

export const habilitarTipoUsuario = async (req, res) => {
    try {

        const tipousuario = await tiposusuarios.findByIdAndUpdate(
            req.params.id,
            { estado: "Activo" },
            { new: true }
        );

        if(!tipousuario) return res.status(404).json({error: "Tipo de usuario no encontrado"});

        res.json({
            mensaje: "Tipo de usuario habilitado",
            tipousuario
        });

    } catch (error) {
        res.status(400).json({error: "ID invalido"});
    }
};

export const eliminarTipoUsuario = async (req, res) =>{
    try {
        const eliminado = await tiposusuarios.findByIdAndDelete(req.params.id, req.body);
        if(!eliminado) return res.status(404).json({error: 'Tipo de usuario no encontrado'});
        res.json({mensaje:'Tipo de usuario ha sido eliminado'});
    } catch (error) {
        res.status(400).json({error: 'ID invalido'});
    }
}