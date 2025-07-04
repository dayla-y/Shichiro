CREATE TABLE npcs (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN (
        'comerciante', 'paciente', 'enemigo', 'aliado', 'neutral', 'mascota'
    )),
    salud_actual INTEGER,
    salud_maxima INTEGER,
    velocidad_base NUMERIC(5,2) NOT NULL,
    posicion_x NUMERIC(10,2) NOT NULL,
    posicion_y NUMERIC(10,2) NOT NULL,
    direccion VARCHAR(10) CHECK (direccion IN ('arriba', 'abajo', 'izquierda', 'derecha')),
    estado_actual VARCHAR(20) NOT NULL CHECK (estado_actual IN (
        'inactivo', 'caminando', 'patrullando', 'persiguiendo', 
        'atacando', 'herido', 'muerto', 'conversando'
    )),
    escena_actual VARCHAR(50) NOT NULL,
    items_venta JSONB,
    comportamiento TEXT -- Podría ser un JSON con el comportamiento del NPC
);