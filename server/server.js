import cookieParser from 'cookie-parser';
import express from 'express';
import { testConnection } from './configs/db.js';
import medicamentoRoutes from './routes/medicamento-routes.js';

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
app.use('/api/medicamentos', medicamentoRoutes);

app.listen(port, ()=>{
  console.log(`Server is running on http://localhost:${port}`);
})