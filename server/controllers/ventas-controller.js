import { Ventas } from "../models/ventas.js";

export const getAllSells = async (req, res) => {
  try {
    const sells = await Ventas.getAll();
    res.json(sells);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSellsById = async (req, res) => {
  try {
    const sells = await Ventas.getById(req.params.id);
    if (!sells) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    res.json(sells);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSell = async (req, res) => {
  try {
    const newSell = await Ventas.create(req.body);
    res.status(201).json(newSell);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

