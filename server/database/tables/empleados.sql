CREATE TABLE empleados (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    puesto VARCHAR(50) NOT NULL,
    porcentaje_comision NUMERIC(5,2)
);