import { Alertas } from "../models/alertas.js";

export const getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alertas.getAll();
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAlertsById = async (req, res) => {
  try {
    const alerts = await Alertas.getById(req.params.id);
    if (!alerts) {
      return res.status(404).json({ error: 'Alerta no encontrada' });
    }
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAlert = async (req, res) => {
  try {
    const newAlert = await Alertas.create(req.body);
    res.status(201).json(newAlert);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

