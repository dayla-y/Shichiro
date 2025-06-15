CREATE TABLE inventarios (
    id SERIAL PRIMARY KEY,
    capacidad_maxima INTEGER NOT NULL
);

CREATE TABLE items_inventario (
    id SERIAL PRIMARY KEY,
    inventario_id INTEGER NOT NULL REFERENCES inventarios(id),
    medicamento_id INTEGER REFERENCES medicamentos(id),
    objeto_id INTEGER REFERENCES objetos_nivel(id),
    cantidad INTEGER NOT NULL,
    posicion_inventario INTEGER
);