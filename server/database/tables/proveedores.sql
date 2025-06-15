CREATE TABLE proveedores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contacto VARCHAR(100),
    telefono VARCHAR(20),
    acepta_devoluciones BOOLEAN NOT NULL,
    penalizacion_devolucion NUMERIC(5,2)
);