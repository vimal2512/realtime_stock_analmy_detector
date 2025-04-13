import express from 'express';
import { getLastAlerts } from '../services/alertManager.js';

const router = express.Router();

router.get('/secure-alerts', (req, res) => {
  const token = req.headers['x-api-key'];
  if (token !== process.env.SECRET_KEY) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  res.json(getLastAlerts());
});

export default router;
