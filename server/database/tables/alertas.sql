CREATE TABLE alertas (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('stock', 'caducidad', 'pedido', 'devolucion')),
    medicamento_id INTEGER REFERENCES medicamentos(id),
    mensaje TEXT NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    leida BOOLEAN DEFAULT FALSE,
    prioridad INTEGER NOT NULL DEFAULT 2
);