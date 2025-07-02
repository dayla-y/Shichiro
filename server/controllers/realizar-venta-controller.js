import { RealizarVentas } from "../models/realizar-venta.js";

export const realizarVenta = async (req, res) => {
    try {
        const ventaData = {
            paciente_nombre: req.body.paciente_nombre,
            doctor_nombre: req.body.doctor_nombre,
            doctor_telefono: req.body.doctor_telefono,
            doctor_licencia: req.body.doctor_licencia,
            empleado_id: req.body.empleado_id,
            detalles: req.body.detalles
        };

        const result = await RealizarVentas.realizarVenta(ventaData);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ 
            error: error.message,
            details: error.detail 
        });
    }
};

export const getVentaById = async (req, res) => {
    try {
        const venta = await RealizarVentas.getVentaById(req.params.id);
        if (!venta) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        
        const detalles = await RealizarVentas.getDetallesVenta(req.params.id);
        res.json({ ...venta, detalles });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};