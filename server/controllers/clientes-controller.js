import { Clientes } from "../models/clientes.js";

export const getAllClients = async (req, res) => {
  try {
    const client = await Clientes.getAll();
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClientsById = async (req, res) => {
  try {
    const client = await Clientes.getById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createClient = async (req, res) => {
  try {
    const newClient = await Clientes.create(req.body);
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

