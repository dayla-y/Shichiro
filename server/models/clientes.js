import { pool } from "../configs/db.js";

export class Clientes{
    static async getAll(){
        const { rows } = await pool.query('SELECT * FROM clientes');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
        return rows[0];
  }

  static async create({ nombre, contacto, telefono, direccion, historico_compras, preferencias, fecha_registro }) {
        const { rows } = await pool.query(
        `INSERT INTO clientes 
        (nombre, contacto, telefono, direccion, historico_compras, preferencias, fecha_registro ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *`,
        [nombre, contacto, telefono, direccion, historico_compras, preferencias, fecha_registro]
        );
        return rows[0];
    }
}