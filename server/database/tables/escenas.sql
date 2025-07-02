CREATE TABLE escenas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    archivo_mapa VARCHAR(100) NOT NULL,
    musica_fondo VARCHAR(100),
    spawn_x NUMERIC(10,2) NOT NULL,
    spawn_y NUMERIC(10,2) NOT NULL,
    propiedades JSONB -- Datos adicionales del nivel
);