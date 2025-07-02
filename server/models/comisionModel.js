import { pool } from "../configs/db.js";

export class Comisiones {
    static async calcular(empleadoId, fechaInicio, fechaFin) {
        const { rows } = await pool.query(
            'SELECT calcular_comision($1, $2, $3) AS comision',
            [empleadoId, fechaInicio, fechaFin]
        );
        return rows[0].comision;
    }
    
    // Obtener historial de comisiones
    static async getHistorial(empleadoId) {
        const { rows } = await pool.query(
            `SELECT v.fecha, dv.comision_empleado, m.nombre AS medicamento
             FROM ventas v
             JOIN detalles_venta dv ON v.id = dv.venta_id
             JOIN medicamentos m ON dv.medicamento_id = m.id
             WHERE v.empleado_id = $1 AND m.clasificacion = 'vitamina_suplemento'
             ORDER BY v.fecha DESC`,
            [empleadoId]
        );
        return rows;
    }
}