import express from 'express';
import { createAlert, getAlertsById, getAllAlerts } from '../controllers/alertas-controller.js';

const alertsRoutes = express.Router();
alertsRoutes.get('/', getAllAlerts);
alertsRoutes.get('/:id', getAlertsById);
alertsRoutes.post('/', createAlert);

export default alertsRoutes;