import { Almacenes } from "../models/almacenes.js";

export const getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await Almacenes.getAll();
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWarehousesById = async (req, res) => {
  try {
    const warehouses = await Almacenes.getById(req.params.id);
    if (!warehouses) {
      return res.status(404).json({ error: 'Almacén no encontrada' });
    }
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createWarehouse = async (req, res) => {
  try {
    const newWarehouse = await Almacenes.create(req.body);
    res.status(201).json(newWarehouse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

