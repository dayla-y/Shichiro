CREATE TABLE devoluciones (
    id SERIAL PRIMARY KEY,
    recepcion_id INTEGER REFERENCES recepciones(id),
    medicamento_id INTEGER NOT NULL REFERENCES medicamentos(id),
    cantidad INTEGER NOT NULL,
    motivo TEXT,
    fecha_devolucion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    penalizacion_aplicada NUMERIC(5,2),
    empleado_id INTEGER REFERENCES empleados(id)
);