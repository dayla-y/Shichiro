CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contacto VARCHAR(100),
    telefono VARCHAR(20),
    direccion TEXT,
    historico_compras JSONB,
    preferencias TEXT,
    fecha_registro DATE NOT NULL DEFAULT CURRENT_DATE
);