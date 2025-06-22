import express from 'express';
import { createComm, getAllComms, getCommsById } from '../controllers/comisiones-controller.js';

const commsRoutes = express.Router();
commsRoutes.get('/', getAllComms);
commsRoutes.get('/:id', getCommsById);
commsRoutes.post('/', createComm);

export default commsRoutes;