import { ReporteCaducidades } from "../models/reporteCaducidades.js";

export const getAllReportes = async (req, res) => {
    try {
        const reportes = await ReporteCaducidades.getAll();
        res.json(reportes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getReporteById = async (req, res) => {
    try {
        const reporte = await ReporteCaducidades.getById(req.params.id);
        if (!reporte) {
            return res.status(404).json({ error: 'Reporte no encontrado' });
        }
        res.json(reporte);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const verificarCaducidades = async (req, res) => {
    try {
        const reportesActualizados = await ReporteCaducidades.verificarCaducidades();
        res.json({
            message: 'Verificación de caducidades completada',
            reportes: reportesActualizados
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteReporte = async (req, res) => {
    try {
        const deletedReporte = await ReporteCaducidades.delete(req.params.id);
        if (!deletedReporte) {
            return res.status(404).json({ error: 'Reporte no encontrado' });
        }
        res.json(deletedReporte);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};