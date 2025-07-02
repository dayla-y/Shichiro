import { Recepcion } from "../models/recepcion.js";

export const recibirMedicamentos = async (req, res) => {
    try {
        const {
            numero_orden,
            proveedor_id,
            sucursal_id,
            empleado_validador,
            detalles
        } = req.body;

        // Validación básica
        if (!numero_orden || !proveedor_id || !sucursal_id || !empleado_validador || !detalles) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        if (!Array.isArray(detalles) || detalles.length === 0) {
            return res.status(400).json({ error: 'Debe proporcionar al menos un detalle de medicamento' });
        }

        const result = await Recepcion.recibirMedicamentos({
            numero_orden,
            proveedor_id,
            sucursal_id,
            empleado_validador,
            detalles
        });

        res.status(201).json({ message: 'Medicamentos recibidos correctamente', recepcion_id: result.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllRecepciones = async (req, res) => {
    try {
        const recepciones = await Recepcion.getAll();
        res.json(recepciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRecepcionById = async (req, res) => {
    try {
        const recepcion = await Recepcion.getById(req.params.id);
        if (!recepcion) {
            return res.status(404).json({ error: 'Recepción no encontrada' });
        }
        
        const detalles = await Recepcion.getDetallesByRecepcionId(req.params.id);
        res.json({ ...recepcion, detalles });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};