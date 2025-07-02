CREATE TABLE animaciones (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    entidad_tipo VARCHAR(20) NOT NULL CHECK (entidad_tipo IN (
        'jugador', 'npc', 'objeto'
    )),
    entidad_id INTEGER, -- Referencia al ID del jugador, NPC u objeto
    estado_asociado VARCHAR(50),
    frames TEXT NOT NULL, -- JSON con los frames de la animación
    velocidad NUMERIC(5,2) NOT NULL DEFAULT 1.0,
    loop BOOLEAN DEFAULT TRUE
);