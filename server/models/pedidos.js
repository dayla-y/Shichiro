import { pool } from "../configs/db.js";

export class Pedidos {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM pedidos');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM pedidos WHERE id = $1', [id]);
        return rows[0];
    }

    static async create({ medicamento_id, cantidad, fecha_pedido, estado, prioridad, almacen_id }) {
        const { rows } = await pool.query(
            `INSERT INTO pedidos 
            (medicamento_id, cantidad, fecha_pedido, estado, prioridad, almacen_id) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *`,
            [medicamento_id, cantidad, fecha_pedido, estado, prioridad, almacen_id]
        );
        return rows[0];
    }

    static async update(id, { medicamento_id, cantidad, fecha_pedido, estado, prioridad, almacen_id }) {
        const { rows } = await pool.query(
            `UPDATE pedidos SET 
            medicamento_id = $1, 
            cantidad = $2
            fecha_pedido = $3, 
            estado = $4, 
            prioridad = $5,
            almacen_id = $6
            WHERE id = $7
            RETURNING *`,
            [medicamento_id, cantidad, fecha_pedido, estado, prioridad, almacen_id, id]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM pedidos WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }

}