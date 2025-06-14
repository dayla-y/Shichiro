CREATE TABLE recepciones (
    id SERIAL PRIMARY KEY,
    numero_orden VARCHAR(50) NOT NULL,
    proveedor_id INTEGER NOT NULL REFERENCES proveedores(id),
    sucursal_id INTEGER REFERENCES sucursales(id),
    fecha_recepcion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado_validacion BOOLEAN DEFAULT FALSE,
    empleado_validador INTEGER REFERENCES empleados(id)
);

CREATE TABLE detalles_recepcion (
    id SERIAL PRIMARY KEY,
    recepcion_id INTEGER NOT NULL REFERENCES recepciones(id),
    medicamento_id INTEGER NOT NULL REFERENCES medicamentos(id),
    cantidad INTEGER NOT NULL,
    lote VARCHAR(50),
    fecha_vencimiento DATE NOT NULL
);