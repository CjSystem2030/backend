import express from 'express'
import { 
    obtenerProyectos,
    nuevoProyectos,
    obtenerProyecto,
    editarProyectos,
    eliminarProyectos,
    buscarColaborador,
    agregarColaborador,
    eliminarColaborador
 } from "../controllers/proyectoController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/")
    .get(checkAuth, obtenerProyectos)
    .post(checkAuth, nuevoProyectos)

router.route("/:id")
    .get(checkAuth, obtenerProyecto)
    .put(checkAuth, editarProyectos)
    .delete(checkAuth, eliminarProyectos)
    // delete para eliminar un recurso completo

router.post("/colaboradores", checkAuth, buscarColaborador)
router.post("/colaboradores/:id", checkAuth, agregarColaborador)
router.post("/eliminar-colaborador/:id", checkAuth, eliminarColaborador)   
// usamos post para eliminar una parte de cierto recurso

export default router;

// el encadenamiento opcional servie para leer las propiedades concatenadas de un objeto si necesidad de validar si existe o no