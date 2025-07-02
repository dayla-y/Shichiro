import express from 'express';
import {
    createInventario,
    getInventarioByJugador,
    updateCapacidadInventario,
    addItemToInventario,
    removeItemFromInventario,
    updateItemInInventario
} from '../controllers/inventario-controller.js';

const router = express.Router();

// Rutas para el inventario del jugador
router.post('/', createInventario);
router.get('/jugador/:jugador_id', getInventarioByJugador);
router.put('/:id/capacidad', updateCapacidadInventario);

// Rutas para los items del inventario
router.post('/:inventario_id/items', addItemToInventario);
router.delete('/:inventario_id/items/:item_id', removeItemFromInventario);
router.put('/items/:item_id', updateItemInInventario);

export default router;