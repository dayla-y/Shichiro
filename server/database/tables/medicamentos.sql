CREATE TABLE medicamentos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    codigo_barras VARCHAR(50) UNIQUE,
    clasificacion VARCHAR(30) NOT NULL CHECK (clasificacion IN (
        'antibiotiveco', 'refrigeracion', 'vitamina_suplemento', 
        'controlado', 'venta_libre', 'suministro'
    )),
    requiere_receta BOOLEAN NOT NULL,
    precio NUMERIC(10,2) NOT NULL,
    stock_actual INTEGER NOT NULL,
    stock_minimo INTEGER NOT NULL,
    fecha_vencimiento DATE,
    refrigerado BOOLEAN NOT NULL,
    proveedor_id INTEGER REFERENCES proveedores(id)
);

SELECT id, nombre FROM medicamentos;