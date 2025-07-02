import { Transferencias } from "../models/transferencias.js";

export const transferirMedicamento = async (req, res) => {
  try {
    const {
      medicamento_id,
      cantidad,
      sucursal_origen,
      sucursal_destino,
      empleado_id
    } = req.body;

    // Validación básica
    if (!medicamento_id || !cantidad || !sucursal_origen || !sucursal_destino || !empleado_id) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    if (cantidad <= 0) {
      return res.status(400).json({ error: 'La cantidad debe ser mayor que cero' });
    }

    if (sucursal_origen === sucursal_destino) {
      return res.status(400).json({ error: 'No se puede transferir a la misma sucursal' });
    }

    await Transferencias.transferirMedicamento({
      medicamento_id,
      cantidad,
      sucursal_origen,
      sucursal_destino,
      empleado_id
    });

    res.status(201).json({ message: 'Transferencia realizada con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getHistorialTransferencias = async (req, res) => {
  try {
    const transferencias = await Transferencias.getHistorialTransferencias();
    res.json(transferencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTransferenciasPorSucursal = async (req, res) => {
  try {
    const { sucursal_id } = req.params;
    const transferencias = await Transferencias.getTransferenciasPorSucursal(sucursal_id);
    res.json(transferencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTransferenciaById = async (req, res) => {
  try {
    const transferencia = await Transferencias.getTransferenciaById(req.params.id);
    if (!transferencia) {
      return res.status(404).json({ error: 'Transferencia no encontrada' });
    }
    res.json(transferencia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};