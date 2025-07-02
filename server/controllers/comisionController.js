import { Comisiones } from "../models/comisionModel.js";

export const calcularComision = async (req, res) => {
    try {
        const { empleadoId, fechaInicio, fechaFin } = req.body;
        
        if (!empleadoId || !fechaInicio || !fechaFin) {
            return res.status(400).json({ error: 'Faltan parámetros requeridos' });
        }
        
        const comision = await Comisiones.calcular(empleadoId, fechaInicio, fechaFin);
        res.json({ comision: comision });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getHistorialComisiones = async (req, res) => {
    try {
        const { empleadoId } = req.params;
        const historial = await Comisiones.getHistorial(empleadoId);
        res.json(historial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};