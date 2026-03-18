import { Router } from 'express';//Importa la funcion router desde la libreria express

import {//Importa las 5 funciones 
    nuevoUsuario,
    consultarUsuarios,
    consultarUsuario,
    actualizarUsuario,
    deshabilitarUsuario,
    habilitarUsuario,
    eliminarUsuario
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

// import {
//     nuevoMaterial,
//     consultarMateriales,
//     consultarMaterialesDevolutivos,
//     consultarMaterialesNoDevolutivos,
//     consultarMaterial,
//     actualizarMaterial,
//     eliminarMaterial
// } from '../controllers/materialesControllers.js';




const router = Router();//crea un objeto router que manejara todas las rutas de los usuarios

//consultar usuarios
router.get('/usuarios', consultarUsuarios);
//Consulta usuario por (ID)
router.get('/usuarios/:id', consultarUsuario);
//Agregar usuario
router.post('/usuarios', nuevoUsuario);
//Actualizar usuario
router.put('/usuarios/:id', actualizarUsuario);
//Eliminar usuario
router.delete('/usuarios/:id', eliminarUsuario);

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

export default router;