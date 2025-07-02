CREATE TABLE interacciones_jugador (
    id SERIAL PRIMARY KEY,
    jugador_id INTEGER NOT NULL REFERENCES jugadores(id),
    objeto_id INTEGER NOT NULL REFERENCES objetos_nivel(id),
    tipo_interaccion VARCHAR(20) NOT NULL CHECK (tipo_interaccion IN (
        'abrir', 'romper', 'recoger', 'usar', 'hablar'
    )),
    fecha_interaccion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    resultado TEXT
);