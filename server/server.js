import cookieParser from 'cookie-parser';
import express from 'express';
import { testConnection } from './configs/db.js';
import medicamentoRoutes from './routes/medicamento-routes.js';
import sellsRoutes from './routes/ventas-router.js';
import empleadoRoutes from './routes/empleados-router.js';
import alertsRoutes from './routes/alertas-router.js';
import warehousesRoutes from './routes/almacenes-router.js';
import clientsRoutes from './routes/clientes-router.js';
import commsRoutes from './routes/comisiones-routes.js';
import devolutionsRoutes from './routes/devolutions-router.js';
import inventarioRoutes from './routes/inventario-router.js';
import itemsInventarioRoutes from './routes/items-inventario-router.js';
import orderClientRoutes from './routes/pedidos-router.js';
import orderRoutes from './routes/pedidos-router.js';
import promotionsRouter from './routes/promociones-router.js';
import receptionsRouter from './routes/recepciones-router.js';

// import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

await testConnection();

// Allow multiple origins
// const allowedOrigins = ['http://localhost:5173'];


// Middleware configutarion
app.use(express.json());
app.use(cookieParser());
// app.use(cors({ origin: allowedOrigins, credentials: true }));


// Routes
app.get('/', (req, res) => res.send("API is working"));
app.use('/api/alertas', alertsRoutes);
app.use('/api/almacenes', warehousesRoutes);
app.use('/api/clientes', clientsRoutes);
app.use('/api/comisiones', commsRoutes);
app.use('/api/devoluciones', devolutionsRoutes);
app.use('/api/items-inventario', itemsInventarioRoutes);
app.use('/api/devoluciones', devolutionsRoutes);
app.use('/api/medicamentos', medicamentoRoutes);
app.use('/api/promociones', promotionsRouter);
app.use('/api/recepciones', receptionsRouter);
app.use('/api/order', orderRoutes);
app.use('/api/order-client', orderClientRoutes);
app.use('/api/sells', sellsRoutes);
app.use('/api/empleados', empleadoRoutes);



app.listen(port, ()=>{
  console.log(`Server is running on http://localhost:${port}`);
})