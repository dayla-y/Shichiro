import { pool } from "../configs/db.js";

export class PedidosClientes {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM pedidos_clientes');
        return rows;
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM pedidos_clientes WHERE id = $1', [id]);
        return rows[0];
    }

    static async create({ cliente_nombre, cliente_contacto, medicamento_id, cantidad, fecha_pedido, estado, sucursal_id }) {
        const { rows } = await pool.query(
            `INSERT INTO pedidos_clientes 
            (cliente_nombre, cliente_contacto, medicamento_id, cantidad, fecha_pedido, estado, sucursal_id) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *`,
            [cliente_nombre, cliente_contacto, medicamento_id, cantidad, fecha_pedido, estado, sucursal_id]
        );
        return rows[0];
    }

    static async update(id, { cliente_nombre, cliente_contacto, medicamento_id, cantidad, fecha_pedido, estado, sucursal_id }) {
        const { rows } = await pool.query(
            `UPDATE pedidos_clientes SET 
            cliente_nombre = $1, 
            cliente_contacto = $2
            medicamento_id = $3, 
            cantidad = $4, 
            fecha_pedido = $5,
            estado = $6
            sucursal_id = $7
            WHERE id = $8
            RETURNING *`,
            [cliente_nombre, cliente_contacto, medicamento_id, cantidad, fecha_pedido, estado, sucursal_id, id]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM pedidos_clientes WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }

}