import { Router } from 'express';//Importa la funcion router desde la libreria express

// Se le agrego dos funciones que fue habilitar y deshabilitar (En elproyecto en ejecucion no se pueden eliminar modulos)
import {//Importa las 7 funciones 
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

import {
    nuevaMarca,
    consultarMarcas,
    consultarMarca,
    actualizarMarca,
    deshabilitarMarca,
    habilitarMarca,
    eliminarMarca
} from '../controllers/marcasControllers.js';

import { 
    retornarPrestamo,
    consultarRetornos,
    consultarRetorno,
} from '../controllers/retornarPrestamoController.js';



import {
    nuevoPrestamo,
    consultarPrestamos,
    consultarPrestamo,
    actualizarPrestamo,
    deshabilitarPrestamo,
    habilitarPrestamo,
    eliminarPrestamo
} from '../controllers/prestamosControllers.js';

import {
    nuevoTipoDocumento,
    consultarTipoDocumentos,
    consultarTipoDocumento,
    actualizarTipoDocumento,
    deshabilitarTipoDocumento,
    habilitarTipoDocumento,
    eliminarTipoDocumento
} from '../controllers/tipoDocumentoControllers.js';

import {
    nuevoTipoUsuario,
    consultarTipoUsuarios,
    consultarTipousuario,
    actualizarTipoUsuario,
    deshabilitarTipoUsuario,
    habilitarTipoUsuario,
    eliminarTipoUsuario
} from '../controllers/tipoUsuarioControllers.js';

import {
    nuevaCategoria,
    consultarCategorias,
    consultarCategoria,
    actualizarCategoria,
    deshabilitarCategoria,
    habilitarCategoria,
    eliminarCategoria
} from '../controllers/categoriaControllers.js';




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
// Deshabilitar usuario
router.put('/usuarios/deshabilitar/:id', deshabilitarUsuario);
// Habilitar usuario
router.put('/usuarios/habilitar/:id', habilitarUsuario);

// CRUD Materiales
// Consultar todos los materiales
router.get('/materiales', consultarMateriales);
// Consultar todos los materiales devolutivos
router.get('/materiales/devolutivos', consultarMaterialesDevolutivos);
// Consultar todos los materiales
router.get('/materiales/normales', consultarMaterialesNoDevolutivos);
// Consultar material por ID
router.get('/materiales/:id', consultarMaterial);
// Agregar material
router.post('/materiales', nuevoMaterial);
// Actualizar material
router.put('/materiales/:id', actualizarMaterial);
// Eliminar materiales
router.delete('/materiales/:id', eliminarMaterial);


// CRUD Marcas
// Consultar todas las marcas
router.get('/marcas', consultarMarcas);
//Consulta marca por (ID)
router.get('/marcas/:id', consultarMarca);
//Agregar marca
router.post('/marcas', nuevaMarca);
//Actualizar marca
router.put('/marcas/:id', actualizarMarca);
//Eliminar marca
router.delete('/marcas/:id', eliminarMarca);
//Deshabilitar marca
router.put('/marcas/deshabilitar/:id', deshabilitarMarca);
//Habilitar marca
router.put('/marcas/habilitar/:id', habilitarMarca);


// CRUD Préstamos
// Consultar todos los préstamos
router.get('/prestamos', consultarPrestamos);
// Consultar préstamo por ID
router.get('/prestamos/:id', consultarPrestamo);
// Crear nuevo préstamo
router.post('/prestamos', nuevoPrestamo);
// Actualizar préstamo
router.put('/prestamos/:id', actualizarPrestamo);
// Deshabilitar préstamo
router.put('/prestamos/deshabilitar/:id', deshabilitarPrestamo);
// Habilitar préstamo
router.put('/prestamos/habilitar/:id', habilitarPrestamo);
// Eliminar préstamo
router.delete('/prestamos/:id', eliminarPrestamo);

// Retornar un prestamo
// Crear retorno de préstamo
router.post('/RetornarPrestamo', retornarPrestamo);
// Consultar todos los retornos
router.get('/RetornarPrestamo', consultarRetornos);
// Consultar retorno por ID
router.get('/RetornarPrestamo/:id', consultarRetorno);

// CRUD Tipos de Documento
// Consultar todos los documentos
router.get('/tiposdocumentos', consultarTipoDocumentos);
// Consultar tipo de documento por ID 
router.get('/tiposdocumentos/:id', consultarTipoDocumento);
// Agregar tipo d edocumento
router.post('/tiposdocumentos', nuevoTipoDocumento);
// Actualizar tipo de documento
router.put('/tiposdocumentos/:id', actualizarTipoDocumento);
// Deshabilitar tipo de documento
router.put('/tiposdocumentos/deshabilitar/:id', deshabilitarTipoDocumento);
// Habilitar tipo de documento
router.put('/tiposdocumentos/habilitar/:id', habilitarTipoDocumento);
// Eliminar tipo de documento
router.delete('/tiposdocumentos/:id', eliminarTipoDocumento);

// CRUD Tipos de Usuario
// Consultar todos los tipos de usuarios
router.get('/tipousuarios', consultarTipoUsuarios);
// Consulta rtipo de usuario por ID
router.get('/tipousuarios/:id', consultarTipousuario);
// Agregar nuevo tipo de usuario
router.post('/tipousuarios', nuevoTipoUsuario);
// Actualizar tipo de usuario
router.put('/tipousuarios/:id', actualizarTipoUsuario);
// Deshabilitar tipo de usuario
router.put('/tipousuarios/deshabilitar/:id', deshabilitarTipoUsuario);
// Habilitar tipo d usuario
router.put('/tipousuarios/habilitar/:id', habilitarTipoUsuario);
// Eliminar tipo de usuario
router.delete('/tipousuarios/:id', eliminarTipoUsuario);


// CRUD Categorías
// Consultar todos las categorias
router.get('/categorias', consultarCategorias);
// Consultar categoria por id
router.get('/categorias/:id', consultarCategoria);
// Agregar categoria
router.post('/categorias', nuevaCategoria);
// Actualizar categoria
router.put('/categorias/:id', actualizarCategoria);
// Deshabilitar categoria
router.put('/categorias/deshabilitar/:id', deshabilitarCategoria);
// Habilitar categoria
router.put('/categorias/habilitar/:id', habilitarCategoria);
// Eliminar categoria
router.delete('/categorias/:id', eliminarCategoria);


export default router;