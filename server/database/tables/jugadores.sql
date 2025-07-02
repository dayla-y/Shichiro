CREATE TABLE jugadores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    nivel INTEGER DEFAULT 1,
    experiencia INTEGER DEFAULT 0,
    salud_actual INTEGER NOT NULL,
    salud_maxima INTEGER NOT NULL,
    velocidad_base NUMERIC(5,2) NOT NULL,
    posicion_x NUMERIC(10,2) NOT NULL,
    posicion_y NUMERIC(10,2) NOT NULL,
    direccion VARCHAR(10) CHECK (direccion IN ('arriba', 'abajo', 'izquierda', 'derecha')),
    estado_actual VARCHAR(20) NOT NULL CHECK (estado_actual IN (
        'inactivo', 'caminando', 'corriendo', 'atacando', 
        'interactuando', 'herido', 'muerto', 'inventario'
    )),
    ultima_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    escena_actual VARCHAR(50) NOT NULL,
    inventario_id INTEGER REFERENCES inventarios(id)
);

CREATE TABLE estados_jugador (
    id SERIAL PRIMARY KEY,
    jugador_id INTEGER NOT NULL REFERENCES jugadores(id),
    estado_actual VARCHAR(20) NOT NULL CHECK (estado_actual IN (
        'idle', 'caminando', 'corriendo', 'saltando', 'atacando', 
        'interactuando', 'herido', 'muerto', 'navegando_ui'
    )),
    estado_anterior VARCHAR(20),
    tiempo_en_estado NUMERIC(10,2) DEFAULT 0,
    puede_interactuar BOOLEAN DEFAULT TRUE,
    puede_moverse BOOLEAN DEFAULT TRUE,
    puede_atacar BOOLEAN DEFAULT FALSE
);


CREATE TABLE inventario_jugador (
    id SERIAL PRIMARY KEY,
    jugador_id INTEGER NOT NULL REFERENCES jugadores(id),
    capacidad_maxima INTEGER NOT NULL,
    slots_disponibles INTEGER NOT NULL
);

CREATE TABLE items_jugador (
    id SERIAL PRIMARY KEY,
    inventario_id INTEGER NOT NULL REFERENCES inventario_jugador(id),
    objeto_id INTEGER NOT NULL REFERENCES objetos_nivel(id),
    medicamento_id INTEGER REFERENCES medicamentos(id),
    cantidad INTEGER NOT NULL DEFAULT 1,
    posicion_inventario INTEGER,
    equipado BOOLEAN DEFAULT FALSE
);