CREATE TABLE promociones (
    id SERIAL PRIMARY KEY,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    porcentaje_descuento NUMERIC(5,2) NOT NULL,
    descripcion TEXT
);

CREATE TABLE medicamentos_promocion (
    id SERIAL PRIMARY KEY,
    promocion_id INTEGER NOT NULL REFERENCES promociones(id),
    medicamento_id INTEGER NOT NULL REFERENCES medicamentos(id),
    stock_inicial_promocion INTEGER NOT NULL,
    stock_actual_promocion INTEGER NOT NULL
);