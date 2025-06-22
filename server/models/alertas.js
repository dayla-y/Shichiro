import { pool } from "../configs/db.js";

export class Alertas{
    static async getAll(){
        const { rows } = await pool.query('SELECT * FROM alertas');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM alertas WHERE id = $1', [id]);
        return rows[0];
  }

    static async create({ tipo, medicamento_id, mensaje, fecha, leida, prioridad }) {
        const { rows } = await pool.query(
        `INSERT INTO alertas 
        ( tipo, medicamento_id, mensaje, fecha, leida, prioridad ) 
        VALUES ($1, $2, $3, $4, $5, $6 ) 
        RETURNING *`,
        [tipo, medicamento_id, mensaje, fecha, leida, prioridad]
        );
        return rows[0];
    }

}