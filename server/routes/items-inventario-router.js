import express from 'express';
import {
    createItem,
    deleteItem,
    getAllItems,
    getItemById,
    getItemsByInventario,
    updateItem
} from '../controllers/items-inventario.js';

const itemsInventarioRoutes = express.Router();

itemsInventarioRoutes.get('/', getAllItems);
itemsInventarioRoutes.get('/inventario/:inventario_id', getItemsByInventario);
itemsInventarioRoutes.get('/:id', getItemById);
itemsInventarioRoutes.post('/', createItem);
itemsInventarioRoutes.put('/:id', updateItem);
itemsInventarioRoutes.delete('/:id', deleteItem);

export default itemsInventarioRoutes;