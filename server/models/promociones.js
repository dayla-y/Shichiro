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

    static async create({ fecha_inicio, fecha_fin, porcentaje_descuento, descripcion }) {
        const { rows } = await pool.query(
            `INSERT INTO promociones 
            (fecha_inicio, fecha_fin, porcentaje_descuento, descripcion) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *`,
            [fecha_inicio, fecha_fin, porcentaje_descuento, descripcion]
        );
        return rows[0];
    }

    static async update(id, { fecha_inicio, fecha_fin, porcentaje_descuento, descripcion }) {
        const { rows } = await pool.query(
            `UPDATE promociones SET 
            fecha_inicio = $1, 
            fecha_fin = $2,
            porcentaje_descuento = $3, 
            descripcion = $4
            WHERE id = $5
            RETURNING *`,
            [fecha_inicio, fecha_fin, porcentaje_descuento, descripcion, id]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM promociones WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }

    static async getMedicamentosByPromocion(promocion_id) {
        const { rows } = await pool.query(
            `SELECT mp.*, m.nombre as medicamento_nombre 
             FROM medicamentos_promocion mp
             JOIN medicamentos m ON mp.medicamento_id = m.id
             WHERE mp.promocion_id = $1`,
            [promocion_id]
        );
        return rows;
    }

    static async addMedicamentoToPromocion({ promocion_id, medicamento_id, stock_inicial_promocion, stock_actual_promocion }) {
        const { rows } = await pool.query(
            `INSERT INTO medicamentos_promocion 
            (promocion_id, medicamento_id, stock_inicial_promocion, stock_actual_promocion) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *`,
            [promocion_id, medicamento_id, stock_inicial_promocion, stock_actual_promocion]
        );
        return rows[0];
    }

    static async updateStockPromocion(id, stock_actual_promocion) {
        const { rows } = await pool.query(
            `UPDATE medicamentos_promocion SET 
            stock_actual_promocion = $1
            WHERE id = $2
            RETURNING *`,
            [stock_actual_promocion, id]
        );
        return rows[0];
    }

    static async removeMedicamentoFromPromocion(id) {
        const { rows } = await pool.query('DELETE FROM medicamentos_promocion WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }
}