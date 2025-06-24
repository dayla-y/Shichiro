import { pool } from "../configs/db.js";

export class Inventarios {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM inventarios');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM inventarios WHERE id = $1', [id]);
        return rows[0];
    }

    static async create({ capacidad_maxima }) {
        const { rows } = await pool.query(
            'INSERT INTO inventarios (capacidad_maxima) VALUES ($1) RETURNING *',
            [capacidad_maxima]
        );
        return rows[0];
    }

    static async update(id, { capacidad_maxima }) {
        const { rows } = await pool.query(
            'UPDATE inventarios SET capacidad_maxima = $1 WHERE id = $2 RETURNING *',
            [capacidad_maxima, id]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM inventarios WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }
}