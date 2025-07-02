import { pool } from "../configs/db.js";

export class Promociones {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM promociones');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM promociones WHERE id = $1', [id]);
        return rows[0];
    }

    static async create({ fecha_inicio, fecha_fin, porcentaje_descuento, descripcion, medicamentos }) {
        // Convertir el array de medicamentos a JSONB
        const medicamentosJson = JSON.stringify(medicamentos);
        
        // Llamar al procedimiento almacenado
        await pool.query(
            'CALL crear_promocion($1, $2, $3, $4, $5)',
            [fecha_inicio, fecha_fin, porcentaje_descuento, descripcion, medicamentosJson]
        );
        
        // Obtener la última promoción creada (se puede modificar el procedimiento para que devuelva el ID)
        const { rows } = await pool.query(
            'SELECT * FROM promociones ORDER BY id DESC LIMIT 1'
        );
        return rows[0];
    }

    static async update(id, { fecha_inicio, fecha_fin, porcentaje_descuento, descripcion }) {
        const { rows } = await pool.query(
            'UPDATE promociones SET fecha_inicio = $1, fecha_fin = $2, porcentaje_descuento = $3, descripcion = $4 WHERE id = $5 RETURNING *',
            [fecha_inicio, fecha_fin, porcentaje_descuento, descripcion, id]
        );
        return rows[0];
    }

    static async delete(id) {
        // Primero eliminar los medicamentos asociados
        await pool.query('DELETE FROM medicamentos_promocion WHERE promocion_id = $1', [id]);
        
        // Luego eliminar la promoción
        const { rows } = await pool.query('DELETE FROM promociones WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }

    static async getMedicamentosByPromocionId(promocion_id) {
        const { rows } = await pool.query(`
            SELECT m.*, mp.stock_inicial_promocion, mp.stock_actual_promocion 
            FROM medicamentos_promocion mp
            JOIN medicamentos m ON mp.medicamento_id = m.id
            WHERE mp.promocion_id = $1
        `, [promocion_id]);
        return rows;
    }

    static async updateStockPromocion(promocion_id, medicamento_id, nueva_cantidad) {
        const { rows } = await pool.query(
            'UPDATE medicamentos_promocion SET stock_actual_promocion = $1 WHERE promocion_id = $2 AND medicamento_id = $3 RETURNING *',
            [nueva_cantidad, promocion_id, medicamento_id]
        );
        return rows[0];
    }
}