import express from 'express';
import { createClientOrder, deleteClientOrder, getAllClientOrders, getClientOrderById, updateClientOrder } from '../controllers/pedidos-clientes-controller.js';


const orderClientRoutes = express.Router();

orderClientRoutes.get('/', getAllClientOrders);
orderClientRoutes.get('/:id', getClientOrderById);
orderClientRoutes.post('/', createClientOrder);
orderClientRoutes.put('/:id', updateClientOrder);
orderClientRoutes.delete('/:id', deleteClientOrder);

export default orderClientRoutes;