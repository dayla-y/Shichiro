import { pool } from "../configs/db.js";

export class Ventas{
    static async getAll(){
        const { rows } = await pool.query('SELECT * FROM ventas');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM ventas WHERE id = $1', [id]);
        return rows[0];
  }

  static async create({ fecha, paciente_nombre, doctor_nombre, doctor_telefono, doctor_licencia, empleado_id, total }) {
        const { rows } = await pool.query(
        `INSERT INTO ventas 
        (fecha, paciente_nombre, doctor_nombre, doctor_telefono, doctor_licencia, empleado_id, total ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *`,
        [fecha, paciente_nombre, doctor_nombre, doctor_telefono, doctor_licencia, empleado_id, total]
        );
        return rows[0];
    }
}