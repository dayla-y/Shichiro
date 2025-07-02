CREATE TABLE partidas_guardadas (
    id SERIAL PRIMARY KEY,
    jugador_id INTEGER NOT NULL,
    nombre_partida VARCHAR(100) NOT NULL,
    escena_actual VARCHAR(50) NOT NULL,
    posicion_x NUMERIC(10,2) NOT NULL,
    posicion_y NUMERIC(10,2) NOT NULL,
    datos_jugador JSONB NOT NULL,
    datos_inventario JSONB NOT NULL,
    datos_mundo JSONB NOT NULL,
    fecha_guardado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tiempo_juego INTEGER NOT NULL -- En segundos
);