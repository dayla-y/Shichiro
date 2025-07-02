import express from 'express';
import {
    createObjetoNivel,
    deleteObjetoNivel,
    getAllObjetosNivel,
    getObjetoNivelById,
    getObjetosByEscena,
    updateObjetoNivel,
    updateEstadoObjeto
} from '../controllers/objeto-nivel-controller.js';

const objetoNivelRoutes = express.Router();

objetoNivelRoutes.get('/', getAllObjetosNivel);
objetoNivelRoutes.get('/:id', getObjetoNivelById);
objetoNivelRoutes.get('/escena/:escena', getObjetosByEscena);
objetoNivelRoutes.post('/', createObjetoNivel);
objetoNivelRoutes.put('/:id', updateObjetoNivel);
objetoNivelRoutes.patch('/:id/estado', updateEstadoObjeto);
objetoNivelRoutes.delete('/:id', deleteObjetoNivel);

export default objetoNivelRoutes;