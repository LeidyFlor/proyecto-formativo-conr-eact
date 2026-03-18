import materiales from "../modules/Materiales.js";
import Material_Devolutivo from "../modules/Material_Devolutivo.js";

export const nuevoMaterial = async (req, res) => {
    try {

        let material;

        // Si el body trae campos de devolutivo
        if(req.body.serial || req.body.modelo){
            material = await Material_Devolutivo.create(req.body);
        } else {
            material = await materiales.create(req.body);
        }

        res.status(201).json({
            mensaje: "Material creado",
            material
        });

    } catch (error) {
        res.status(400).json({ error: "ID inválido" });
    }
};

export const consultarMateriales = async(req, res, next) =>{
    try {   
        const material = await materiales.find().sort({nombreElemento: 1});
        res.json(material)
    } catch (error) {
        res.status(400).json({error: "ID inválido"});
    }
    
};

export const consultarMaterialesDevolutivos = async (req, res) => {
    try {

        const materiales = await Material_Devolutivo.find();

        res.json(materiales);

    } catch (error) {
        res.status(400).json({ error: "ID inválido" });
    }
};

export const consultarMaterialesNoDevolutivos = async (req, res) => {
    try {

        const materialesNormales = await materiales.find({
            tipoMaterial: { $exists: false }
        });

        res.json(materialesNormales);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// mostrar por parametros
export const consultarMaterial = async(req, res, next) =>{
    try {
        const material = await materiales.findById(req.params.id)
        if(!material) return res.status(404).json({error: 'Material no encontrado'});
        res.json(material)
    } catch (error) {
        res.status(400).json({error: 'ID invalido'});
    }
};

export const actualizarMaterial = async(req, res) => {
    try {
        const material = await materiales.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}); 
        if(!material) return res.status(404).json({error: 'Material no encontrado'});
        res.json({mensaje: 'Material Actualizado', material});
    } catch (error) {
        res.status(400).json({error: "ID inválido"})
    }
}

export const eliminarMaterial = async (req, res) =>{
    try {
        const eliminado = await materiales.findByIdAndDelete(req.params.id, req.body);
        if(!eliminado) return res.status(404).json({error: 'Material no encontrado'});
        res.json({mensaje:'Material ha sido eliminado'});
    } catch (error) {
        res.status(400).json({error: 'ID invalido'});
    }
}