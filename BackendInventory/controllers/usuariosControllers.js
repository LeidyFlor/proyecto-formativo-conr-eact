import usuarios from "../modules/Usuarios.js";

export const nuevoUsuario = async(req, res, next) =>{
    try {
        const usuario = await usuarios.create(req.body)
        res.status(201).json({mensaje: "Usuario creado", usuario})
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

// Muestra todas las collecciones
export const consultarUsuarios = async(req, res, next) =>{
    try {
        // Variable donde guardo los datos (Usuarios)
        const usuario = await usuarios.find().sort({tipoDocumento: 1}); //busqueda desde la primera colleccion osea tipo de documento
        res.json(usuario) // Si encuentra los datos osea collecciones las muestra en formato json 
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    
};

// mostrar por parametros
export const consultarUsuario = async(req, res, next) =>{
    try {
        const usuario = await usuarios.findById(req.params.id)
        if(!usuario) return res.status(404).json({error: 'Usuario no encontrado'});
        res.json(usuario)
    } catch (error) {
        res.status(400).json({error: 'ID invalido'});
    }
};

export const actualizarUsuario = async(req, res) => {
    try {
        const usuario = await usuarios.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}); //new: devuelve el objeto actualizado,runValidator ejecuta la validacion del modelo
        if(!usuario) return res.status(404).json({error: 'Usuario no encontrado'});
        res.json({mensaje: 'Usuario Actualizado', usuario});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const deshabilitarUsuario = async (req, res) => {
    try {

        const usuario = await usuarios.findByIdAndUpdate(
            req.params.id,
            { estado: "Inactivo" },
            { new: true }
        );

        if(!usuario) return res.status(404).json({error: "Usuario no encontrado"});

        res.json({
            mensaje: "Usuario deshabilitado",
            usuario
        });

    } catch (error) {
        res.status(400).json({error: "ID invalido"});
    }
};

export const habilitarUsuario = async (req, res) => {
    try {

        const usuario = await usuarios.findByIdAndUpdate(
            req.params.id,
            { estado: "Activo" },
            { new: true }
        );

        if(!usuario) return res.status(404).json({error: "Usuario no encontrado"});

        res.json({
            mensaje: "Usuario habilitado",
            usuario
        });

    } catch (error) {
        res.status(400).json({error: "ID invalido"});
    }
};

export const eliminarUsuario = async (req, res) =>{
    try {
        const eliminado = await usuarios.findByIdAndDelete(req.params.id, req.body);
        if(!eliminado) return res.status(404).json({error: 'Usuario no encontrado'});
        res.json({mensaje:'Usuario ha sido eliminado'});
    } catch (error) {
        res.status(400).json({error: 'ID invalido'});
    }
}