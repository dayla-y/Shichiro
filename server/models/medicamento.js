import { pool } from '../configs/db.js';

export class Medicamento {
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM medicamentos');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM medicamentos WHERE id = $1', [id]);
    return rows[0];
  }

  static async create({ nombre, codigo_barras, clasificacion, requiere_receta, precio, stock_actual, stock_minimo, fecha_vencimiento, refrigerado, proveedor_id }) {
    const { rows } = await pool.query(
      `INSERT INTO medicamentos 
      (nombre, codigo_barras, clasificacion, requiere_receta, precio, stock_actual, stock_minimo, fecha_vencimiento, refrigerado, proveedor_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
      RETURNING *`,
      [nombre, codigo_barras, clasificacion, requiere_receta, precio, stock_actual, stock_minimo, fecha_vencimiento, refrigerado, proveedor_id]
    );
    return rows[0];
  }

}