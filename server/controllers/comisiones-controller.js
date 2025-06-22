import { Comisiones } from "../models/comisiones.js";

export const getAllComms = async (req, res) => {
  try {
    const comms = await Comisiones.getAll();
    res.json(comms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCommsById = async (req, res) => {
  try {
    const comms = await Comisiones.getById(req.params.id);
    if (!comms) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    res.json(comms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createComm = async (req, res) => {
  try {
    const newComm = await Comisiones.create(req.body);
    res.status(201).json(newComm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

