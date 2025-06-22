import { pool } from "../configs/db.js";

export class Almacenes {
    static async getAll(){
        const { rows } = await pool.query('SELECT * FROM almacenes');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM almacenes WHERE id = $1', [id]);
        return rows[0];
  }

  static async create({ nombre, ubicacion, capacidad, refrigeracion }) {
        const { rows } = await pool.query(
        `INSERT INTO almacenes 
        ( nombre, ubicacion, capacidad, refrigeracion ) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *`,
        [nombre, ubicacion, capacidad, refrigeracion]
        );
        return rows[0];
    }
}