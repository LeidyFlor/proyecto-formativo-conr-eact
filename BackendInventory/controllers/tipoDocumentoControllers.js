import tiposdocumentos from "../modules/Tipo_Documento.js";

export const nuevoTipoDocumento = async(req, res, next) =>{
    try {
        const tipodocumento = await tiposdocumentos.create(req.body)
        res.status(201).json({mensaje: "Tipo de documento creado", usuario})
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

// Muestra todas las collecciones
export const consultarTipoDocumentos = async(req, res, next) =>{
    try {
        // Variable donde guardo los datos (Usuarios)
        const tipodocumento = await tiposdocumentos.find().sort({tipoDocumento: 1}); //busqueda desde la primera colleccion osea tipo de documento
        res.json(tipodocumento) // Si encuentra los datos osea collecciones las muestra en formato json 
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    
};

// mostrar por parametros
export const consultarTipoDocumento = async(req, res, next) =>{
    try {
        const tipodocumento = await tiposdocumentos.findById(req.params.id)
        if(!tipodocumento) return res.status(404).json({error: 'Tipo de documento no encontrado'});
        res.json(tipodocumento)
    } catch (error) {
        res.status(400).json({error: 'ID invalido'});
    }
};

export const actualizarTipoDocumento = async(req, res) => {
    try {
        const tipodocumento = await tiposdocumentos.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}); //new: devuelve el objeto actualizado,runValidator ejecuta la validacion del modelo
        if(!tipodocumento) return res.status(404).json({error: 'Tipo de documento no encontrado'});
        res.json({mensaje: 'Tipo de documento Actualizado', tipodocumento});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const deshabilitarTipoDocumento = async (req, res) => {
    try {

        const tipodocumento = await tiposdocumentos.findByIdAndUpdate(
            req.params.id,
            { estado: "Inactivo" },
            { new: true }
        );

        if(!tipodocumento) return res.status(404).json({error: "Tipo de documento no encontrado"});

        res.json({
            mensaje: "tipo de documento deshabilitado",
            tipodocumento
        });

    } catch (error) {
        res.status(400).json({error: "ID invalido"});
    }
};

export const habilitarTipoDocumento = async (req, res) => {
    try {

        const tipodocumento = await tiposdocumentos.findByIdAndUpdate(
            req.params.id,
            { estado: "Activo" },
            { new: true }
        );

        if(!tipodocumento) return res.status(404).json({error: "Tipo de documento no encontrado"});

        res.json({
            mensaje: "Tipo de documento habilitado",
            usuario
        });

    } catch (error) {
        res.status(400).json({error: "ID invalido"});
    }
};

export const eliminarTipoDocumento = async (req, res) =>{
    try {
        const eliminado = await tiposdocumentos.findByIdAndDelete(req.params.id, req.body);
        if(!eliminado) return res.status(404).json({error: 'Tipo de documento no encontrado'});
        res.json({mensaje:'Tipo de documento ha sido eliminado'});
    } catch (error) {
        res.status(400).json({error: 'ID invalido'});
    }
}