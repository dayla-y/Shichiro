CREATE TABLE sucursales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion TEXT NOT NULL,
    telefono VARCHAR(20),
    horario_apertura TIME NOT NULL,
    horario_cierre TIME NOT NULL,
    es_principal BOOLEAN NOT NULL DEFAULT FALSE,
    capacidad_pacientes INTEGER,
    almacen_id INTEGER REFERENCES almacenes(id),
    gerente_id INTEGER REFERENCES empleados(id),
    activa BOOLEAN NOT NULL DEFAULT TRUE,
    datos_adicionales JSONB
);