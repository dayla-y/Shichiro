CREATE TABLE dialogos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    npc_id INTEGER REFERENCES npcs(id),
    es_interactuable BOOLEAN DEFAULT TRUE,
    repite_dialogo BOOLEAN DEFAULT FALSE,
    prioridad INTEGER DEFAULT 0
);

CREATE TABLE entradas_dialogo (
    id SERIAL PRIMARY KEY,
    dialogo_id INTEGER NOT NULL REFERENCES dialogos(id),
    texto TEXT NOT NULL,
    orden INTEGER NOT NULL,
    personaje VARCHAR(50),
    expresion VARCHAR(50),
    velocidad_texto NUMERIC(3,2) DEFAULT 1.0,
    sonido VARCHAR(100),
    requiere_condicion BOOLEAN DEFAULT FALSE,
    condicion TEXT, -- Puede ser una expresión o script a evaluar
    UNIQUE(dialogo_id, orden)
);

CREATE TABLE opciones_respuesta (
    id SERIAL PRIMARY KEY,
    entrada_dialogo_id INTEGER NOT NULL REFERENCES entradas_dialogo(id),
    texto VARCHAR(200) NOT NULL,
    orden INTEGER NOT NULL,
    siguiente_entrada_id INTEGER REFERENCES entradas_dialogo(id),
    accion TEXT, -- Script o acción a ejecutar al seleccionar
    requiere_item BOOLEAN DEFAULT FALSE,
    item_id INTEGER REFERENCES objetos_nivel(id),
    cantidad_item INTEGER DEFAULT 1,
    visible BOOLEAN DEFAULT TRUE,
    UNIQUE(entrada_dialogo_id, orden)
);

CREATE TABLE eventos_dialogo (
    id SERIAL PRIMARY KEY,
    entrada_dialogo_id INTEGER REFERENCES entradas_dialogo(id),
    opcion_respuesta_id INTEGER REFERENCES opciones_respuesta(id),
    tipo_evento VARCHAR(50) NOT NULL CHECK (tipo_evento IN (
        'dar_item', 'quitar_item', 'iniciar_mision', 'completar_mision',
        'abrir_tienda', 'activar_objeto', 'cambiar_escena', 'ejecutar_script'
    )),
    parametros JSONB, -- Datos específicos del evento
    delay_ejecucion INTEGER DEFAULT 0 -- En milisegundos
);

CREATE TABLE variables_dialogo (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    valor TEXT,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('booleano', 'entero', 'decimal', 'texto', 'json')),
    descripcion TEXT
);

CREATE TABLE historial_dialogos (
    id SERIAL PRIMARY KEY,
    jugador_id INTEGER NOT NULL REFERENCES jugadores(id),
    dialogo_id INTEGER NOT NULL REFERENCES dialogos(id),
    entrada_dialogo_id INTEGER NOT NULL REFERENCES entradas_dialogo(id),
    opcion_seleccionada_id INTEGER REFERENCES opciones_respuesta(id),
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    leido BOOLEAN DEFAULT FALSE
);