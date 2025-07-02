CREATE TABLE objetos_nivel (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN (
        'puerta', 'cofre', 'olla', 'boton', 'llave', 'consumible', 'arma', 'armadura'
    )),
    posicion_x NUMERIC(10,2) NOT NULL,
    posicion_y NUMERIC(10,2) NOT NULL,
    estado VARCHAR(20) NOT NULL CHECK (estado IN (
        'cerrado', 'abierto', 'roto', 'activo', 'inactivo', 'recolectado'
    )),
    escena VARCHAR(50) NOT NULL,
    propiedades JSONB, -- Para datos específicos como contenido del cofre, etc.
    sprite VARCHAR(100)
);