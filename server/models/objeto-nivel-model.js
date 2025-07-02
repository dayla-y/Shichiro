import { pool } from "../configs/db.js";

export class ObjetosNivel {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM objetos_nivel');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM objetos_nivel WHERE id = $1', [id]);
        return rows[0];
    }

    static async getByEscena(escena) {
        const { rows } = await pool.query('SELECT * FROM objetos_nivel WHERE escena = $1', [escena]);
        return rows;
    }

    static async create({ nombre, tipo, posicion_x, posicion_y, estado, escena, propiedades, sprite }) {
        const { rows } = await pool.query(
            `INSERT INTO objetos_nivel 
            (nombre, tipo, posicion_x, posicion_y, estado, escena, propiedades, sprite) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *`,
            [nombre, tipo, posicion_x, posicion_y, estado, escena, propiedades, sprite]
        );
        return rows[0];
    }

    static async update(id, { nombre, tipo, posicion_x, posicion_y, estado, escena, propiedades, sprite }) {
        const { rows } = await pool.query(
            `UPDATE objetos_nivel 
            SET nombre = $1, tipo = $2, posicion_x = $3, posicion_y = $4, 
                estado = $5, escena = $6, propiedades = $7, sprite = $8 
            WHERE id = $9 
            RETURNING *`,
            [nombre, tipo, posicion_x, posicion_y, estado, escena, propiedades, sprite, id]
        );
        return rows[0];
    }

    static async updateEstado(id, estado) {
        const { rows } = await pool.query(
            'UPDATE objetos_nivel SET estado = $1 WHERE id = $2 RETURNING *',
            [estado, id]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM objetos_nivel WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }
}