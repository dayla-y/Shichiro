CREATE TABLE registro_caducidades (
    id SERIAL PRIMARY KEY,
    medicamento_id INTEGER NOT NULL REFERENCES medicamentos(id),
    lote VARCHAR(50),
    fecha_vencimiento DATE NOT NULL,
    cantidad INTEGER NOT NULL,
    estado VARCHAR(20) CHECK (estado IN ('en_stock', 'en_promocion', 'devuelto', 'desechado')),
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);