import express from 'express';
import {
    createAnimacion,
    deleteAnimacion,
    getAllAnimaciones,
    getAnimacionById,
    updateAnimacion,
    getAnimacionesByEntity,
    getAnimacionesByState
} from '../controllers/animacion-controller.js';

const animacionRoutes = express.Router();

// Rutas básicas CRUD
animacionRoutes.get('/', getAllAnimaciones);
animacionRoutes.get('/:id', getAnimacionById);
animacionRoutes.post('/', createAnimacion);
animacionRoutes.put('/:id', updateAnimacion);
animacionRoutes.delete('/:id', deleteAnimacion);

// Rutas adicionales específicas para animaciones
animacionRoutes.get('/entidad/:entidad_tipo/:entidad_id', getAnimacionesByEntity);
animacionRoutes.get('/estado/:estado', getAnimacionesByState);

export default animacionRoutes;