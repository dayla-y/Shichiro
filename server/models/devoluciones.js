import { pool } from "../configs/db.js";

export class Devoluciones{
    static async getAll(){
        const { rows } = await pool.query('SELECT * FROM devoluciones');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM devoluciones WHERE id = $1', [id]);
        return rows[0];
  }

  static async create({ recepcion_id, medicamento_id, cantidad, motivo, fecha_devolucion, penalizacion_aplicada }) {
        const { rows } = await pool.query(
        `INSERT INTO devoluciones 
        (recepcion_id, medicamento_id, cantidad, motivo, fecha_devolucion, penalizacion_aplicada ) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *`,
        [recepcion_id, medicamento_id, cantidad, motivo, fecha_devolucion, penalizacion_aplicada]
        );
        return rows[0];
    }
}