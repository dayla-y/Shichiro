CREATE TABLE almacenes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(100) NOT NULL,
    capacidad INTEGER NOT NULL,
    refrigeracion BOOLEAN NOT NULL
);