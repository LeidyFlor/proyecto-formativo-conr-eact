import { Router } from 'express';//Importa la funcion router desde la libreria express

// Se le agrego dos funciones que fue habilitar y deshabilitar (En el proyecto en ejecucion no se pueden eliminar modulos)
import { 
    nuevoUsuario,
    consultarUsuarios,
    consultarUsuario,
    actualizarUsuario,
    deshabilitarUsuario,
    habilitarUsuario,
    // eliminarUsuario
} from '../controllers/usuariosControllers.js';

import {
    nuevoMaterial,
    consultarMateriales,
    consultarMaterialesDevolutivos,
    consultarMaterialesNoDevolutivos,
    consultarMaterial,
    actualizarMaterial,
    eliminarMaterial
} from '../controllers/materialesControllers.js';

import {
    nuevaMarca,
    consultarMarcas,
    consultarMarca,
    actualizarMarca,
    deshabilitarMarca,
    habilitarMarca,
    eliminarMarca
} from '../controllers/marcasControllers.js';




const router = Router();//crea un objeto router que manejara todas las rutas de los usuarios

// CRUD Usuarios

router.get('/usuarios', consultarUsuarios);

router.get('/usuarios/:id', consultarUsuario);

router.post('/usuarios', nuevoUsuario);

router.put('/usuarios/:id', actualizarUsuario);

// router.delete('/usuarios/:id', eliminarUsuario);

router.put('/usuarios/deshabilitar/:id', deshabilitarUsuario);

router.put('/usuarios/habilitar/:id', habilitarUsuario);


// CRUD Materiales

router.get('/materiales', consultarMateriales);

router.get('/materiales/devolutivos', consultarMaterialesDevolutivos);

router.get('/materiales/normales', consultarMaterialesNoDevolutivos);

router.get('/materiales/:id', consultarMaterial);

router.post('/materiales', nuevoMaterial);

router.put('/materiales/:id', actualizarMaterial);

router.delete('/materiales/:id', eliminarMaterial);


// CRUD Marcas

router.get('/marcas', consultarMarcas);

router.get('/marcas/:id', consultarMarca);

router.post('/marcas', nuevaMarca);

router.put('/marcas/:id', actualizarMarca);

router.delete('/marcas/:id', eliminarMarca);

router.put('/marcas/deshabilitar/:id', deshabilitarMarca);

router.put('/marcas/habilitar/:id', habilitarMarca);

export default router;