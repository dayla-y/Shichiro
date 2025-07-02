import { pool } from "../configs/db.js";

export class RealizarVentas {
    static async realizarVenta(ventaData) {
        const { 
            paciente_nombre, 
            doctor_nombre, 
            doctor_telefono, 
            doctor_licencia, 
            empleado_id, 
            detalles 
        } = ventaData;

        const client = await pool.connect();
        
        try {
            await client.query('BEGIN');
            
            const { rows } = await client.query(
                'CALL realizar_venta($1, $2, $3, $4, $5, $6)',
                [
                    paciente_nombre,
                    doctor_nombre,
                    doctor_telefono,
                    doctor_licencia,
                    empleado_id,
                    JSON.stringify(detalles)
                ]
            );
            
            await client.query('COMMIT');
            return { success: true, message: 'Venta realizada con éxito' };
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    static async getVentaById(id) {
        const { rows } = await pool.query('SELECT * FROM ventas WHERE id = $1', [id]);
        return rows[0];
    }

    static async getDetallesVenta(ventaId) {
        const { rows } = await pool.query(
            'SELECT * FROM detalles_venta WHERE venta_id = $1',
            [ventaId]
        );
        return rows;
    }
}