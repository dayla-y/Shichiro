CREATE TABLE pedidos_clientes (
    id SERIAL PRIMARY KEY,
    cliente_nombre VARCHAR(100),
    cliente_contacto VARCHAR(100),
    medicamento_id INTEGER NOT NULL REFERENCES medicamentos(id),
    cantidad INTEGER NOT NULL,
    fecha_pedido TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('pendiente', 'completado', 'cancelado')),
    sucursal_id INTEGER REFERENCES sucursales(id)
);