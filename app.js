import express from 'express';
import dotenv from 'dotenv';
import alertRoutes from './routes/alertRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', alertRoutes);

export default app;
