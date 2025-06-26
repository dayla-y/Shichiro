import express from 'express';
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from '../controllers/pedidos-controller.js';


const orderRoutes = express.Router();

orderRoutes.get('/', getAllOrders);
orderRoutes.get('/:id', getOrderById);
orderRoutes.post('/', createOrder);
orderRoutes.put('/:id', updateOrder);
orderRoutes.delete('/:id', deleteOrder);

export default orderRoutes;