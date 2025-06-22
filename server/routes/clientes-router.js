import express from 'express';
import { createClient, getAllClients, getClientsById } from '../controllers/clientes-controller.js';

const clientsRoutes = express.Router();
clientsRoutes.get('/', getAllClients);
clientsRoutes.get('/:id', getClientsById);
clientsRoutes.post('/', createClient);

export default clientsRoutes;