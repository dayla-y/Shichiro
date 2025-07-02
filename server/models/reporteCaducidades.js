// models/reporteCaducidades.js
import { pool } from "../configs/db.js";

export class ReporteCaducidades {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM reporte_caducidades');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM reporte_caducidades WHERE id = $1', [id]);
        return rows[0];
    }

    static async verificarCaducidades() {
        // Ejecutamos la función PostgreSQL que definiste
        await pool.query('SELECT verificar_caducidades_proximas()');
        
        // Obtenemos los resultados actualizados
        const { rows } = await pool.query('SELECT * FROM reporte_caducidades');
        return rows;
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM reporte_caducidades WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }
}