import { pool } from '../configs/db.js';

export class Empleados {
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM empleados');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM empleados WHERE id = $1', [id]);
    return rows[0];
  }

  static async create({ nombre, puesto, porcentaje_comision }) {
    const { rows } = await pool.query(
      `INSERT INTO empleados 
      (nombre, puesto, porcentaje_comision) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [nombre, puesto, porcentaje_comision]
    );
    return rows[0];
  }

}