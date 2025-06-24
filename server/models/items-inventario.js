import { pool } from "../configs/db.js";

export class ItemsInventario {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM items_inventario');
        return rows;
    }

    static async getByInventarioId(inventario_id) {
        const { rows } = await pool.query(
            'SELECT * FROM items_inventario WHERE inventario_id = $1',
            [inventario_id]
        );
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM items_inventario WHERE id = $1', [id]);
        return rows[0];
    }

    static async create({ inventario_id, medicamento_id, objeto_id, cantidad, posicion_inventario }) {
        const { rows } = await pool.query(
            `INSERT INTO items_inventario 
            (inventario_id, medicamento_id, objeto_id, cantidad, posicion_inventario) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *`,
            [inventario_id, medicamento_id, objeto_id, cantidad, posicion_inventario]
        );
        return rows[0];
    }

    static async update(id, { inventario_id, medicamento_id, objeto_id, cantidad, posicion_inventario }) {
        const { rows } = await pool.query(
            `UPDATE items_inventario SET 
            inventario_id = $1, 
            medicamento_id = $2, 
            objeto_id = $3, 
            cantidad = $4, 
            posicion_inventario = $5 
            WHERE id = $6 
            RETURNING *`,
            [inventario_id, medicamento_id, objeto_id, cantidad, posicion_inventario, id]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM items_inventario WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }

    static async getByPosition(inventario_id, posicion) {
        const { rows } = await pool.query(
            'SELECT * FROM items_inventario WHERE inventario_id = $1 AND posicion_inventario = $2',
            [inventario_id, posicion]
        );
        return rows[0];
    }
}